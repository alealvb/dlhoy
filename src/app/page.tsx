import { api } from "~/trpc/server";
import { PriceCard } from "./_components/price-card";

export default async function Home() {
  const dollarBlue = await api.dollarBlue.getLatest.query();
  const lastWeek = await api.dollarBlue.getLastWeek.query();

  if (!dollarBlue) {
    return null;
  }

  const data = lastWeek.map((item) => ({
    name: "Dolar Blue",
    date: Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "short",
    }).format(item.date),
    price: Number(item.buyValue),
  }));

  return (
    <main className="container grid grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2">
      <PriceCard
        data={data}
        price={Number(dollarBlue.buyValue)}
        title="Compra"
      />
      <PriceCard
        data={data}
        price={Number(dollarBlue.sellValue)}
        title="Venta"
      />
    </main>
  );
}
