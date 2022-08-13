import { prisma } from "~/db.server";

export type { DolarBlue } from "@prisma/client";

export async function getCurrentDolarBlue() {
  return await prisma.dolarBlue.findFirst({ orderBy: { date: "desc" } });
}
