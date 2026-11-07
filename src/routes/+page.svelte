<script lang="ts">
  import Cv from "#lib/components/Cv.svelte";
  import Mascot from "#lib/components/Mascot.svelte";
  import ProjectReel from "#lib/components/ProjectReel.svelte";
  import Rich from "#lib/components/Rich.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile, stack } from "#lib/profile.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Seo
  title={t("home.title", {
    name: profile.name,
  })}
  description={t("home.description", {
    name: profile.name,
    location: t("home.location"),
  })}
  type="profile"
/>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: t("home.jobTitle"),
    description: t("home.description", {
      name: profile.name,
      location: t("home.location"),
    }),
    address: { "@type": "PostalAddress", addressCountry: "DK" },
    knowsAbout: stack.map((item) => item.label),
    sameAs: [profile.github, profile.linkedin],
  }).replaceAll("<", "\\u003c")}</script>`}
</svelte:head>

<!-- Three screens: intro, the project reel, the CV. `data-snap-page` turns on scroll snapping. -->
<div data-snap-page>
  <section class="relative flex min-h-svh snap-start items-center px-6 print:hidden">
    <div
      data-mascot-avoid
      class="mx-auto flex w-full max-w-xl flex-col gap-4 leading-relaxed text-black/70"
    >
      <Mascot />

      <h1 class="-mt-2 mb-1 text-xl font-medium tracking-tight text-black">
        {t("home.headline", {
          name: profile.firstName,
        })}
      </h1>

      <p>{t("home.intro", { location: t("home.location") })}</p>

      <p>
        <Rich
          text={t("home.work")}
          links={{ sora: "#projects", projects: "#projects", cv: "#cv" }}
        />
      </p>

      <p>
        <Rich
          text={t("home.contact")}
          links={{
            email: `mailto:${profile.email}`,
            linkedin: profile.linkedin,
            github: profile.github,
          }}
        />
      </p>
    </div>

    <a
      href="#projects"
      aria-label={t("home.scrollHint")}
      title={t("home.scrollHint")}
      class="
        absolute bottom-8 left-1/2 grid size-10 -translate-x-1/2 place-items-center
        rounded-full text-black/40 transition-colors duration-300 hover:text-black
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="chevron size-5"
        aria-hidden="true"
      >
        <path d="M6 9l6 6l6 -6" />
      </svg>
    </a>
  </section>

  <ProjectReel lang={data.lang} />

  <section
    id="cv"
    class="snap-start px-6 py-24 print:p-0 print:px-[52px] print:pt-[42px]"
  >
    <div class="mx-auto max-w-xl print:max-w-none">
      <Cv lang={data.lang} nested />
    </div>
  </section>
</div>
