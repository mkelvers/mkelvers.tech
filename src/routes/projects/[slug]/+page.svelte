<script lang="ts">
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile } from "#lib/profile.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Seo
  title="{data.project.name} · {profile.name}"
  description={data.project.description[data.lang]}
  type="article"
/>

<h1 class="text-3xl font-semibold tracking-tight">{data.project.name}</h1>

<p class="mt-4 text-xl leading-snug tracking-tight text-black/60">
  {data.project.description[data.lang]}
</p>

<dl class="mt-10 divide-y divide-black/10 border-y border-black/10 text-sm">
  {#each Object.entries(data.project.facts[data.lang]) as [term, detail] (term)}
    <div class="flex justify-between gap-6 py-3">
      <dt class="shrink-0 text-black/60">{term}</dt>
      <dd class="text-right">{detail}</dd>
    </div>
  {/each}

  {#if data.project.source}
    <div class="flex justify-between gap-6 py-3">
      <dt class="text-black/60">
        {t("projects.source")}
      </dt>
      <dd>
        <a
          href={data.project.source}
          rel="noreferrer"
          class="underline underline-offset-2 transition-colors duration-300 hover:text-black"
        >
          {data.project.source.replace("https://", "")}
          <span aria-hidden="true">↗</span>
        </a>
      </dd>
    </div>
  {/if}
</dl>

<div
  class="
    mt-14 space-y-4 leading-relaxed text-black/80
    [&_h2]:pt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-black
    [&_h3]:pt-4 [&_h3]:font-semibold [&_h3]:text-black
    [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
    [&_a]:underline [&_a]:underline-offset-2
    [&_strong]:text-black
  "
>
  <data.project.Content />
</div>
