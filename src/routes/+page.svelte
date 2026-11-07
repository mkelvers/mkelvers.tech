<script lang="ts">
  import type { PageProps } from "./$types";
  import Mascot from "#lib/components/Mascot.svelte";
  import Rich from "#lib/components/Rich.svelte";
  import Watching from "#lib/components/watching/Watching.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { copy, fill } from "#lib/copy.ts";
  import { profile, stack } from "#lib/profile.ts";

  let { data }: PageProps = $props();
</script>

<Seo
  title={profile.username}
  description={fill(copy.home.description, {
    name: profile.name,
    location: copy.home.location,
  })}
  type="profile"
/>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: copy.home.jobTitle,
    description: fill(copy.home.description, {
      name: profile.name,
      location: copy.home.location,
    }),
    address: { "@type": "PostalAddress", addressCountry: "DK" },
    knowsAbout: stack.map((item) => item.label),
    url: "https://mkelvers.tech",
    image: "https://mkelvers.tech/og.png",
    sameAs: [profile.github, profile.linkedin],
  }).replaceAll("<", "\\u003c")}</script>`}
</svelte:head>

<!-- Kept tight: whitespace here would show up as a gap before the comma. -->
{#snippet watching()}<Watching titles={data.nowWatching} />{/snippet}

<div data-mascot-avoid class="mx-auto w-full max-w-xl my-auto flex flex-col gap-4 leading-relaxed text-black/70">
  <Mascot />

  <h1 class="-mt-2 mb-1 text-xl font-medium tracking-tight text-black">
    {fill(copy.home.headline, {
      name: profile.firstName,
    })}
  </h1>

  <p>{fill(copy.home.intro, { location: copy.home.location })}</p>

  <p>
    <Rich
      text={copy.home.work}
      links={{ sora: "https://github.com/mkelvers/sora", projects: profile.github, cv: "/cv" }}
      slots={data.nowWatching.length > 0 ? { watching } : {}}
    />
  </p>


  <p>
    <Rich
      text={copy.home.contact}
      links={{
        email: `mailto:${profile.email}`,
        linkedin: profile.linkedin,
        github: profile.github,
      }}
    />
  </p>
</div>
