export type ScheduleFrequency =
  | 'manual'
  | 'every_5_minutes'
  | 'every_10_minutes'
  | 'every_30_minutes'
  | 'hourly'
  | 'daily';

export interface ScheduleConfig {
  enabled: boolean;
  frequency: ScheduleFrequency;
  action: 'health_check';
  projectIds?: string[];
}

export interface SchedulerRunResult {
  success: boolean;
  startedAt: Date;
  completedAt: Date;
  duration: number;
  action: string;
  total: number;
  successCount: number;
  failedCount: number;
  message: string;
}
