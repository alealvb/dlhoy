import { CronJob } from "cron";
import { scrapCronistaDollar } from "~/scraper/cronista.server";


export const scraperJob = new CronJob("*/30 * * * *", async function() {
  console.log("scraping cronista");
  await scrapCronistaDollar();
  console.log("scraping cronista done");
});
