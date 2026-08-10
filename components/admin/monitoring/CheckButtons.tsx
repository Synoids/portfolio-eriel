'use client';

import { useTransition } from 'react';
import { checkProjectAction, checkAllProjectsAction, wakeProjectAction } from '@/app/admin/monitoring/actions';
import { Play, PlayCircle, Loader2 } from 'lucide-react';

export function CheckProjectButton({ registryId }: { registryId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleCheck = () => {
    startTransition(async () => {
      await checkProjectAction(registryId);
    });
  };

  return (
    <button
      onClick={handleCheck}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        isPending 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      }`}
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
      {isPending ? 'Checking...' : 'Check'}
    </button>
  );
}

export function CheckAllButton() {
  const [isPending, startTransition] = useTransition();

  const handleCheckAll = () => {
    startTransition(async () => {
      await checkAllProjectsAction();
    });
  };

  return (
    <button
      onClick={handleCheckAll}
      disabled={isPending}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
        isPending 
          ? 'bg-blue-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
      {isPending ? 'Checking All...' : 'Check All'}
    </button>
  );
}

export function WakeProjectButton({ registryId }: { registryId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleWake = () => {
    if (confirm('Wake Project? \n\nProject ini akan dikirimkan permintaan restore ke Supabase Management API.')) {
      startTransition(async () => {
        await wakeProjectAction(registryId);
      });
    }
  };

  return (
    <button
      onClick={handleWake}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        isPending 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
      }`}
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
      {isPending ? 'Waking...' : 'Wake'}
    </button>
  );
}
