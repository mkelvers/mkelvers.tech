<script lang="ts">
  import "./layout.css";
  import { navigating, page } from "$app/state";
  import favicon from "#lib/assets/favicon.svg";
  import Icon from "#lib/components/Icon.svelte";
  import { t } from "#lib/i18n.ts";
  import type { LayoutProps } from "./$types";

  let { children, data }: LayoutProps = $props();

  const isHome = $derived(page.url.pathname === "/");
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<a
  href="#main"
  class="
    sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
    focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm
    focus:text-white print:hidden
  "
>
  {t("layout.skip")}
</a>

{#if navigating.to}
  <div
    role="progressbar"
    aria-label={t("layout.loading")}
    class="
      progress fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-black
      print:hidden motion-reduce:animate-none
    "
  ></div>
{/if}

<div
  lang={data.lang}
  class="
    relative min-h-screen text-black antialiased print:min-h-0
  "
>
  {#if !isHome}
    {@const toList = page.route.id === "/projects/[slug]"}
    {@const label = t(toList ? "layout.backToProjects" : "layout.backToHome")}
    <a
      href={toList ? "/projects" : "/"}
      aria-label={label}
      title={label}
      class="
        absolute top-6 left-6 z-20 grid size-10 place-items-center rounded-full
        text-black/60 transition-colors duration-300 hover:bg-black/10 hover:text-black
        focus-visible:bg-black/10 focus-visible:text-black print:hidden
      "
    >
      <Icon name="back" class="size-5" />
    </a>
  {/if}

  <div
    class="
      relative flex min-h-screen flex-col px-6 py-12
      print:min-h-0 print:w-full print:px-[52px] print:pt-[42px] print:pb-0
    "
  >
    <div class="mx-auto flex w-full max-w-xl flex-1 flex-col print:max-w-none">
      <main
        id="main"
        tabindex="-1"
        class="flex flex-1 flex-col outline-none {isHome ? '' : 'mt-16'} print:mt-0"
      >
        {@render children()}
      </main>
    </div>
  </div>
</div>
