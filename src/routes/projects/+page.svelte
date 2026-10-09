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

<h1 class="text-3xl font-semibold tracking-tight">{t("projects.title")}</h1>

<ul class="mt-10 -mx-4">
  {#each projects as project (project.slug)}
    <li
      class="
        relative rounded-2xl px-4 py-4 transition-colors duration-300
        hover:bg-black/5 has-focus-visible:bg-black/5
      "
    >
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="font-semibold">
          <a
            href="/projects/{project.slug}"
            class="outline-none after:absolute after:inset-0"
          >
            {project.name}
          </a>
        </h2>

        <span class="text-xs text-black/60" aria-hidden="true">
          {t("projects.readMore")}
        </span>
      </div>

      <p class="mt-1 text-sm text-black/60">
        {project.description[data.lang]}
      </p>

      <p class="mt-2 text-xs text-black/60">{project.tags.join(" · ")}</p>
    </li>
  {/each}
</ul>
