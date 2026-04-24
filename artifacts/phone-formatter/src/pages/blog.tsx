import { Link } from "wouter";
import { ArrowLeft, Newspaper, PhoneCall } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const POSTS = [
  {
    title: "Why clean phone formatting improves lead quality",
    summary:
      "Teams that normalize phone numbers before outreach avoid duplicate contacts, improve dialer accuracy, and cut down manual cleanup.",
    date: "April 18, 2026",
  },
  {
    title: "Area code lookups for faster regional routing",
    summary:
      "A quick region lookup helps support and sales teams route calls by timezone and geography without needing a separate CRM step.",
    date: "April 12, 2026",
  },
  {
    title: "Batch validation tips for import-ready contact lists",
    summary:
      "Validate in bulk before you export so invalid records are caught early and your downstream automations stay reliable.",
    date: "April 6, 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3 max-w-6xl">
          <div className="bg-primary/10 p-2 rounded-lg">
            <PhoneCall className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Hiqain Blog</h1>
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
              <Newspaper className="h-5 w-5 text-primary" />
              <CardTitle>Latest Articles</CardTitle>
            </div>
            <CardDescription>Sample blog content for navigation and layout testing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {POSTS.map((post) => (
              <article key={post.title} className="rounded-lg border p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{post.date}</p>
                <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.summary}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
