import { Logger } from './Logger';

export class ConsoleLogger implements Logger {
  info(message: string, meta?: any): void {
    if (meta) console.log(`[INFO] ${message}`, meta);
    else console.log(`[INFO] ${message}`);
  }

  warn(message: string, meta?: any): void {
    if (meta) console.warn(`[WARN] ${message}`, meta);
    else console.warn(`[WARN] ${message}`);
  }

  error(message: string, meta?: any): void {
    if (meta) console.error(`[ERROR] ${message}`, meta);
    else console.error(`[ERROR] ${message}`);
  }

  debug(message: string, meta?: any): void {
    if (meta) console.debug(`[DEBUG] ${message}`, meta);
    else console.debug(`[DEBUG] ${message}`);
  }
}
