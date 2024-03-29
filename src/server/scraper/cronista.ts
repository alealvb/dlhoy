import { parse } from "node-html-parser";
import { Prisma } from "@prisma/client";
import { db } from "../db";

function formatPrice(price: string) {
  return price
    .replace("$", "")
    .replace(".", "")
    .replace(",", ".");
}

export const getCronistaDollar = async () => {
  const document = parse(await fetch("https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB").then(res => res.text()));
  const dollarNode = document.querySelector(
    ".piece.markets.standard.boxed a[href=\"/MercadosOnline/moneda.html?id=ARSB\"]"
  )?.parentNode?.parentNode;

  const buyValue = dollarNode?.querySelector(".buy-value")?.text;

  if (!buyValue) {
    throw new Error("No buyPrice found on Cronista scraper");
  }

  const sellValue = dollarNode?.querySelector(".sell-value")?.text;

  if (!sellValue) {
    throw new Error("No sellValue found on Cronista scraper");
  }

  return {
    buyValue: new Prisma.Decimal(formatPrice(buyValue)),
    sellValue: new Prisma.Decimal(formatPrice(sellValue)),
    source: "cronista"
  };
};

export const scrapCronistaDollar = async (): Promise<void> => {
  try {
    const data = await getCronistaDollar();

    const lastDollar = await db.dolarBlue.findFirst({ orderBy: { date: "desc" } });

    // Don't create a new dollar record if the last one is the same
    if (lastDollar?.buyValue?.toNumber() !== data.buyValue.toNumber()
      && lastDollar?.sellValue?.toNumber() !== data.sellValue.toNumber()) {
      await db.dolarBlue.create({ data });
    }
  } catch (error) {
    console.error(error);
  }
};

