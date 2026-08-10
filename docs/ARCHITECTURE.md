# Infrastructure Engine Architecture

The Infrastructure Engine follows a strict **Clean Architecture** and **Dependency Rule**. This ensures that the Presentation Layer (UI) is fully decoupled from the low-level implementations (Providers, Databases).

## Layer Responsibilities

### 1. Presentation Layer (UI)
- **Location**: `app/admin/monitoring/` and `components/admin/monitoring/`
- **Responsibility**: Rendering data to the user and handling user interactions (clicks).
- **Rule**: Must **NEVER** contain business logic. Must **NEVER** import from `providers/` or `state/`. It only communicates with Server Actions.

### 2. Server Actions Layer
- **Location**: `app/admin/monitoring/actions.ts`
- **Responsibility**: Bridging the gap between the Client (React) and the Application Services. 
- **Rule**: Acts as a thin wrapper that invokes `InfrastructureActionService` or `DashboardQueryService` and calls `revalidatePath`.

### 3. Application Services
- **Location**: `lib/infrastructure/actions/` (Commands) and `lib/infrastructure/query/` (Queries)
- **Responsibility**: Orchestrating use cases. 
    - `InfrastructureActionService`: Handles commands (e.g., `runHealthCheck`), applies Retry Policies, logs actions, and aggregates `BulkActionResult`.
    - `DashboardQueryService`: Handles queries (e.g., `getDashboardData`), aggregates data from multiple repositories, and maps them to DTOs for the UI.

### 4. Infrastructure Manager
- **Location**: `lib/infrastructure/InfrastructureManager.ts`
- **Responsibility**: The central hub that resolves the correct `Provider` for a given project. It orchestrates the pipeline between the Provider (fetching data) and the State Repository (saving data).

### 5. Provider Layer
- **Location**: `lib/infrastructure/providers/`
- **Responsibility**: Communicating with external third-party APIs (e.g., Supabase, Vercel). 
- **Rule**: Providers perform network requests but **delegate** the interpretation of the response to the `HealthClassifier`.

### 6. Classification Layer
- **Location**: `lib/infrastructure/classification/`
- **Responsibility**: Pure functions/classes that take a raw HTTP Response and an Error, and translate them into a standardized `ClassificationResult` (status and message).

### 7. State Repository Layer
- **Location**: `lib/infrastructure/state/`
- **Responsibility**: Encapsulating database queries.
- **Rule**: The only layer allowed to execute SQL/Supabase DB mutations for the Infrastructure state (`project_health_current`, `project_health_history`).

### 8. Hybrid Automation & Scheduler Layer (Keep-Alive)
- **GitHub Actions (Scheduler):** Bertindak sebagai *dumb trigger* yang melakukan pemanggilan HTTP (`curl POST`) ke *Automation API* secara berkala (misalnya setiap 3 hari). Tidak lagi menyimpan logika bisnis atau kunci rahasia (*Service Role Key*), cukup menggunakan *CRON_SECRET*.
- **Automation API (Orchestrator):** Titik akhir (endpoint) `/api/infrastructure/automation/trigger` di Next.js yang memimpin orkestrasi *bulk action*. Ia mendelegasikan tugas ke *Action Service*.
- **Infrastructure Engine (Monitoring & Automation):** Menerjemahkan pemanggilan menjadi perintah *Health Check* bagi semua proyek yang terdaftar.
- **Supabase Provider (Adapter):** Mengeksekusi permintaan *Health Check* ke *PostgREST Data API*.
- **PostgREST (Database Access Layer):** Mengautentikasi kunci `anon_key` dari *Provider* dan memastikan adanya interaksi dengan koneksi basis data.
- **PostgreSQL (Compute):** Menjadi target ultim yang akan di-"cubit" oleh kueri akar PostgREST (`GET /rest/v1/`) agar metrik *compute*-nya tercatat aktif, sehingga mencegah ancaman *auto-pause* (Mekanisme Keep-Alive yang sah).

*Catatan Universalitas:* Sistem sama sekali **TIDAK** membutuhkan pengetahuan terhadap nama tabel bisnis maupun struktur data dari proyek manapun. Kueri *Keep-Alive* dirancang sepenuhnya generik, *read-only*, dan lintas proyek.

## Data Flows

### Monitoring Flow (Read-Only)
`UI -> Server Action -> DashboardQueryService -> (StateRepository + ProjectRegistry) -> DTO -> UI`
- Does not ping external providers. Very fast.

### Action Flow (Write - Manual/UI)
`UI -> Server Action -> InfrastructureActionService -> InfrastructureManager -> BaseProvider -> measureLatency -> HealthClassifier -> StateRepository -> DB`
- Executed sequentially to prevent rate limits. Uses `AbortSignal` for cancellation and `NoRetryPolicy` (extensible).

### Scheduler Flow (Write - Automated Keep-Alive)
```text
   GitHub Actions (Dumb Cron)
         │
         ▼
    POST /api/infrastructure/automation/trigger (Orchestrator)
         │
         ▼
    InfrastructureActionService.runHealthCheckForAll
         │
         ▼
    BaseProvider -> PostgREST -> PostgreSQL -> StateRepository
```

### Wake Engine Execution (FROZEN / DISABLED)
> [!WARNING]
> The Wake Engine is explicitly **frozen** and is **NOT** part of the production Keep-Alive flow. 

Sprint 10 unlocked the foundation for the Wake Engine which connects to the Supabase Management API via the CredentialResolver, however it is currently disabled for security and operational safety.

`UI -> Server Action -> InfrastructureActionService -> InfrastructureManager -> SupabaseProvider -> Supabase Management API (Frozen)`

**Security Boundary**: The token is never returned to the UI or logged.
**Configuration Safety**: WAKE_ENABLED config explicitly turns this feature on/off. It must remain `false` for normal Keep-Alive operations.
