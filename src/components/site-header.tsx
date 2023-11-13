import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
// import { buttonVariants } from "~/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export async function SiteHeader() {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/">💸 Dl Hoy</Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-auto flex-none">
            {session && <span>{session.user?.name}</span>}
          </div>

          <nav className="flex items-center">
            <div className="ml-2">
              <ModeToggle />
            </div>
            {/* <Link
              className={buttonVariants({ variant: "ghost" })}
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
            >
              {session ? "Sign out" : "Sign in"}
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
