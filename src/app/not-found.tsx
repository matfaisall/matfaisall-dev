import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-mono text-muted-foreground text-sm">404</p>
      <h1 className="font-semibold text-4xl tracking-tight">Page not found</h1>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
