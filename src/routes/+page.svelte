<script lang="ts">
  import type { PageProps } from "./$types";
  import Mascot from "#lib/components/Mascot.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import Watching from "#lib/components/watching/Watching.svelte";
  import { profile } from "#lib/utils.ts";

  let { data }: PageProps = $props();
</script>

<Seo
  title={profile.username}
  description="Mikkel Elvers is a junior frontend and full-stack developer based in Holbæk, Denmark. Builds whole products, from the database to the interface."
  type="profile"
/>

<div
  data-mascot-avoid
  class="mx-auto my-auto flex w-full max-w-xl flex-col gap-4 leading-relaxed text-black/70"
>
  <Mascot />

  <h1 class="-mt-2 mb-1 text-xl font-medium tracking-tight text-black">
    Hey, I'm {profile.firstName}
  </h1>

  <p>I'm a web developer from Holbæk, Denmark, looking for my first job.</p>

  <p>
    Lately I've been working on
    <Watching titles={data.nowWatching} />, a self-hosted anime app I built for myself and use
    almost every day. My other
    <a
      href={profile.github}
      class="
        text-black underline decoration-black/30 underline-offset-4
        transition-colors duration-300 hover:decoration-black
      "
    >
      projects are on GitHub
    </a>, and you can read my
    <a
      href="/cv"
      class="
        text-black underline decoration-black/30 underline-offset-4
        transition-colors duration-300 hover:decoration-black
      "
    >
      CV
    </a>
    here.
  </p>

  <p>
    The best way to reach me is
    <a
      href={`mailto:${profile.email}`}
      class="
        text-black underline decoration-black/30 underline-offset-4
        transition-colors duration-300 hover:decoration-black
      "
    >
      email
    </a>
    or
    <a
      href={profile.linkedin}
      class="
        text-black underline decoration-black/30 underline-offset-4
        transition-colors duration-300 hover:decoration-black
      "
    >
      LinkedIn
    </a>.
  </p>
</div>
