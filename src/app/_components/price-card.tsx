"use client";

import { useTheme } from "next-themes";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type PriceCardProps = {
  data: {
    name: string;
    date: string;
    price: number;
  }[];
  title: string;
  price: number;
};

export function PriceCard({ data, title, price }: PriceCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-2xl font-bold">
          {Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(price)}
        </div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
        <div className="sm:h-[100px] md:h-[150px] xl:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <YAxis />
              <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
              <Tooltip labelStyle={{ color: "hsl(var(--primary))" }} />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="price"
                activeDot={{
                  r: 6,
                  style: { fill: "hsl(var(--primary))", opacity: 0.25 },
                }}
                style={{
                  stroke: "hsl(var(--primary))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
