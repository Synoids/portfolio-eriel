# Infrastructure State Engine

## Tujuan
Infrastructure State Engine adalah fondasi penyimpanan bagi seluruh aktivitas *monitoring*. Engine ini memisahkan tanggung jawab "mengecek sistem" (Health Check Engine) dari tanggung jawab "menyimpan data". Tujuannya agar Dashboard Monitoring yang akan dibangun pada Sprint 4 tidak melakukan ping *real-time* massal ke seluruh project, melainkan cukup membaca status terakhir dari database.

## Alur Penyimpanan Data

Diagram berikut menunjukkan bagaimana aliran data dikendalikan secara terpusat oleh *InfrastructureManager*:

```mermaid
flowchart TD
    UI[Dashboard / Cron Job] --> IM[Infrastructure Manager]
    
    subgraph Infrastructure Engine
    IM -->|1. healthCheck()| Provider[Specific Provider]
    Provider -->|2. HealthResult| IM
    IM -->|3. saveCurrent() & saveHistory()| Repo[State Repository]
    end

    subgraph Database (Supabase)
    Repo -->|Upsert| DB_Current[(project_health_current)]
    Repo -->|Insert| DB_History[(project_health_history)]
    end
```

### Penjelasan Komponen:
- **UI / Cron Job**: Tidak pernah menyentuh *Provider* secara langsung. Ia cukup memanggil `InfrastructureManager.runAndSaveHealthCheck()`.
- **Provider**: Sama sekali tidak mengetahui konsep penyimpanan atau *Supabase*.
- **State Repository**: Sebuah kontrak penyimpanan (interface) murni. Kita menggunakan `SupabaseStateRepository` untuk proyek ini.

## Alasan Menggunakan Dua Tabel

### 1. `project_health_current`
- Menyimpan status **saat ini**.
- Dibatasi hanya **1 record per project_id**.
- Pembaruan dilakukan dengan teknik **UPSERT** sehingga performa baca (*read*) oleh Dashboard akan sangat ringan dan super cepat (*O(1)* per project).

### 2. `project_health_history`
- Menyimpan seluruh riwayat (*append-only*).
- **Tidak ada UPDATE atau DELETE**.
- Tabel ini memungkinkan pembuatan fitur analitik tingkat lanjut di masa depan, seperti:
  - Grafik *Uptime* / *Availability* (%).
  - Tren *Average Latency* bulanan.
  - Insiden riwayat *downtime*.

## Rencana Penggunaan pada Monitoring Dashboard
Dashboard pada Sprint 4 hanya perlu memanggil *query* sederhana `SELECT * FROM project_health_current` untuk merender UI status *real-time* yang sangat efisien, meskipun nanti kita memonitor 100+ project. Data histori hanya akan diambil ketika pengguna mengklik detail suatu project.
