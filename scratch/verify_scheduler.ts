import { SchedulerService } from '../lib/infrastructure/scheduler/SchedulerService';

async function runVerification() {
  const scheduler = new SchedulerService();

  console.log('--- Verification A: Normal Execution ---');
  const result1 = await scheduler.runHealthCheckSchedule();
  console.log(result1);

  console.log('\n--- Verification B: Duplicate Execution ---');
  // Triggering both at the same time to force a lock collision
  console.log('Triggering two scheduler instances concurrently...');
  const [resA, resB] = await Promise.all([
    scheduler.runHealthCheckSchedule(),
    scheduler.runHealthCheckSchedule()
  ]);
  
  console.log('Result A (should be success):', resA.success, '| msg:', resA.message);
  console.log('Result B (should be lock rejected):', resB.success, '| msg:', resB.message);

  console.log('\n--- Verification C: Abort Signal ---');
  const controller = new AbortController();
  const abortPromise = scheduler.runHealthCheckSchedule(controller.signal);
  // Abort immediately
  controller.abort();
  
  const abortResult = await abortPromise;
  console.log('Abort Result:', abortResult.success, '| msg:', abortResult.message);
}

runVerification().catch(console.error);
