import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";

export const loader: LoaderFunction = async () => {
  const dollarBlue = await prisma.dolarBlue.findFirst({ orderBy: { date: "desc" } });

  return { dollarBlue };
};


export default function Index() {
  const { dollarBlue } = useLoaderData();

  return (
    <main className="min-h-screen bg-white flex flex-col max-w-7xl mx-auto">
      <header className="mt-20 w-full">
        <h1 className=" title">
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
          <div className="mt-4 text-center">
            {dollarBlue.buyValue}
          </div>
        </div>
        <div className="card">
          <h2 className="text-gray-800 text-2xl font-semibold text-center">
            Venta
          </h2>
          <div className="mt-4 text-center">
            {dollarBlue.sellValue}
          </div>
        </div>
      </section>
    </main>
  );
}
