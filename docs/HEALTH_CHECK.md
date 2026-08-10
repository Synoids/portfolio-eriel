# Health Check Engine

## Tujuan
Health Check Engine merupakan abstraksi *layer* di dalam Infrastructure Engine yang bertanggung jawab penuh atas pengecekan status (health) dari berbagai project (database/infrastructure) tanpa mencemari komponen UI atau Server Actions. Engine ini dibangun agar mudah diperluas (extensible) untuk berbagai provider (Supabase, Firebase, dll).

## Alur Pipeline Health Check
Setiap pengecekan (via `provider.healthCheck()`) dipastikan melalui *template method* pipeline berikut secara kaku:
1. **validateProject()**: Memastikan konfigurasi minimal ada (seperti URL valid).
2. **getHealthEndpoint()**: Mendapatkan endpoint ping spesifik (di-override oleh tiap Concrete Provider).
3. **measureLatency()**: Utilitas murni yang melakukan *fetch* dengan batas waktu (timeout) dan mengukur latensi secara generik.
4. **classifyStatus(result)**: Concrete Provider menafsirkan *raw network response* menjadi status yang seragam (`healthy`, `paused`, `offline`, dll).
5. **buildHealthResult()**: Builder/helper untuk mengembalikan format `HealthResult` yang terstandarisasi.

*Penting: Provider tidak boleh melakukan lemparan exception (throw error) ke UI. Semua error dikemas dengan aman di dalam* `HealthResult.debug`.

## Alasan Pemilihan Endpoint Supabase
Pada SupabaseProvider, kita menggunakan endpoint **`/auth/v1/health`** (GoTrue).
**Alasan:**
- Publik dan cepat (tidak memerlukan *Authorization header* untuk sekadar mengecek kehidupan server).
- Ringan, tidak memicu *query* database internal Supabase (seperti pada `/rest/v1/`).
- Tidak memakan kuota PostgREST/API harian.

## Trade-off & Keterbatasan Saat Ini
- **Status Paused vs Overloaded**: Supabase mengembalikan status `503 Service Unavailable` saat *paused*. Saat ini kita menganggap semua `503/502` sebagai `"paused"`. Namun ada potensi (walaupun kecil) bahwa `503` adalah error karena *server overloaded*. Untuk sementara, ini trade-off yang dapat diterima.
- **Autentikasi Lanjutan**: Endpoint *health check* saat ini murni untuk cek jaringan/routing. Jika project *healthy* secara network tapi *database down*, `/auth/v1/health` mungkin tidak mendeteksinya. 

## Rencana Pengembangan (Sprint Berikutnya)
Pada **Sprint 4 (Wake Project & Monitoring)**, kita akan melengkapi:
- Logika `wake()` untuk membangunkan Supabase menggunakan API manajemen atau ping berat (jika memungkinkan/dibutuhkan).
- Logika retry.
- Eksekusi *background jobs* untuk *health check* secara berkala (Cron Scheduler).
