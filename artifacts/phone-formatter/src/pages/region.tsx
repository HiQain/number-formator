import { Link } from "wouter";
import { ArrowLeft, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegionChecker } from "@/components/RegionChecker";

export default function RegionPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3 max-w-6xl">
          <div className="bg-primary/10 p-2 rounded-lg">
            <PhoneCall className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Check Region & Timezone</h1>
          <div className="ml-auto">
            <Link href="/">
              <Button data-testid="button-back-home" variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Formatter
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl space-y-6 lg:space-y-8">
        <RegionChecker />
      </main>

      <footer className="border-t py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground max-w-6xl">
          <p>FormatPhone is a local utility. No data is sent to external servers.</p>
        </div>
      </footer>
    </div>
  );
}
