import { NextResponse } from 'next/server';
import { InfrastructureActionService } from '@/lib/infrastructure/actions/InfrastructureActionService';
import { ConsoleLogger } from '@/lib/infrastructure/logging/ConsoleLogger';

// This is a secure endpoint designed to be triggered by a Dumb Cron (e.g. GitHub Actions)
// It runs a bulk health check which natively resets the Supabase inactivity timer.

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET;

    if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Since this endpoint is triggered by a cron job, we want to return immediately
    // or run synchronously? If we run synchronously, Vercel might timeout.
    // However, Vercel allows Edge Functions or longer timeouts for API routes if configured.
    // Given the constraints, we will execute it asynchronously if possible, but Next.js
    // Serverless functions die when the response is returned unless we use waitUntil or similar.
    // For this implementation, we will await it directly but rely on batching inside the service
    // if needed. Currently, `runHealthCheckForAll` processes sequentially. 
    // In the future, this should be chunked if the project count grows > 50.

    const actionService = new InfrastructureActionService(new ConsoleLogger());
    
    // We add an AbortController just in case to limit the overall execution time to 45s
    // (Vercel hobby limit is 10s, Pro is 60s, so we assume a safe limit)
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 45000); // 45 seconds max

    const result = await actionService.runHealthCheckForAll(
      { trigger: 'scheduler', startedAt: new Date() },
      controller.signal
    );

    clearTimeout(timeout);

    return NextResponse.json({
      success: true,
      message: 'Automation triggered successfully',
      result
    });
  } catch (error: any) {
    console.error('Automation endpoint failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
