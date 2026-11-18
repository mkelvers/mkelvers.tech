<script lang="ts">
  import { frames, type Frame } from "#lib/utils.ts";
  import { Swarm } from "#lib/mascot/swarm.ts";

  let swarm = $state<Swarm>();
  let frame = $state<Frame>("idle");
  let lift = $state(0);
  let button: HTMLButtonElement;

  $effect(() => {
    for (const name of frames) {
      new Image().src = `/mascot/${name}.webp`;
    }

    return () =>
      swarm?.stop({
        instant: true,
      });
  });

  $effect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        dismiss();
      }
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
      await new Promise((resolve) => setTimeout(resolve, holdMs));
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
  aria-label="Let the slimes out"
  aria-pressed={swarm !== undefined}
  class="size-12 cursor-pointer"
>
  <img
    src={`/mascot/${frame}.webp`}
    alt=""
    width="48"
    height="48"
    style:translate="0 -{lift}px"
    class="
      size-full object-contain transition-transform duration-200
      ease-out motion-reduce:transition-none
    "
  />
</button>
