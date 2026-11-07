<script lang="ts">
  // Renders a copy string where `<key>label</key>` becomes a link to links[key].
  // Keeps links inside the sentence instead of splitting the copy around them.
  let { text, links }: { text: string; links: Record<string, string> } = $props();

  const parts = $derived(
    text.split(/(<\w+>[^<]*<\/\w+>)/).map((part) => {
      const match = /^<(\w+)>([^<]*)<\/\1>$/.exec(part);
      return match ? { href: links[match[1]], label: match[2] } : { label: part };
    }),
  );
</script>

{#each parts as part, index (index)}{#if part.href}<a
      href={part.href}
      class="
        text-black underline decoration-black/30 underline-offset-4
        transition-colors duration-300 hover:decoration-black
      ">{part.label}</a
    >{:else}{part.label}{/if}{/each}
