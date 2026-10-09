<script lang="ts">
  import { icons, type IconName } from "#lib/icons.ts";

  let {
    name,
    class: className = "size-5",
  }: { name: IconName; class?: string } = $props();
</script>

<svg
  {...icons[name].svg}
  class={className}
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {#each icons[name].paths as d (d)}
    <path {d} />
  {/each}
</svg>
