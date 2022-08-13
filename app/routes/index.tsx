import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { ChangeEvent } from "react";
import { getCurrentDolarBlue } from "~/models/dolarBlue.server";

export const loader = async () => {
  const dollarBlue = await getCurrentDolarBlue();

  return json({ dollarBlue });
};

function transformCurrency(value: string | number) {
  return Number(Number(value).toFixed(2));
}

export default function Index() {
  const { dollarBlue } = useLoaderData<typeof loader>();
  const [sellDollarBlueInput, setSellDollarInput] = useState(1);
  const [sellBlueValue, setSellBlueValue] = useState(dollarBlue?.sellValue ?? 0);
  const [buyDollarInput, setBuyDollarInput] = useState(1);
  const [buyBlueValue, setBuyBlueValue] = useState(dollarBlue?.buyValue ?? 0);

  const handleBuyDollarInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyDollarInput(parseFloat(e.target.value));
    setBuyBlueValue(transformCurrency(Number(e.target.value) * Number(dollarBlue?.buyValue || 1)));
  };
  const handleSellDollarInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellDollarInput(transformCurrency(e.target.value));
    setSellBlueValue(transformCurrency(Number(e.target.value) * Number(dollarBlue?.sellValue || 1)));
  };

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
            <div className="mt-4 text-center col-auto md:col-span-1 md:col-start-2">
              <input
                className="w-full text-center text-gray-800 font-semibold border-b-2 border-gray-300"
                value={buyDollarInput}
                onChange={handleBuyDollarInputChange}
                type="number"
                min={1}
              />
            </div>
            <div className="mt-4 text-center col-auto md:col-span-2">
              <span title="pesos argentinos" className="text-center text-gray-800 font-semibold">
                US$ = ${buyBlueValue}
              </span>
            </div>
          </div>

        </div>
        <div className="card">
          <h2 className="text-gray-800 text-2xl font-semibold text-center">
            Venta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="mt-4 text-center col-auto md:col-span-1 md:col-start-2">
              <input
                className="w-full text-center text-gray-800 font-semibold border-b-2 border-gray-300"
                value={sellDollarBlueInput}
                onChange={handleSellDollarInputChange}
                type="number"
                min={1}
              />
            </div>
            <div className="mt-4 text-center col-auto md:col-span-2">
              <span title="pesos argentinos" className="text-center text-gray-800 font-semibold">
                US$ = ${sellBlueValue}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
