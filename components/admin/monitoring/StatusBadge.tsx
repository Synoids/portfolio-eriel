import { ExtendedHealthStatus } from '@/lib/infrastructure/query/types';

interface StatusBadgeProps {
  status: ExtendedHealthStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'paused':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'offline':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'not_checked':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'invalid':
      case 'unknown':
      default:
        return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const formatStatus = () => {
    if (status === 'not_checked') return 'Not Checked';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}>
      {formatStatus()}
    </span>
  );
}
