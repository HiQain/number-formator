import { Link } from "wouter";
import { ArrowLeft, Lock, PhoneCall } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SECTIONS = [
  {
    title: "Information we collect",
    body:
      "This demo privacy policy uses placeholder content. We may collect contact inputs, device details, and usage analytics to improve formatting and validation workflows.",
  },
  {
    title: "How information is used",
    body:
      "Collected data may be used to operate the service, troubleshoot issues, prevent abuse, and understand which tools are most useful to visitors.",
  },
  {
    title: "Data sharing",
    body:
      "We do not sell personal information in this mock example. Trusted processors may handle hosting, analytics, and infrastructure support on our behalf.",
  },
  {
    title: "Your choices",
    body:
      "Users can request access, correction, or deletion of retained information, subject to legal and operational requirements.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center gap-3 max-w-6xl">
          <div className="bg-primary/10 p-2 rounded-lg">
            <PhoneCall className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Privacy Policy</h1>
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
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>How we handle information</CardTitle>
            </div>
            <CardDescription>Mock privacy text for site navigation and policy-page layout.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {SECTIONS.map((section) => (
              <section key={section.title} className="space-y-2">
                <h2 className="text-base font-semibold">{section.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{section.body}</p>
              </section>
            ))}
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </div>
  );
}
