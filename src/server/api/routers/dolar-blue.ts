import { Prisma, type DolarBlue } from "@prisma/client";
import { subDays, isSameDay } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const getLastDaysSchema = z.object({
  days: z.number().min(1).max(365).default(14),
});

export const dollarBlueRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.dolarBlue.findFirst({
      orderBy: { date: "desc" },
    });
  }),

  getLastByDays: publicProcedure
    .input(getLastDaysSchema)
    .query(async ({ ctx, input }) => {
      const numDays = input.days + 1;
      const result = await ctx.db.$queryRaw<DolarBlue[]>`
      SELECT *
      FROM (
        SELECT
          *,
          ROW_NUMBER() OVER (PARTITION BY DATE(date) ORDER BY date DESC) AS rn
        FROM "DolarBlue"
        WHERE date >= NOW() - INTERVAL '${Prisma.sql([`${numDays} days`])}'
      ) AS subquery
      WHERE rn = 1
      ORDER BY date DESC
    `;

      result.reverse();

      const days = Array.from({ length: numDays }, (_, i) =>
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

      result.shift();

      return result;
    }),
});
