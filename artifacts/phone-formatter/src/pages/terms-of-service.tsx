import { Link } from "wouter";
import { ArrowLeft, FileText, PhoneCall } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TERMS = [
  {
    title: "Service availability",
    body:
      "This mock service is provided on an as-available basis. Features, outputs, and page content may change without notice as the product evolves.",
  },
  {
    title: "Acceptable use",
    body:
      "Users agree not to misuse the formatter, interfere with the platform, or submit content that violates applicable law or the rights of others.",
  },
  {
    title: "No warranty",
    body:
      "Results are provided for convenience and may contain errors. Users should independently verify critical phone, region, or timezone data before relying on it.",
  },
  {
    title: "Contact",
    body:
      "Questions about these sample terms can be directed to Hiqain Pvt Ltd through the primary company website listed in the footer.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3 max-w-6xl">
          <div className="bg-primary/10 p-2 rounded-lg">
            <PhoneCall className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Terms of Service</h1>
          <div className="ml-auto">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to Formatter
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 max-w-4xl space-y-6 px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Terms and conditions</CardTitle>
            </div>
            <CardDescription>Mock terms content so the footer links lead to complete pages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {TERMS.map((term) => (
              <section key={term.title} className="space-y-2">
                <h2 className="text-base font-semibold">{term.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{term.body}</p>
              </section>
            ))}
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
