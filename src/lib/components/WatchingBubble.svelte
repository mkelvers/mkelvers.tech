<script lang="ts">
  // A small Rimuru "saying" what is playing on Sora. It chatters (mouth open/closed)
  // for about a second when the bubble opens, then settles on a happy face.
  import { copy } from "#lib/copy.ts";
  import { frameSrc, type Frame } from "#lib/mascot/frames.ts";

  let { id, titles }: { id: string; titles: string[] } = $props();

  let frame = $state<Frame>("talk");

  $effect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = "happy";
      return;
    }

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

<div {id} class="bubble-in flex items-end gap-2.5">
  <img
    src={frameSrc(frame)}
    alt=""
    width="44"
    height="44"
    class="size-11 shrink-0 object-contain"
  />

  <div class="rounded-2xl rounded-bl-md bg-black/5 px-4 py-2.5 text-sm">
    <p class="text-black/60">{copy.home.watching}</p>
    <ul class="mt-0.5 text-black">
      {#each titles as title (title)}
        <li>{title}</li>
      {/each}
    </ul>
  </div>
</div>
