<script lang="ts">
  // The CV in two layouts over the same content. The screen article is a web page:
  // labels on the left, short paragraphs on the right. The print article is the
  // classic one-page document that "Save as PDF" produces.
  import type { Snippet } from "svelte";
  import { t, type Lang } from "#lib/i18n.ts";
  import { profile, skillGroups } from "#lib/profile.ts";

  let { lang }: { lang: Lang } = $props();

  const links = $derived([
    {
      label: t("cv.labels.email"),
      text: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      label: "GitHub",
      text: "github.com/mkelvers",
      href: profile.github,
    },
    {
      label: "LinkedIn",
      text: "linkedin.com/in/mikkelnothlev",
      href: profile.linkedin,
    },
  ] as const);

  const link = `
    text-black underline decoration-black/30 underline-offset-4
    transition-colors duration-300 hover:decoration-black
  `;

  // The print version lists these as bullets; on screen they read as one paragraph.
  const asParagraph = (bullets: readonly string[]) => bullets.join(" ");
</script>

<!-- Labels hang in the left margin on wide screens so the content keeps one left edge. -->
{#snippet row(label: string, content: Snippet)}
  <section class="relative">
    <h2
      class="
        mb-3 text-sm leading-relaxed text-black/50
        lg:absolute lg:top-px lg:right-full lg:mr-10 lg:mb-0 lg:w-36 lg:text-right
      "
    >
      {label}
    </h2>
    {@render content()}
  </section>
{/snippet}

<article {lang} class="leading-relaxed text-black/70 print:hidden">
  <header>
    <h1 class="text-xl font-medium tracking-tight text-black">{profile.fullName}</h1>
    <p class="mt-1 text-black/50">{t("cv.role")} · {t("home.location")}</p>
    <p class="mt-5">{t("cv.profile")}</p>

    <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {#each links as item (item.href)}
        <li><a href={item.href} class={link}>{item.label}</a></li>
      {/each}
      <li>
        <button type="button" onclick={() => window.print()} class="cursor-pointer {link}">
          {t("cv.labels.save")}
        </button>
      </li>
    </ul>
  </header>

  <div class="mt-16 space-y-14">
    {#snippet projects()}
      <div class="space-y-8">
        {#each t("cv.projects") as project (project.name)}
          <div>
            <h3 class="font-medium text-black">{project.name}</h3>
            <p class="text-sm text-black/50">{project.meta}</p>
            <p class="mt-2">{asParagraph(project.bullets)}</p>
          </div>
        {/each}
      </div>
    {/snippet}
    {@render row(t("cv.labels.projects"), projects)}

    {#snippet education()}
      <h3 class="font-medium text-black">
        {t("cv.education.name")}, {t("cv.education.school")}
      </h3>
      <p class="text-sm text-black/50">{t("cv.education.period")}</p>
      <p class="mt-2">
        {t("cv.education.grade")}
        {asParagraph(t("cv.education.bullets"))}
      </p>
    {/snippet}
    {@render row(t("cv.labels.education"), education)}

    {#snippet skills()}
      <dl class="space-y-3">
        {#each skillGroups as group (group.key)}
          <div>
            <dt class="text-black">{t(`cv.skillGroups.${group.key}`)}</dt>
            <dd>{group.items.join(", ")}</dd>
          </div>
        {/each}
      </dl>
    {/snippet}
    {@render row(t("cv.labels.skills"), skills)}

    {#snippet languages()}
      <p>{t("cv.languages").join(", ")}</p>
    {/snippet}
    {@render row(t("cv.labels.languages"), languages)}
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
  lang={lang}
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
