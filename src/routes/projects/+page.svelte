<script lang="ts">
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile } from "#lib/profile.ts";
  import { projects } from "#lib/projects.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Seo
  title="{t('projects.title')} · {profile.name}"
  description={t("projects.description", {
    name: profile.name,
  })}
/>

<div class="flex flex-col gap-4 leading-relaxed text-black/70">
  <h1 class="mb-1 text-xl font-medium tracking-tight text-black">
    {t("projects.title")}
  </h1>

  <ul class="flex flex-col gap-4">
    {#each projects as project (project.slug)}
      <li>
        <a
          href="/projects/{project.slug}"
          class="
            text-black underline decoration-black/30 underline-offset-4
            transition-colors duration-300 hover:decoration-black
          "
        >
          {project.name}</a
        >. {project.description[data.lang]}
      </li>
    {/each}
  </ul>
</div>
