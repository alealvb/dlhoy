import { Cron } from "croner";
import { scrapCronistaDollar } from "./cronista";
import { env } from "~/env.mjs";

export const scraperJob = () => {
  const scraper = Cron(env.CRONISTA_SCRAPER_CRON_TIME, async function() {
    console.log("scraping cronista");
    await scrapCronistaDollar();
    console.log("scraping cronista done");
  });

  return scraper;
};

const globalForScraper = globalThis as unknown as {
  scraper: Cron | undefined;
};

export const scraper = globalForScraper.scraper ?? scraperJob()

if (env.NODE_ENV !== "production") globalForScraper.scraper = scraper;
