import { SkeletonChartCard } from "./_components/skeleton-chart-card";
import { SkeletonPriceCard } from "./_components/skeleton-price-card";

export default function Loading() {
  return (
    <main className="container grid grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2">
      <SkeletonPriceCard />
      <SkeletonPriceCard />
      <div className="invisible sm:visible sm:col-span-2">
        <SkeletonChartCard />
      </div>
    </main>
  );
}
