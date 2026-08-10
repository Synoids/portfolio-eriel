# Architecture Assessment: Infrastructure Management Orchestration

## 1. Audit Arsitektur Ekosistem Saat Ini (Sprint 1-10)
Sistem **Infrastructure Management Engine** yang telah kita bangun secara substansial sangat matang dan berlapis:
- **InfrastructureManager & SupabaseProvider:** Memiliki abstraksi *Provider* penuh untuk eksekusi `healthCheck` dan `wake`.
- **InfrastructureActionService:** Sebagai *Facade* yang mencatat seluruh *Action Log*, `checked_at`, metrik performa (latensi), dan orkestrasi gagal-aman (*fail-safe*).
- **State Repository (Database Induk):** Mengelola jejak riwayat historis kesehatan (*project_health_history*).
- **CredentialResolver & Management Service (Sprint 8-10):** Mengamankan PAT pada sisi server dengan lapisan kriptografi yang kuat (*AES-256-CBC*).
- **Monitoring Dashboard:** Pusat kendali UI interaktif yang dapat mengeksekusi operasi tersebut secara manual.

**Gap Saat Ini:** Ekosistem ini masih pasif (*reactive*). Ia hanya bergerak apabila Anda (Admin) menekan tombol "Wake" atau "Check Health" di Dashboard. Di sisi lain, skrip *Keep-Alive* Anda di **GitHub Actions** berjalan di luar rel sistem ini (*out-of-band*), mengakibatkan dualisme sistem: GitHub memegang otorisasi dan rahasia sendiri, tidak mencatatkan *log* ke Dashboard, dan tidak memanfaatkan kapabilitas *Wake Engine* / *Health Engine* mutakhir yang baru kita rancang.

---

## 2. Analisis Keterbatasan Lingkungan (*Runtime Constraints*)
Aplikasi berjalan pada kerangka **Next.js** (berpotensi di- *deploy* ke Vercel atau penyedia *Serverless*).
- **Serverless Timeout Limits:** Eksekusi API memiliki batas waktu keras (*hard limit*), umumnya 10 detik hingga 60 detik. Memaksa API melakukan iterasi (bulk check) ke 20+ pangkalan data terpisah berpotensi besar memicu *Timeout*.
- **Background Processes:** Next.js tidak memiliki utas (*daemon thread*) atau *Cron* bawaan yang dapat terus hidup (seperti PM2 / Node.js *worker* tradisional).
- **Isolasi Database:** Karena sistem Anda memantau *project target* yang bisa tidur (*paused*), *scheduler* harus bergantung secara eksklusif pada **Database Induk (Host)**, bukan pada database target yang dipantau.

---

## 3. Komparasi Arsitektur Scheduler (A vs B vs C)

### A. GitHub Actions Keep-Alive (Eksisting)
Skrip melakukan ping langsung ke target (Supabase API) tanpa melewati Dashboard.
- **Reliability:** Moderat. Sering dinonaktifkan otomatis dalam 60 hari tanpa *commit*.
- **Biaya:** Gratis.
- **Dependency:** Tinggi (bergantung pada *runner* GitHub).
- **Health Check & Keep Alive:** Ya, namun tidak mencatat apapun ke pangkalan data *Dashboard*.
- **Wake, Retry/Backoff:** Nihil.
- **Audit History:** Tidak ada, hanya log teks di antarmuka GitHub Actions.
- **Dashboard Control:** **Nol**. Dashboard tidak menyadari bahwa *Keep-Alive* sedang berjalan.

### B. Dashboard + Internal Next.js Scheduler (Vercel Cron)
Menggunakan fitur *Vercel Cron* (`vercel.json`) untuk memicu *Next.js API Route*.
- **Reliability:** Tinggi, namun sangat terbatasi oleh eksekusi.
- **Biaya:** Vercel *Free Tier* hanya mengizinkan maksimal 2 eksekusi *Cron* per hari.
- **Dependency:** Rendah (hanya bergantung pada Vercel).
- **Health Check & Keep Alive:** Ya, dan dieksekusi langsung oleh *Engine* kita.
- **Wake, Retry/Backoff:** Bergantung sepenuhnya pada limitasi 10-detik *Timeout*. *Retry* dengan penundaan (*delay/sleep*) akan gagal/meledak karena batas *Serverless*.
- **Audit History & Control:** **Sempurna**. Semua tercatat rapi di pangkalan data Induk.

### C. Hybrid Scheduler + Infrastructure Engine (Rekomendasi Final)
Pemisahan murni antara **"Pelatuk" (Trigger/Scheduler)** dengan **"Otak" (Infrastructure Engine)**.
Kita mengubah *GitHub Actions* hanya sekadar menjadi pelatuk `cURL` eksternal (tanpa rahasia Supabase apa pun). Pelatuk ini menembak API Route Next.js yang diamankan dengan statik `CRON_SECRET`.
API Route kemudian menjalankan `InfrastructureActionService.runHealthCheckForAll()`.
- **Reliability:** Sangat Tinggi. Pelatuk sepenuhnya dipisahkan dari logika bisnis dan basis data.
- **Biaya:** Gratis (bawaan Supabase Database).
- **Dependency:** Hanya GitHub Actions dan Vercel API.
- **Kemampuan Eksekusi:** Menjalankan *Health Check*, mencatatkan *History*, jika gagal mengeksekusi *Wake Engine*, dan melacak seluruh performanya di Dashboard.
- **Retry / Bulk Queue:** Karena Engine kita mengontrol alur, kita bisa memanfaatkan *Edge Functions* atau mekanisme rotasi parsial agar terhindar dari *Timeout Serverless*.
- **Dashboard Control:** **Sempurna.** Dashboard menjadi *Command Center* tunggal.

---

## 4. Rekomendasi Arsitektur Final
**Kandidat Pemenang: Opsi C (Hybrid Scheduler: GitHub Actions Dumb Trigger + Infrastructure Engine)**

**Alasan Pilihan:**
1. **Sentralisasi Rahasia (Secret):** GitHub Actions tidak perlu lagi menyimpan `SUPABASE_SERVICE_ROLE_KEY` setiap proyek. Seluruh kunci berlindung di dalam enkripsi AES-256 server kita.
2. **Dashboard = Pusat Kendali Tunggal:** Seluruh laporan *Health Check*, keberhasilan pencegahan *Auto-Pause*, atau kegagalan koneksi akan terlihat visualnya pada *Monitoring Dashboard* milik Anda.
3. **Imunitas Tidur (Sleep Immunity):** Mekanisme root PostgREST API mensimulasikan *compute* yang sah untuk menjaga pangkalan data. GitHub Actions dengan siklus commit preventif menjaga pelatuk tetap aktif.
4. **Fleksibilitas Masa Depan:** API Route tersebut kelak dapat berevolusi menjadi sistem Antrean (*Queue Worker*) jika proyek bertambah melebihi 100+ tanpa perlu merombak ulang Github Actions.
