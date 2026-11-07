<script lang="ts">
  // The small chevron after "Sora". Pulled in on the right so the comma that
  // follows sits against it instead of after a gap; the hit area stays 24px.
  import { toggleLabel, watchingId, type Disclosure } from "./disclosure.svelte.ts";

  let {
    disclosure,
    button = $bindable(),
  }: { disclosure: Disclosure; button?: HTMLButtonElement } = $props();
</script>

<button
  bind:this={button}
  type="button"
  onclick={disclosure.toggle}
  onblur={disclosure.blur}
  aria-expanded={disclosure.open}
  aria-controls={watchingId}
  aria-label={toggleLabel}
  class="
    -my-1 -mr-1 inline-grid size-6 cursor-pointer place-items-center rounded-full align-middle
    transition-[color,scale] duration-150 ease-out active:scale-[0.97]
    {disclosure.open ? 'text-black' : 'text-black/45 hover:text-black'}
  "
  ><svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="
      size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
      motion-reduce:transition-none {disclosure.open ? 'rotate-180' : ''}
    "
    ><path d="M6 9l6 6l6 -6" /></svg
  ></button
>
