import { Provider } from '@/lib/constants';

export interface ActionContext {
    trigger: 'manual' | 'scheduler' | 'automation' | 'api';
    startedAt: Date;
    user?: string;
    source?: string;
}

export interface ActionResult {
    success: boolean;
    projectId: string; // The Registry ID
    projectName: string;
    provider: Provider;
    action: string;
    message: string;
    duration: number; // in milliseconds
    checkedAt: Date;
    error?: string;
}

export interface BulkActionResult {
    total: number;
    success: number;
    failed: number;
    duration: number; // Total duration in ms
    results: ActionResult[];
}
