import { LucideIcon } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  colorClass: string;
}

export default function OverviewCard({ title, value, icon: Icon, colorClass }: OverviewCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
