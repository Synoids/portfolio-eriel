# Infrastructure Dashboard Operations Guide

## 1. Fungsi Dashboard
Dashboard ini berfungsi sebagai pusat pantau (Registry & Monitoring) untuk seluruh proyek infrastruktur (Supabase). Ini bertindak sebagai orkestrator tunggal yang mengeksekusi pemeriksaan kesehatan (*Health Check*) sekaligus mereset pengatur waktu tidur (*Keep-Alive*) pada basis data target.

## 2. Bagaimana Keep-Alive Bekerja
Keep-Alive bekerja dengan cara menembakkan permintaan HTTP `GET /rest/v1/?limit=1` ke PostgREST API setiap proyek menggunakan `anon_key` proyek tersebut. Aktivitas ringan ini diakui sebagai interaksi komputasi (compute) oleh Supabase, sehingga mencegah proyek dari penangguhan otomatis (auto-pause).

## 3. Jadwal GitHub Actions
Proses *Keep-Alive* dikendalikan oleh penjadwal eksternal (*Dumb Trigger*) yang berada di **GitHub Actions** (`.github/workflows/main.yml`). 
- **Jadwal Eksekusi:** Setiap 3 hari (`cron: '0 0 */3 * *'`).
- GitHub Actions murni hanya melakukan `curl POST` ke Dashboard API dan tidak menyimpan kunci proyek apa pun.

## 4. Endpoint Automation
Pemicu berjalan pada URL:
`POST <DASHBOARD_URL>/api/infrastructure/automation/trigger`

Hanya bisa dipanggil apabila *header* otorisasi menyertakan sandi yang sah.

## 5. Secret yang Diperlukan
Sistem produksi bergantung pada rahasia berikut:
- **`ENCRYPTION_KEY`** (Vercel): Kunci enkripsi 32-byte untuk dekripsi rahasia basis data.
- **`CRON_SECRET`** (Vercel & GitHub Secrets): Sandi otorisasi yang menghubungkan trigger GitHub ke API Dashboard.
- **`DASHBOARD_URL`** (GitHub Secrets): URL rilis produksi Vercel.

*(Catatan: Jangan pernah memasukkan secret aktual ke dalam repositori).*

## 6. Penanganan Kegagalan (Troubleshooting Automation)
Jika *automation* gagal:
1. Pastikan GitHub Actions tidak gagal akibat kesalahan jaringan atau keliru `CRON_SECRET`.
2. Periksa log Vercel untuk API Route `/api/infrastructure/automation/trigger`.
3. Kegagalan pemeriksaan pada *satu* proyek tidak akan menghentikan proyek lainnya (arsitektur ini anti-rapuh / *fail-safe*).
4. Proyek yang gagal secara mandiri akan dicatat sebagai `offline` di dasbor.

## 7. Cara Memeriksa GitHub Actions
1. Buka Repositori GitHub > Tab **Actions**.
2. Pilih alur kerja **Keep Infrastructure Automation Alive**.
3. Log hanya akan menunjukkan status eksekusi HTTP (sukses HTTP 200). Log *tidak* memuat rincian kredensial atau proyek.

## 8. Cara Memeriksa Health History
1. Buka URL Dashboard produksi Anda.
2. Navigasi ke halaman **Infrastructure Monitoring** (Menu sidebar).
3. Anda akan melihat daftar proyek dengan status terbaru (Healthy, Paused, Offline) lengkap dengan latensinya.

## 9. Status Wake Engine
> [!WARNING]
> **Wake Engine tidak digunakan dalam automasi ini.** Real Wake API terikat dengan Management API Token (PAT) yang berisiko tinggi. Saat ini, Wake Engine dalam status **FROZEN (Dibekukan)** dan `WAKE_ENABLED` secara paksa diatur ke `false` di konfigurasi produksi.

## 10. Catatan Preventif tentang Supabase
Mekanisme *Keep-Alive* berbasis PostgREST API ini adalah langkah preventif mutakhir berdasarkan arsitektur Supabase saat proyek ini ditulis. Sistem ini tidak memberikan jaminan mutlak (100%) bahwa proyek Supabase tidak akan pernah di-*pause*, karena Supabase secara sepihak berhak mengubah algoritma deteksi ketidakaktifan (idle detection) kapan pun di masa mendatang.
