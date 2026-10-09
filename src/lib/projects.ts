import type { Component } from "svelte";
import type { Lang } from "#lib/i18n.ts";

type Module = {
  default: Component;
  metadata: {
    name: string;
    order: number;
    source?: string;
    tags: string[];
    description: Record<Lang, string>;
    facts: Record<Lang, Record<string, string>>;
  };
};

const modules = import.meta.glob<Module>("/src/content/projects/*.md", {
  eager: true,
});

export const projects = Object.entries(modules)
  .map(([path, { default: Content, metadata }]) => ({
    ...metadata,
    Content,
    slug: path.split("/").pop()!.replace(".md", ""),
  }))
  .sort((a, b) => a.order - b.order);
