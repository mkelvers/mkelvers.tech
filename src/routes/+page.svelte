<script lang="ts">
  import Icon from "#lib/components/Icon.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile, stack } from "#lib/profile.ts";

  const icons = import.meta.glob<string>("../lib/assets/stack/*.svg", {
    eager: true,
    query: "?url",
    import: "default",
  });
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

<div class="my-auto">
  <h1 class="text-3xl font-semibold tracking-tight">
    {t("home.headline1", {
      name: profile.name,
    })}
    <br />
    {t("home.headline2")}
  </h1>

  <p class="mt-6 text-xl leading-snug tracking-tight text-black/60">
    {t("home.introBefore")}
    <a
      href="/projects/sora"
      class="
        text-black underline decoration-black/60 underline-offset-4
        transition-colors duration-300 hover:decoration-black
      "
    >
      Sora
    </a>{t("home.introAfter")}
  </p>

  <p class="mt-8 text-sm text-black/80">
    {t("home.looking", {
      location: t("home.location"),
    })}
  </p>

  <ul
    class="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-black/60"
    aria-label={t("home.technologies")}
  >
    {#each stack as item (item.icon)}
      <li
        class="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-black"
      >
        <img
          src={icons[`../lib/assets/stack/${item.icon}.svg`]}
          alt=""
          width="16"
          height="16"
          class="
            size-4 opacity-70 grayscale transition duration-300
            group-hover:opacity-100 group-hover:grayscale-0
          "
        />
        {item.label}
      </li>
    {/each}
  </ul>

  <div class="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
    <a
      href="/projects"
      class="
        rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white
        transition-colors duration-500 hover:bg-black/90 motion-reduce:transition-none
      "
    >
      {t("home.viewProjects")}
    </a>

    <nav
      class="flex items-center gap-4 text-black/60"
      aria-label={t("home.contact")}
    >
      {#each ["email", "github", "linkedin"] as const as name (name)}
        {@const label = t(`home.links.${name}`)}
        <a
          href={name === "email" ? `mailto:${profile.email}` : profile[name]}
          aria-label={label}
          title={label}
          class="transition-colors duration-300 hover:text-black"
        >
          <Icon {name} class="size-6" />
        </a>
      {/each}
    </nav>
  </div>
</div>
