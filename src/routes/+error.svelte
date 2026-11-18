<script lang="ts">
  import { page } from "$app/state";
  import { refreshAll } from "$app/navigation";

  const errors: Record<
    number,
    {
      title: string;
      message: string;
    }
  > = {
    400: {
      title: "Bad request",
      message: "That request didn't make sense to the server.",
    },
    401: {
      title: "Sign in required",
      message: "You need to sign in to see this.",
    },
    403: {
      title: "Not allowed",
      message: "You don't have access to this page.",
    },
    404: {
      title: "Page not found",
      message: "This page doesn't exist, or it has moved.",
    },
    405: {
      title: "Method not allowed",
      message: "This page doesn't accept that kind of request.",
    },
    408: {
      title: "Request timed out",
      message: "The request took too long. Try again.",
    },
    429: {
      title: "Too many requests",
      message: "Slow down a little and try again in a moment.",
    },
    500: {
      title: "Something went wrong",
      message: "An unexpected error happened on my end. Try again in a moment.",
    },
    502: {
      title: "Bad gateway",
      message: "The server got a bad response. Try again shortly.",
    },
    503: {
      title: "Temporarily unavailable",
      message: "The site is down for a moment. Try again shortly.",
    },
    504: {
      title: "Gateway timeout",
      message: "The server took too long to answer.",
    },
  };

  const error = $derived(
    errors[page.status] ??
      (page.status >= 500
        ? errors[500]
        : {
            title: "Something went wrong",
            message: "This page couldn't be shown.",
          }),
  );
  const retryable = $derived(page.status >= 500 || page.status === 408 || page.status === 429);
  const detail = $derived(
    page.status !== 404 && page.error?.message !== error.title ? page.error?.message : undefined,
  );
</script>

<svelte:head>
  <title>{error.title} · mkelvers</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="my-auto" role={page.status >= 500 ? "alert" : undefined}>
  <p class="text-sm font-medium tracking-tight text-black/60">{page.status}</p>

  <h1 class="mt-2 text-3xl font-semibold tracking-tight">
    {error.title}
  </h1>

  <p class="mt-4 text-xl leading-snug tracking-tight text-black/60">
    {error.message}
  </p>

  {#if detail}
    <p class="mt-2 text-sm text-black/60">{detail}</p>
  {/if}

  <div class="mt-8 flex flex-wrap gap-3">
    {#if retryable}
      <button
        type="button"
        onclick={() => refreshAll()}
        class="
          cursor-pointer rounded-full bg-black px-6 py-2.5 text-sm font-medium
          text-white transition-colors duration-500 hover:bg-black/90
          motion-reduce:transition-none
        "
      >
        Try again
      </button>
    {/if}

    <a
      href="/"
      class="
        inline-block rounded-full px-6 py-2.5 text-sm font-medium transition-colors
        duration-500 motion-reduce:transition-none
        {retryable ? 'text-black hover:bg-black/10' : 'bg-black text-white hover:bg-black/90'}
      "
    >
      Back to home
    </a>
  </div>
</div>
