import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
      <h1 className="text-9xl font-black gradient-text mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-8">Page Not Found</h2>
      <p className="text-muted-foreground mb-12 max-w-md">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <Button size="lg">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
