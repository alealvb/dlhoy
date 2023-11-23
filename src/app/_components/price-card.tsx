import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type PriceCardProps = {
  title: string;
  price: number;
};

export function PriceCard({ title, price }: PriceCardProps) {
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
      </CardContent>
    </Card>
  );
}
