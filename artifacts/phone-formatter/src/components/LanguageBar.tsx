import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: {
          InlineLayout?: {
            SIMPLE: unknown;
          };
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              autoDisplay: boolean;
              layout?: unknown;
            },
            elementId: string,
          ): unknown;
        };
      };
    };
    googleTranslateElementInit?: () => void;
    __phoneFormatterTranslateReady?: boolean;
  }
}

const GOOGLE_SCRIPT_ID = "google-translate-script";
const STORAGE_KEY = "phone-formatter-language";

export const LANGUAGE_OPTIONS: ReadonlyArray<{
  label: string;
  code: string;
  italic?: boolean;
}> = [
  { label: "English", code: "en" },
  { label: "German", code: "de" },
  { label: "Spanish", code: "es" },
  { label: "French", code: "fr" },
  { label: "Italic", code: "it" },
  { label: "Portuguese", code: "pt" },
  { label: "Indonesian", code: "id" },
  { label: "Russian", code: "ru" },
  { label: "Thai", code: "th" },
  { label: "Arabic", code: "ar" },
];

type LanguageCode = (typeof LANGUAGE_OPTIONS)[number]["code"];

function getGoogleTranslateCookieValue(languageCode: string) {
  return `/en/${languageCode}`;
}

function setGoogleTranslateCookie(languageCode: string) {
  const value = getGoogleTranslateCookieValue(languageCode);
  const cookie = `googtrans=${value}; path=/`;

  document.cookie = cookie;

  const hostname = window.location.hostname;

  if (hostname.includes(".")) {
    document.cookie = `${cookie}; domain=${hostname}`;
  }
}

function getStoredLanguage() {
  const cookieMatch = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);

  if (cookieMatch?.[1]) {
    const cookieValue = decodeURIComponent(cookieMatch[1]);
    const languageFromCookie = cookieValue.split("/").pop();

    if (languageFromCookie) {
      return languageFromCookie;
    }
  }

  return window.localStorage.getItem(STORAGE_KEY) ?? "en";
}

function getTranslateSelect() {
  return document.querySelector<HTMLSelectElement>(".goog-te-combo");
}

function dispatchTranslateChange(languageCode: string) {
  const select = getTranslateSelect();

  if (!select) {
    return false;
  }

  select.value = languageCode;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  document.documentElement.lang = languageCode;
  window.localStorage.setItem(STORAGE_KEY, languageCode);
  return true;
}

function translateToLanguage(languageCode: LanguageCode, selectedLanguage: string) {
  if (languageCode === selectedLanguage) {
    return;
  }

  setGoogleTranslateCookie(languageCode);
  window.localStorage.setItem(STORAGE_KEY, languageCode);
  document.documentElement.lang = languageCode;

  if (dispatchTranslateChange(languageCode)) {
    window.setTimeout(() => {
      window.location.reload();
    }, 150);
    return;
  }

  window.location.reload();
}

function useTranslatorState() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatorStatus, setTranslatorStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    setSelectedLanguage(storedLanguage);

    const initializeTranslator = () => {
      if (
        window.google?.translate?.TranslateElement &&
        !window.__phoneFormatterTranslateReady
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGUAGE_OPTIONS.map((language) => language.code).join(","),
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
          },
          "google_translate_element",
        );

        window.__phoneFormatterTranslateReady = true;
      }

      if (!window.__phoneFormatterTranslateReady) {
        return;
      }

      setTranslatorStatus("ready");

      const languageToApply = getStoredLanguage();
      window.setTimeout(() => {
        dispatchTranslateChange(languageToApply);
      }, 250);
    };

    window.googleTranslateElementInit = initializeTranslator;

    if (window.google?.translate?.TranslateElement) {
      initializeTranslator();
      return undefined;
    }

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;

    const handleScriptLoad = () => {
      window.setTimeout(() => {
        if (window.google?.translate?.TranslateElement) {
          initializeTranslator();
          return;
        }

        setTranslatorStatus("error");
      }, 150);
    };

    const handleScriptError = () => {
      setTranslatorStatus("error");
    };

    if (existingScript) {
      existingScript.addEventListener("load", handleScriptLoad);
      existingScript.addEventListener("error", handleScriptError);
      handleScriptLoad();

      return () => {
        existingScript.removeEventListener("load", handleScriptLoad);
        existingScript.removeEventListener("error", handleScriptError);
      };
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://translate.google.com/translate_a/element.js";
    script.async = true;
    script.addEventListener("load", handleScriptLoad);
    script.addEventListener("error", handleScriptError);
    document.body.appendChild(script);

    const timeoutId = window.setTimeout(() => {
      if (!window.google?.translate?.TranslateElement) {
        setTranslatorStatus("error");
      }
    }, 8000);

    return () => {
      window.clearTimeout(timeoutId);
      script.removeEventListener("load", handleScriptLoad);
      script.removeEventListener("error", handleScriptError);
    };
  }, []);

  const selectLanguage = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    translateToLanguage(languageCode as LanguageCode, selectedLanguage);
  };

  return { selectedLanguage, selectLanguage, translatorStatus };
}

export function LanguageSelector({
  className,
}: {
  className?: string;
}) {
  const { selectedLanguage, selectLanguage } = useTranslatorState();

  return (
    <Select value={selectedLanguage} onValueChange={selectLanguage}>
      <SelectTrigger
        className={className ?? "h-9 w-[156px] bg-background"}
        data-testid="select-language"
        aria-label="Select language"
      >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGE_OPTIONS.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <span className={language.italic ? "italic" : undefined}>{language.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function LanguageBar() {
  const { selectedLanguage, selectLanguage, translatorStatus } = useTranslatorState();

  return (
    <div className="border-t bg-background/95">
      <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-foreground">
          {LANGUAGE_OPTIONS.map((language) => {
            const isActive = selectedLanguage === language.code;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() => selectLanguage(language.code)}
                className={[
                  "cursor-pointer transition-colors hover:text-primary",
                  language.italic ? "italic" : "",
                  isActive ? "text-primary" : "text-foreground",
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-testid={`button-language-${language.code}`}
              >
                {language.label}
              </button>
            );
          })}
        </div>

        <div className="min-h-5 text-center text-xs text-muted-foreground">
          <div id="google_translate_element" className="sr-only" />
          {translatorStatus === "ready" ? "Select a language to translate this page." : null}
          {translatorStatus === "loading" ? "Loading translator..." : null}
          {translatorStatus === "error"
            ? "Translator could not load on this connection. Try refreshing the page."
            : null}
        </div>
      </div>
    </div>
  );
}
