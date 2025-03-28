
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SkeletonCardProps {
  headerHeight?: number;
  rows?: number;
  rowHeight?: number;
  withImage?: boolean;
}

const SkeletonCard = ({
  headerHeight = 40,
  rows = 3,
  rowHeight = 20,
  withImage = false
}: SkeletonCardProps) => {
  return (
    <Card className="w-full border-agro-green-100">
      <CardHeader className="pb-2">
        <Skeleton className="h-[40px] w-[70%]" />
      </CardHeader>
      <CardContent className="space-y-4">
        {withImage && (
          <Skeleton className="h-[180px] w-full rounded-lg" />
        )}
        
        {Array(rows).fill(0).map((_, i) => (
          <Skeleton 
            key={i} 
            className={`h-[${rowHeight}px] w-[${90 - (i * 10)}%]`} 
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
