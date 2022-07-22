import { CronJob } from "cron";
import { scrapCronistaDollar } from "~/scraper/cronista.server";
import invariant from "tiny-invariant";

invariant(process.env.CRONISTA_SCRAPER_CRON_TIME, "CRONISTA_SCRAPER_CRON_TIME must be set");

export const scraperJob = new CronJob(process.env.CRONISTA_SCRAPER_CRON_TIME, async function() {
  console.log("scraping cronista");
  await scrapCronistaDollar();
  console.log("scraping cronista done");
});
