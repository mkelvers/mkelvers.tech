<script lang="ts">
  // A chevron that sits inside a sentence. Hover it (or tap/focus it) and a dark speech
  // bubble pops up above it, with a small Rimuru saying what is playing on Sora.
  // Everything is a <span> because it lives inside a <p>.
  import { copy } from "#lib/copy.ts";
  import { frameSrc, type Frame } from "#lib/mascot/frames.ts";

  let { titles }: { titles: string[] } = $props();

  const id = "now-watching";
  const edge = 12;

  let open = $state(false);
  let pinned = $state(false);
  let frame = $state<Frame>("talk");
  let shift = $state(0);
  let trigger: HTMLButtonElement;
  let tip = $state<HTMLSpanElement>();
  let closeTimer = 0;

  const show = () => {
    clearTimeout(closeTimer);
    open = true;
  };
  const hideSoon = () => {
    if (pinned) return;
    closeTimer = window.setTimeout(() => (open = false), 120);
  };
  const close = () => {
    open = false;
    pinned = false;
  };

  function toggle() {
    pinned = !pinned;
    open = pinned;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape" || !open) return;
    close();
    trigger.focus();
  }

  // Keep the bubble on screen near the edges; the tail keeps pointing at the chevron.
  // Measured from the chevron and the bubble's real width, not its box, which is
  // still scaled down by the opening animation at this point.
  $effect(() => {
    if (!open || !tip) return;
    const button = trigger.getBoundingClientRect();
    const center = button.left + button.width / 2;
    const half = tip.offsetWidth / 2;
    if (center + half > innerWidth - edge) shift = innerWidth - edge - (center + half);
    else if (center - half < edge) shift = edge - (center - half);
    else shift = 0;
  });

  // Chatter for about a second each time the bubble opens, then smile.
  $effect(() => {
    if (!open) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = "happy";
      return;
    }

    frame = "talk";
    let step = 0;
    const timer = setInterval(() => {
      step++;
      frame = step % 2 === 1 ? "talk-blink" : "talk";
      if (step >= 8) {
        clearInterval(timer);
        frame = "happy";
      }
    }, 140);

    return () => clearInterval(timer);
  });
</script>

<svelte:window onkeydown={onKeydown} />

<span
  role="presentation"
  class="relative inline-block align-middle"
  onpointerenter={(event) => event.pointerType === "mouse" && show()}
  onpointerleave={(event) => event.pointerType === "mouse" && hideSoon()}
><button
    bind:this={trigger}
    type="button"
    onclick={toggle}
    onfocus={show}
    onblur={() => !pinned && (open = false)}
    aria-expanded={open}
    aria-controls={id}
    aria-label={copy.home.watchingToggle}
    class="
      -my-1 ml-0.5 grid size-6 cursor-pointer place-items-center rounded-full
      text-black/50 transition-colors duration-200 hover:bg-black/5 hover:text-black
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
        motion-reduce:transition-none {open ? 'rotate-180' : ''}
      "
    ><path d="M6 9l6 6l6 -6" /></svg></button
  >{#if open}<span
      bind:this={tip}
      {id}
      role="status"
      class="watching-tip absolute bottom-full z-30 mb-2.5 flex w-max max-w-72 items-center gap-2.5
        rounded-xl bg-black py-2 pr-3.5 pl-2 text-left text-sm leading-snug text-white shadow-lg"
      style:left="calc(50% + {shift}px)"
      style:--tail="calc(50% - {shift}px)"
    ><img
        src={frameSrc(frame)}
        alt=""
        width="32"
        height="32"
        class="size-8 shrink-0 object-contain"
      /><span class="block"
      ><span class="block text-white/60">{copy.home.watching}</span
        >{#each titles as title (title)}<span class="block">{title}</span>{/each}</span
      ><span
        aria-hidden="true"
        class="absolute top-full size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black"
        style:left="var(--tail)"
      ></span></span
    >{/if}</span
>
