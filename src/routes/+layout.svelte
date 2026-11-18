<script lang="ts">
  import "./layout.css";
  import { onNavigate } from "$app/navigation";
  import { navigating } from "$app/state";
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();

  onNavigate((navigation) => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reducedMotion) {
      return;
    }

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" href="/mascot/idle.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<a
  href="#main"
  class="
    sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
    focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm
    focus:text-white print:hidden
  "
>
  Skip to content
</a>

<main
  id="main"
  tabindex="-1"
  aria-busy={navigating.to !== null}
  class="
    mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-12 outline-none
    print:min-h-0 print:max-w-none print:px-13 print:pt-10.5 print:pb-0
  "
>
  {@render children()}
</main>
