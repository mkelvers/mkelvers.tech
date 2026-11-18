<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import { profile } from "#lib/utils.ts";
  import { Disclosure } from "./disclosure.svelte.ts";

  let {
    titles,
  }: {
    titles: string[];
  } = $props();

  const id = $props.id();
  const disclosure = new Disclosure();
  const parts = $derived(
    new Intl.ListFormat("en-GB", {
      type: "conjunction",
    }).formatToParts(titles),
  );

  const besideMascot: Attachment<HTMLElement> = (bubble) => {
    const place = () => {
      const root = bubble.parentElement;
      const mascot = root?.closest("[data-mascot-avoid]")?.firstElementChild;
      if (!root || !mascot) {
        return;
      }

      const slime = mascot.getBoundingClientRect();
      const origin = root.getBoundingClientRect();
      const x = slime.left + 52;

      bubble.style.left = `${x - origin.left}px`;
      bubble.style.bottom = `${origin.bottom - slime.top - 45}px`;
      bubble.style.maxWidth = `${Math.min(288, document.documentElement.clientWidth - x - 16)}px`;
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  };
</script>

<span class="inline-flex">
  <a
    href="https://github.com/mkelvers/sora"
    class="
      text-black underline decoration-black/30 underline-offset-4
      transition-colors duration-300 hover:decoration-black
    "
  >
    Sora
  </a>

  {#if titles.length > 0}
    <span
      {@attach disclosure.dismissible}
      role="presentation"
      class="relative mt-1 inline-flex self-center"
      onpointerenter={disclosure.enter}
      onpointerleave={disclosure.leave}
    >
      <button
        type="button"
        onclick={disclosure.toggle}
        onblur={disclosure.blur}
        aria-expanded={disclosure.open}
        aria-controls={id}
        aria-label="What I'm watching right now"
        class="
          -my-1 -mr-1 inline-grid size-6 cursor-pointer place-items-center rounded-full align-middle
          transition duration-150 ease-out active:scale-95
          {disclosure.open ? 'text-black' : 'text-black/45 hover:text-black'}
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="
            size-4 transition-transform duration-200 ease-out
            motion-reduce:transition-none {disclosure.open ? 'rotate-180' : ''}
          "
        >
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </button>

      {#if disclosure.open}
        <span
          {id}
          class="
            watching-say absolute z-30 block w-max rounded-2xl
            px-3.5 py-2 text-left text-black/70
          "
          {@attach besideMascot}
        >
          Right now {profile.firstName} is watching
          {#each parts as part, index (index)}
            {#if part.type === "element"}
              <span class="text-black">{part.value}</span>
            {:else}
              {part.value}
            {/if}
          {/each}.
        </span>
      {/if}
    </span>
  {/if}
</span>
