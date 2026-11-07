<script lang="ts">
  import { frameSrc, preloadFrames, type Frame } from "#lib/mascot/frames.ts";
  import { wait } from "#lib/mascot/motion.ts";
  import { Swarm } from "#lib/mascot/swarm.ts";

  // First click lets the slimes out, second click sends them away.
  let swarm = $state<Swarm>();
  let frame = $state<Frame>("idle");
  let lift = $state(0);
  let button: HTMLButtonElement;

  $effect(() => {
    preloadFrames();
    return () => swarm?.stop({ instant: true });
  });

  // The slimes belong to the intro screen; send them away once it scrolls out of view.
  $effect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) dismiss();
    });
    observer.observe(button);
    return () => observer.disconnect();
  });

  function dismiss() {
    swarm?.stop();
    swarm = undefined;
  }

  async function hop() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps: [Frame, number, number][] = [
      ["squash", 90, 0],
      ["jump", 200, 7],
      ["land", 110, 0],
      ["idle", 0, 0],
    ];

    for (const [next, holdMs, up] of steps) {
      frame = next;
      lift = reduced ? 0 : up;
      await wait(holdMs);
    }
  }

  function toggle() {
    void hop();

    if (swarm) {
      dismiss();
    } else {
      swarm = new Swarm();
      swarm.start();
    }
  }
</script>

<button
  bind:this={button}
  type="button"
  onclick={toggle}
  aria-label="Rimuru"
  aria-pressed={swarm !== undefined}
  class="size-12 cursor-pointer"
>
  <img
    src={frameSrc(frame)}
    alt=""
    width="48"
    height="48"
    style:translate="0 -{lift}px"
    class="
      size-full object-contain transition-[translate] duration-200
      ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none
    "
  />
</button>
