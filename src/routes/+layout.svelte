<script lang="ts">
  import "./layout.css";
  import { navigating, page } from "$app/state";
  import favicon from "#lib/assets/favicon.svg";
  import Icon from "#lib/components/Icon.svelte";
  import { languages, t } from "#lib/i18n.ts";
  import { setLang } from "#lib/lang.remote.ts";
  import { profile } from "#lib/profile.ts";
  import { setTheme } from "#lib/theme.remote.ts";
  import type { LayoutProps } from "./$types";

  let { children, data }: LayoutProps = $props();

  $effect(() => {
    document.documentElement.dataset.theme = data.theme ?? "";
  });
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
    relative min-h-screen text-black antialiased selection:bg-leaf
    selection:text-white print:min-h-0
  "
>
  {#if page.url.pathname !== "/"}
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
      hero fixed inset-y-0 right-0 hidden w-1/2 lg:block print:hidden
    "
  >
    <enhanced:img
      src="#lib/assets/illustrations/hero.png?w=1122;720&quality=95"
      alt=""
      sizes="50vw"
      loading="eager"
      class="size-full object-cover"
    />
  </div>

  <div
    class="
      relative flex min-h-screen flex-col px-6 py-12 lg:w-1/2 lg:px-10
      print:min-h-0 print:w-full print:px-10 print:pt-8 print:pb-0
    "
  >
    <form
      {...setLang}
      aria-label={t("layout.language")}
      class="absolute top-6 right-6 z-20 flex gap-1 text-xs print:hidden lg:right-10"
    >
      {#each languages as code (code)}
        <button
          {...setLang.fields.lang.as("submit", code)}
          lang={code}
          aria-pressed={code === data.lang}
          class="
            cursor-pointer rounded-full px-2.5 py-1 uppercase
            transition-colors duration-300
            {code === data.lang
            ? 'bg-black/10 text-black'
            : 'text-black/60 hover:text-black'}
          "
        >
          {code}
        </button>
      {/each}
    </form>

    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col print:max-w-none">
      <main
        id="main"
        tabindex="-1"
        class="mt-24 flex flex-1 flex-col outline-none print:mt-0"
      >
        {@render children()}
      </main>

      <footer
        class="mt-auto flex items-center justify-between pt-16 text-xs text-black/60 print:hidden"
      >
        <span>© 2026 {profile.name}</span>

        <div class="flex items-center gap-4">
          <nav class="flex gap-4" aria-label={t("layout.footer")}>
            <a
              href="/projects"
              aria-current={page.url.pathname.startsWith("/projects")
                ? "page"
                : undefined}
              class="transition-colors duration-300 hover:text-black"
            >
              {t("layout.projects")}
            </a>
            <a
              href="/cv"
              aria-current={page.url.pathname.startsWith("/cv")
                ? "page"
                : undefined}
              class="transition-colors duration-300 hover:text-black"
            >
              {t("layout.cv")}
            </a>
          </nav>

          <form {...setTheme} class="-my-2 -mr-1.5 grid">
            {#each [["light", "sun"], ["dark", "moon"]] as const as [code, icon] (code)}
              {@const label = t(`layout.theme.${code}`)}
              <button
                {...setTheme.fields.theme.as("submit", code)}
                aria-label={label}
                title={label}
                class="
                  theme-{code} size-8 cursor-pointer place-items-center
                  rounded-full transition-colors duration-300
                  hover:bg-black/10 hover:text-black
                "
              >
                <Icon name={icon} class="size-5" />
              </button>
            {/each}
          </form>
        </div>
      </footer>
    </div>
  </div>
</div>
