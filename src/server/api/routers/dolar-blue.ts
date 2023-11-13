import type { DolarBlue } from "@prisma/client";
import { subDays, isSameDay } from "date-fns";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dollarBlueRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.dolarBlue.findFirst({
      orderBy: { date: "desc" },
    });
  }),

  getLastTwoWeeks: publicProcedure.query(async ({ ctx }) => {
    const weekDays = 14;
    const result: DolarBlue[] = await ctx.db.$queryRaw`
      SELECT *
      FROM "DolarBlue"
      WHERE date IN (
        SELECT MAX(date)
        FROM "DolarBlue"
        GROUP BY DATE(date)
      ) AND date >= NOW() - INTERVAL '14 days'
      ORDER BY date DESC
    `;

    result.reverse();

    const days = Array.from({ length: weekDays }, (_, i) =>
      subDays(new Date(), i + 1),
    ).reverse();

    for (let i = 0; i < days.length; i++) {
      const day = days[i]!;
      const dollar = result[i];

      if (!dollar || !isSameDay(day, dollar.date)) {
        result.splice(i, 0, {
          ...(result[i - 1] ?? result[0]),
          date: day,
        } as DolarBlue);
      }
    }

    return result;
  }),
});
