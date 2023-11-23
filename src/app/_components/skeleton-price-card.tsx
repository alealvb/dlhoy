import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonPriceCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          <Skeleton className="h-4 w-20" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-4 h-10 w-[50%]" />
      </CardContent>
    </Card>
  );
}
