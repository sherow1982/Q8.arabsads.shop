declare module "next" {
  export interface Metadata {
    title?: string | { default?: string; template?: string; absolute?: string };
    description?: string;
    metadataBase?: URL;
    alternates?: Record<string, unknown>;
    openGraph?: Record<string, unknown>;
    twitter?: Record<string, unknown>;
    robots?: Record<string, unknown>;
    keywords?: string[];
    authors?: { name: string; url?: string }[];
    creator?: string;
    publisher?: string;
    formatDetection?: Record<string, boolean>;
    applicationName?: string;
  }

  export interface NextConfig {
    output?: string;
    trailingSlash?: boolean;
    images?: {
      unoptimized?: boolean;
    };
  }
}

declare module "next/config" {
  export type NextConfig = import("next").NextConfig;
}

declare module "next/types.js" {
  export type ResolvingMetadata = {
    title?: string | null;
    description?: string | null;
    [key: string]: unknown;
  };

  export type ResolvingViewport = {
    themeColor?: string | null;
    [key: string]: unknown;
  };
}

declare module "next/navigation";
declare module "next/image";
