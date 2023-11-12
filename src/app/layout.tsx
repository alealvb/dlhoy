import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { Providers } from "~/components/providers";
import { SiteHeader } from "~/components/site-header";
import { TailwindIndicator } from "~/components/tailwind-indicator";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Dolar Blue",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider headers={headers()}>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">
                <div className="container relative">
                  <section>{children}</section>
                </div>
              </div>
            </div>
          </Providers>
        </TRPCReactProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
