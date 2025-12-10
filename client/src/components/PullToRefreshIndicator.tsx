import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshIndicatorProps {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  progress: number;
}

export function PullToRefreshIndicator({
  isPulling,
  isRefreshing,
  pullDistance,
  progress
}: PullToRefreshIndicatorProps) {
  if (!isPulling && !isRefreshing) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-200"
      style={{
        height: `${Math.min(pullDistance, 80)}px`,
        opacity: progress
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <RefreshCw
          className={cn(
            'w-6 h-6 text-primary',
            isRefreshing && 'animate-spin'
          )}
          style={{
            transform: `rotate(${progress * 360}deg)`
          }}
        />
        <span className="text-xs font-medium text-muted-foreground">
          {isRefreshing ? '更新中...' : progress >= 1 ? '離して更新' : '引っ張って更新'}
        </span>
      </div>
    </div>
  );
}
