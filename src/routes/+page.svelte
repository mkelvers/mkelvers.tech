<script lang="ts">
  import type { PageProps } from "./$types";
  import Mascot from "#lib/components/Mascot.svelte";
  import Rich from "#lib/components/Rich.svelte";
  import WatchingBubble from "#lib/components/WatchingBubble.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { copy, fill } from "#lib/copy.ts";
  import { profile, stack } from "#lib/profile.ts";

  let { data }: PageProps = $props();

  let watchingOpen = $state(false);
  let watchingToggle = $state<HTMLButtonElement>();

  function closeOnEscape(event: KeyboardEvent) {
    if (event.key !== "Escape" || !watchingOpen) return;
    watchingOpen = false;
    watchingToggle?.focus();
  }
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

<svelte:window onkeydown={closeOnEscape} />

<!-- Kept tight: whitespace here would show up as a gap before the comma. -->
{#snippet watchingButton()}<button
    bind:this={watchingToggle}
    type="button"
    onclick={() => (watchingOpen = !watchingOpen)}
    aria-expanded={watchingOpen}
    aria-controls="now-watching"
    aria-label={copy.home.watchingToggle}
    title={copy.home.watchingToggle}
    class="
      -my-1 ml-0.5 inline-grid size-6 cursor-pointer place-items-center rounded-full
      align-middle text-black/50 transition-colors duration-200
      hover:bg-black/5 hover:text-black
    "
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="
        size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
        motion-reduce:transition-none {watchingOpen ? 'rotate-180' : ''}
      "
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  </button>{/snippet}

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
      slots={data.nowWatching.length > 0 ? { watching: watchingButton } : {}}
    />
  </p>

  {#if watchingOpen && data.nowWatching.length > 0}
    <WatchingBubble id="now-watching" titles={data.nowWatching} />
  {/if}

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
