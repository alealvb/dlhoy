import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonChartCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-normal">Ultimas dos semanas</CardTitle>
      </CardHeader>
      <CardContent className="py-6 w-full">
        <div className="sm:h-[100px] md:h-[150px] xl:h-[300px] w-full">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
