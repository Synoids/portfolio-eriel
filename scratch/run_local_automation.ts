import { POST } from '../app/api/infrastructure/automation/trigger/route';

async function runLocalAutomation() {
  console.log('--- PHASE 2: LOCAL REAL AUTOMATION TEST ---');
  
  const headers = new Headers();
  headers.set('authorization', `Bearer ${process.env.CRON_SECRET}`);
  
  const request = {
    headers,
    method: 'POST',
    url: 'http://localhost/api/infrastructure/automation/trigger'
  } as unknown as Request;

  try {
    const response = await POST(request);
    const data = await (response as any).json();
    
    console.log(`HTTP Status: ${response.status}`);
    
    if (data.success && data.result) {
      const { total, success, failed, duration, results } = data.result;
      console.log(`Projects Processed: ${total}`);
      console.log(`Success (Healthy): ${success}`);
      console.log(`Failed/Offline/Paused: ${failed}`);
      console.log(`Total Latency: ${duration}ms`);
      console.log(`Timestamp: ${new Date().toISOString()}`);
      
      // Let's print out the status of each project WITHOUT printing the raw response or credentials
      console.log('\nDetailed Status:');
      results.forEach((r: any) => {
        console.log(`- Project: ${r.projectName} | Status: ${r.success ? 'Healthy' : 'Not Healthy'} | Msg: ${r.message}`);
      });
    } else {
      console.error('Automation failed:', data);
    }
  } catch (err) {
    console.error('Error running automation:', err);
  }
}

runLocalAutomation().catch(console.error);
