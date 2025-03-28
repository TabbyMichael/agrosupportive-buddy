
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const ResponsiveContainer = ({ 
  children, 
  className,
  fullWidth = false
}: ResponsiveContainerProps) => {
  return (
    <div 
      className={cn(
        fullWidth ? "w-full" : "max-w-7xl mx-auto",
        "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
