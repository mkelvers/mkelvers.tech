<script lang="ts">
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile, skillGroups } from "#lib/profile.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const links = [
    {
      icon: "email",
      text: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: "github",
      text: "github.com/mkelvers",
      href: profile.github,
    },
    {
      icon: "linkedin",
      text: "linkedin.com/in/mikkelnothlev",
      href: profile.linkedin,
    },
  ] as const;

  const link = `
    text-black underline decoration-black/30 underline-offset-4
    transition-colors duration-300 hover:decoration-black
  `;
</script>

<Seo
  title={`${profile.fullName} – ${t("cv.title")}`}
  description={t("cv.description", {
    location: t("home.location"),
  })}
  type="profile"
/>

<!--
  The page and the printed CV are two layouts on the same content. The page
  follows the rest of the site. The print article below becomes the PDF.
-->

{#snippet heading(label: string)}
  <h2 class="font-medium text-black">
    {label}
  </h2>
{/snippet}

<article lang={data.lang} class="leading-relaxed text-black/70 print:hidden">
  <header>
    <h1 class="text-xl font-medium tracking-tight text-black">
      {profile.fullName}
    </h1>
    <p class="mt-1">{t("cv.role")} · {t("home.location")}</p>

    <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {#each links as item (item.icon)}
        <li>
          <a href={item.href} class={link}>{item.text}</a>
        </li>
      {/each}
      <li>
        <button type="button" onclick={() => window.print()} class="cursor-pointer {link}">
          {t("cv.labels.save")}
        </button>
      </li>
    </ul>
  </header>

  <div class="mt-10 space-y-10">
    <section>
      {@render heading(t("cv.labels.profile"))}
      <p class="mt-2">{t("cv.profile")}</p>
    </section>

    <section>
      {@render heading(t("cv.labels.projects"))}

      <div class="mt-2 space-y-5">
        {#each t("cv.projects") as project (project.name)}
          <div>
            <div
              class="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <h3 class="text-black">{project.name}</h3>
              <p class="text-sm text-black/50">{project.meta}</p>
            </div>

            <ul class="mt-1.5 list-disc space-y-1 pl-5">
              {#each project.bullets as bullet (bullet)}
                <li>{bullet}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>

    <section>
      {@render heading(t("cv.labels.education"))}
      <div
        class="mt-2 flex flex-wrap items-baseline justify-between gap-x-4"
      >
        <p class="text-black">{t("cv.education.name")}, {t("cv.education.school")}</p>
        <p class="text-sm text-black/50">{t("cv.education.period")}</p>
      </div>
      <p class="mt-1">{t("cv.education.grade")}</p>
      <ul class="mt-1 list-disc space-y-1 pl-5">
        {#each t("cv.education.bullets") as bullet (bullet)}
          <li>{bullet}</li>
        {/each}
      </ul>
    </section>

    <section>
      {@render heading(t("cv.labels.skills"))}
      <dl class="mt-2 grid grid-cols-[9rem_1fr] gap-y-1">
        {#each skillGroups as group (group.key)}
          <dt class="text-black/50">{t(`cv.skillGroups.${group.key}`)}</dt>
          <dd>{group.items.join(", ")}</dd>
        {/each}
      </dl>
    </section>

    <section>
      {@render heading(t("cv.labels.languages"))}
      <p class="mt-2">{t("cv.languages").join(", ")}</p>
    </section>
  </div>
</article>

{#snippet printHeading(label: string)}
  <h2
    class="
      mt-[18px] mb-2 border-b border-[#111827] pb-0.5 font-cv-display
      text-[15px] font-bold uppercase
    "
  >
    {label}
  </h2>
{/snippet}

{#snippet printBullets(items: readonly string[])}
  <ul class="list-disc pl-4 marker:text-[10px]">
    {#each items as item (item)}
      <li>{item}</li>
    {/each}
  </ul>
{/snippet}

<article
  lang={data.lang}
  class="
    hidden font-cv text-[12.5px] leading-[1.45] text-[#111827] print:block
  "
>
  <header class="text-center">
    <h1 class="font-cv-display text-2xl font-bold">{profile.fullName}</h1>
    <p class="text-[#4b5563] italic">{t("cv.role")}</p>
    <p class="mt-1.5 text-[#374151]">{t("home.location")}</p>
    <p class="text-[#374151]">{profile.email} | {profile.phone}</p>
    <p class="text-[#374151]">
      <a href={links[1].href}>{links[1].text}</a> |
      <a href={links[2].href}>{links[2].text}</a>
    </p>
  </header>

  <section>
    {@render printHeading(t("cv.labels.profile"))}
    <p>{t("cv.profile")}</p>
  </section>

  <section>
    {@render printHeading(t("cv.labels.education"))}
    <p class="font-bold uppercase">{t("cv.education.school")}</p>
    <div class="flex justify-between italic">
      <p>{t("cv.education.name")}</p>
      <p>{t("cv.education.period")}</p>
    </div>
    <p>{t("cv.education.grade")}</p>
    {@render printBullets(t("cv.education.bullets"))}
  </section>

  <section>
    {@render printHeading(t("cv.labels.skills"))}
    {#each skillGroups as group (group.key)}
      <p>
        <span class="font-bold">{t(`cv.skillGroups.${group.key}`)}:</span>
        {group.items.join(", ")}
      </p>
    {/each}
  </section>

  <section>
    {@render printHeading(t("cv.labels.additional"))}
    <p>
      <span class="font-bold">{t("cv.labels.languages")}:</span>
      {t("cv.languages").join(", ")}
    </p>
  </section>

  <section>
    {@render printHeading(t("cv.labels.projects"))}
    <div class="space-y-2">
      {#each t("cv.projects") as project (project.name)}
        <div class="break-inside-avoid">
          <p class="font-bold uppercase">{project.name}</p>
          <p>{project.meta}</p>
          {@render printBullets(project.bullets)}
        </div>
      {/each}
    </div>
  </section>
</article>
