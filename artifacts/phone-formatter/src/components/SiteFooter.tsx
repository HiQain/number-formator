import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright. All rights reserved.</p>
        <Button asChild size="sm">
          <a
            href="https://hiqain.com/"
            target="_blank"
            rel="noreferrer"
          >
            Powered By Hiqain Pvt Ltd
          </a>
        </Button>
      </div>
    </footer>
  );
}
