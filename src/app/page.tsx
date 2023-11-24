import { api } from "~/trpc/server";
import { PriceCard } from "./_components/price-card";
import { ChartCard } from "./_components/chart-card";
import { Suspense } from "react";
import { SkeletonChartCard } from "./_components/skeleton-chart-card";

export default async function Home() {
  const dollarBlue = await api.dollarBlue.getLatest.query();

  if (!dollarBlue) {
    return null;
  }

  return (
    <main className="container grid grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2">
      <PriceCard price={Number(dollarBlue.buyValue)} title="Compra" />
      <PriceCard price={Number(dollarBlue.sellValue)} title="Venta" />
      <div className="invisible sm:visible sm:col-span-2">
        {/* <Suspense fallback={<SkeletonChartCard />}> */}
          <ChartCard />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
