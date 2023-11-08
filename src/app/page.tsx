import { api } from "~/trpc/server";

export default async function Home() {
  const dollarBlue = await api.dollarBlue.getLatest.query();

  return (
      <main className="h-full bg-white flex flex-col max-w-7xl mx-auto">
      <header className="mt-20 w-full">
        <h1 className="title">
          <span className="text-gray-900">Dolar </span>
          <span className="underline">Blue</span>
          💸
        </h1>
      </header>
      <section className="flex flex-grow flex-wrap w-full items-start justify-evenly mt-20">
        <div className="card">
          <h2 className="text-gray-800 text-2xl font-semibold text-center">
            Compra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="mt-4 text-center col-auto md:col-span-2">
              <span title="pesos argentinos" className="text-center text-gray-800 font-semibold">
                US$ = ${dollarBlue?.buyValue?.toString()}
              </span>
            </div>
          </div>

        </div>
        <div className="card">
          <h2 className="text-gray-800 text-2xl font-semibold text-center">
            Venta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="mt-4 text-center col-auto md:col-span-2">
              <span title="pesos argentinos" className="text-center text-gray-800 font-semibold">
                US$ = ${dollarBlue?.sellValue?.toString()}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
