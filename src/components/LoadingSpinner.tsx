
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue';
}

const LoadingSpinner = ({ 
  className,
  size = 'md',
  color = 'green'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };
  
  const colorClasses = {
    green: 'border-t-agro-green',
    blue: 'border-t-agro-blue'
  };
  
  return (
    <div className="flex justify-center items-center">
      <div 
        className={cn(
          sizeClasses[size],
          colorClasses[color],
          'border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin',
          className
        )}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
