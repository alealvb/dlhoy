"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type ChartCardProps = {
  data: {
    name: string;
    date: string;
    buyPrice: number;
    sellPrice: number;
  }[];
};

const CustomTooltip = ({
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-center space-y-0 p-3 pb-0">
      <CardTitle className="text-base font-normal">{label}</CardTitle>
    </CardHeader>
    <CardContent className="p-3">
      {payload?.length &&
        payload.map(({ name, color, value }, index) => (
          <p key={index} className="tooltip-items" style={{ color }}>
            {`${name}: ${value as string}`}
          </p>
        ))}
    </CardContent>
  </Card>
);

export function ChartCard({ data }: ChartCardProps) {
  return (
    <Card className="invisible sm:visible">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-normal">Ultimas dos semanas</CardTitle>
      </CardHeader>
      <CardContent className="py-6">
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
              <YAxis domain={["auto", "auto"]} />
              <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
              <Tooltip
                content={({ payload, label }) => (
                  <CustomTooltip payload={payload} label={label as string} />
                )}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="sellPrice"
                name="Venta"
                activeDot={{
                  r: 6,
                  style: { fill: "hsl(var(--destructive))", opacity: 0.25 },
                }}
                dot={false}
                stroke="hsl(var(--destructive))"
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="buyPrice"
                activeDot={{
                  r: 6,
                  style: { fill: "hsl(var(--primary))", opacity: 0.25 },
                }}
                dot={false}
                name="Compra"
                stroke="hsl(var(--primary))"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
