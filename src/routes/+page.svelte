<script lang="ts">
  import Mascot from "#lib/components/Mascot.svelte";
  import Rich from "#lib/components/Rich.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile, stack } from "#lib/profile.ts";
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

<div data-mascot-avoid class="my-auto flex flex-col gap-4 leading-relaxed text-black/70">
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
      links={{ sora: "/projects/sora", projects: "/projects", cv: "/cv" }}
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
