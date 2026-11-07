<script lang="ts">
  // The big mascot above the heading does the talking. The chevron
  // still opens it, but the bubble appears beside Rimuru, tail at his face, and grows
  // upward into the empty space above the column so it never covers the heading.
  // It stays a child of this <span> so screen readers meet it right after the chevron.
  import { copy } from "#lib/copy.ts";
  import { profile } from "#lib/profile.ts";
  import Chevron from "./Chevron.svelte";
  import { Disclosure, watchingId, watchingParts } from "./disclosure.svelte.ts";

  let { titles }: { titles: string[] } = $props();

  const disclosure = new Disclosure();
  const parts = $derived(
    watchingParts(copy.home.watching, titles, { name: profile.firstName }),
  );
  const edge = 16;

  // Where the slime sits inside its 48px frame: its right side and its face.
  const slimeRight = 42;
  const slimeFace = 25;

  let root = $state<HTMLSpanElement>();
  let trigger = $state<HTMLButtonElement>();
  let left = $state(0);
  let top = $state(0);
  let maxWidth = $state(288);

  disclosure.attach(
    () => root,
    () => trigger,
  );

  // The mascot is the first child of the home column (src/routes/+page.svelte).
  function place() {
    const mascot = root?.closest("[data-mascot-avoid]")?.firstElementChild;
    if (!root || !mascot) return;
    const box = mascot.getBoundingClientRect();
    const origin = root.getBoundingClientRect();
    const x = box.left + slimeRight + 10;

    left = x - origin.left;
    top = box.top + slimeFace - origin.top;
    maxWidth = Math.min(288, document.documentElement.clientWidth - x - edge);
  }

  $effect(() => {
    if (!disclosure.open) return;
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  });
</script>

<span
  bind:this={root}
  role="presentation"
  class="relative"
  onpointerenter={disclosure.enter}
  onpointerleave={disclosure.leave}
  ><Chevron {disclosure} bind:button={trigger} />{#if disclosure.open}<span
      id={watchingId}
      class="
        watching-say absolute z-30 block w-max -translate-y-[calc(100%-1.25rem)] rounded-2xl
        px-3.5 py-2 text-left text-black/70
      "
      style:left="{left}px"
      style:top="{top}px"
      style:max-width="{maxWidth}px"
      >{#each parts as part, index (index)}{#if part.title}<span class="text-black"
            >{part.text}</span
          >{:else}{part.text}{/if}{/each}<span
        aria-hidden="true"
        class="watching-tail absolute right-full bottom-3.5 size-3 translate-x-2/3 rotate-45 rounded-[3px]"
      ></span></span
    >{/if}</span
>
