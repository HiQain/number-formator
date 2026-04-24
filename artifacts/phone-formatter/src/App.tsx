import { Switch, Route, Link, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import BlogPage from "@/pages/blog";
import NotFound from "@/pages/not-found";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import RegionPage from "@/pages/region";
import TermsOfServicePage from "@/pages/terms-of-service";
import { BulkValidator } from "@/components/BulkValidator";
import { BulkPaste } from "@/components/BulkPaste";
import { SiteFooter } from "@/components/SiteFooter";
import { PhoneCall, MapPin } from "lucide-react";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3 max-w-6xl">
          <div className="bg-primary/10 p-2 rounded-lg">
            <PhoneCall className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">US Phone Number Formatter</h1>
          <div className="ml-auto">
            <Link href="/region">
              <Button data-testid="button-toggle-region" variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1.5" />
                Check Region
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl space-y-6 lg:space-y-8">
        <BulkPaste />
        <BulkValidator />
      </main>

      <SiteFooter />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-of-service" component={TermsOfServicePage} />
      <Route path="/region" component={RegionPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
