<script lang="ts">
  import { page } from "$app/state";

  type Props = {
    name: string;
    description: string;
    caption?: string;
  };

  let { name, description, caption }: Props = $props();
</script>

<figure class="my-8">
  <div
    role="img"
    aria-label={description}
    class="overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
  >
    {@html page.data.diagrams?.[name]}
  </div>

  {#if caption}
    <figcaption class="mt-3 text-xs text-black/60">{caption}</figcaption>
  {/if}
</figure>
