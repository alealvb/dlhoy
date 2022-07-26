import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import styles from "./styles/app.css";
import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Dolar Blue",
  viewport: "width=device-width,initial-scale=1",
  description: "Dolar Blue en argentina, el precio mas reciente de compra y venta."
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request)
  });
}

export default function App() {
  return (
    <html lang="es" className="h-full">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="h-full">
    <Outlet />
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  );
}
