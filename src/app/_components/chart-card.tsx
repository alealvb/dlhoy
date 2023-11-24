"use client";

import type { TooltipProps } from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "~/components/ui/skeleton";
import { differenceInMinutes } from "date-fns";

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

const defaultDays = 14;
const monthDays = 30;
const threeMonthsDays = 90;
const sixMonthsDays = 180;
const oneYearDays = 365;

export function ChartCard() {
  const [days, setDays] = useState(defaultDays);
  const [currentData, setCurrentData] = useState<
    Record<PropertyKey, unknown[]>
  >({});

  const {
    data: dollarData,
    isLoading,
    dataUpdatedAt,
  } = api.dollarBlue.getLastByDays.useQuery({
    days,
  });

  const data = dollarData?.map((item) => ({
    name: "Dolar Blue",
    date: Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "short",
    }).format(item.date),
    sellPrice: Number(item.sellValue),
    buyPrice: Number(item.buyValue),
  }));

  useEffect(() => {
    if (data?.length) {
      if (currentData[days]?.length) {
        const lastDate = new Date(dataUpdatedAt);
        const currentDate = new Date();

        if (differenceInMinutes(currentDate, lastDate) >= 1) {
          setCurrentData((cData) => {
            return {
              ...cData,
              [data.length]: data,
            };
          });
        }
      } else {
        setCurrentData((cData) => {
          return {
            ...cData,
            [data.length]: data,
          };
        });
      }
    }
  }, [data, currentData, dataUpdatedAt, days]);

  const chartCanLoad = !isLoading && currentData[days]?.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Tabs defaultValue="2weeks" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger onClick={() => setDays(oneYearDays)} value="1year">
              1 año
            </TabsTrigger>
            <TabsTrigger onClick={() => setDays(sixMonthsDays)} value="6months">
              6 meses
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setDays(threeMonthsDays)}
              value="3months"
            >
              3 meses
            </TabsTrigger>
            <TabsTrigger onClick={() => setDays(monthDays)} value="1month">
              30 días
            </TabsTrigger>
            <TabsTrigger onClick={() => setDays(defaultDays)} value="2weeks">
              2 semanas
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="py-6">
        <div className="sm:h-[100px] md:h-[150px] xl:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {!chartCanLoad ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <LineChart
                data={currentData[days] ?? []}
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
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
