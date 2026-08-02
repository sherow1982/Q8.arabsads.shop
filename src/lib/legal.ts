import type { Metadata } from "next";
import { absoluteUrl } from "./schema";

export function legalMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
    },
  };
}
