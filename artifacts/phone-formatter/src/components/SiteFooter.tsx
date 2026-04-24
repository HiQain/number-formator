import { Link } from "wouter";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto grid max-w-6xl gap-3 px-4 py-4 text-sm text-muted-foreground md:grid-cols-3 md:items-center">
        <p className="text-center md:text-left">Copyright 2026 Hiqain Phone Formatter.</p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center"
        >
          {FOOTER_LINKS.map((link, index) => (
            <span key={link.href} className="inline-flex items-center gap-3">
              {index > 0 ? <span className="text-border">|</span> : null}
              <Link
                href={link.href}
                className="transition-colors hover:text-primary hover:underline"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="text-center md:text-right">
          <a
            href="https://hiqain.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary hover:underline"
          >
            Powered By Hiqain Pvt Ltd
          </a>
        </div>
      </div>
    </footer>
  );
}
