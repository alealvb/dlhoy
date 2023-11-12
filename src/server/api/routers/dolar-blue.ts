import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dollarBlueRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.dolarBlue.findFirst({
      orderBy: { date: "desc" },
    });
  }),

  getLastWeek: publicProcedure.query(({ ctx }) => {
    return ctx.db.dolarBlue.findMany({
      orderBy: { date: "desc" },
      where: {
        date: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });
  }),
});
