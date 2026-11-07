<script lang="ts">
  import { page } from "$app/state";
  import { refreshAll } from "$app/navigation";
  import { copy } from "#lib/copy.ts";

  const codes = [
    400, 401, 403, 404, 405, 408, 429, 500, 502, 503, 504,
  ] as const;

  let code = $derived<(typeof codes)[number] | "generic">(
    codes.find((code) => code === page.status) ??
      (page.status >= 500 ? 500 : "generic"),
  );
</script>

<svelte:head>
  <title>{copy.error[code].title} · mkelvers</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="my-auto" role={page.status >= 500 ? "alert" : undefined}>
  <p class="text-sm font-medium tracking-tight text-black/60">{page.status}</p>

  <h1 class="mt-2 text-3xl font-semibold tracking-tight">
    {copy.error[code].title}
  </h1>

  <p class="mt-4 text-xl leading-snug tracking-tight text-black/60">
    {copy.error[code].message}
  </p>

  {#if page.error?.message && page.error.message !== copy.error[code].title && page.status !== 404}
    <p class="mt-2 text-sm text-black/60">{page.error.message}</p>
  {/if}

  <div class="mt-8 flex flex-wrap gap-3">
    {#if page.status >= 500 || page.status === 408 || page.status === 429}
      <button
        type="button"
        onclick={() => refreshAll()}
        class="
          cursor-pointer rounded-full bg-black px-6 py-2.5 text-sm font-medium
          text-white transition-colors duration-500 hover:bg-black/90
          motion-reduce:transition-none
        "
      >
        {copy.error.retry}
      </button>
      <a
        href="/"
        class="
          inline-block rounded-full px-6 py-2.5 text-sm font-medium text-black
          transition-colors duration-500 hover:bg-black/10
          motion-reduce:transition-none
        "
      >
        {copy.error.home}
      </a>
    {:else}
      <a
        href="/"
        class="
          inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium
          text-white transition-colors duration-500 hover:bg-black/90
          motion-reduce:transition-none
        "
      >
        {copy.error.home}
      </a>
    {/if}

  </div>
</div>
