import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const dollarBlueRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
  return ctx.db.dolarBlue.findFirst({
      orderBy: { date: "desc" },
    });
  }),
});
