<script lang="ts">
  // Renders a copy string inline:
  //   `<key>label</key>` becomes a link to links[key],
  //   `<key/>` renders slots[key] at that spot (nothing when that slot isn't passed).
  // Keeps links and small controls inside the sentence instead of splitting the copy around them.
  import type { Snippet } from "svelte";

  let {
    text,
    links = {},
    slots = {},
  }: {
    text: string;
    links?: Record<string, string>;
    slots?: Record<string, Snippet>;
  } = $props();

  type Part =
    | { kind: "text"; text: string }
    | { kind: "link"; href: string; label: string }
    | { kind: "slot"; name: string };

  const parts = $derived(
    text.split(/(<\w+>[^<]*<\/\w+>|<\w+\/>)/).map((part): Part => {
      const link = /^<(\w+)>([^<]*)<\/\1>$/.exec(part);
      if (link) {
        const href = links[link[1]];
        if (!href) throw new Error(`No link for <${link[1]}> in "${text}"`);
        return { kind: "link", href, label: link[2] };
      }

      const slot = /^<(\w+)\/>$/.exec(part);
      if (slot) return { kind: "slot", name: slot[1] };

      return { kind: "text", text: part };
    }),
  );
</script>

{#each parts as part, index (index)}{#if part.kind === "link"}<a
      href={part.href}
      class="
        text-black underline decoration-black/30 underline-offset-4
        transition-colors duration-300 hover:decoration-black
      ">{part.label}</a
    >{:else if part.kind === "slot"}{@render slots[part.name]?.()}{:else}{part.text}{/if}{/each}
