<script lang="ts">
  import Icon from "#lib/components/Icon.svelte";
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
</script>

<Seo
  title={`${profile.fullName} – ${t("cv.title")}`}
  description={t("cv.description", {
    location: t("home.location"),
  })}
  type="profile"
/>

<!--
  Two layouts share this markup. On screen it follows the rest of the site:
  left-aligned, links in the header. Printed, it becomes the PDF: centered
  header with the phone number, links in a section at the end.
-->

{#snippet heading(label: string)}
  <h2
    class="
      text-xs font-normal tracking-widest text-black/60 uppercase
      print:mb-1
    "
  >
    {label}
  </h2>
{/snippet}

<article
  lang={data.lang}
  class="text-sm leading-relaxed print:text-[13.5px] print:leading-snug"
>
  <header class="print:border-b print:border-black/20 print:pb-3 print:text-center">
    <div class="flex items-start justify-between gap-6">
      <div class="print:w-full">
        <h1 class="text-3xl font-semibold tracking-tight print:text-3xl">
          {profile.fullName}
        </h1>
        <p class="mt-1 text-black/60">
          {t("cv.role")}<span class="print:hidden">
            · {t("home.location")}</span
          >
        </p>
      </div>

      <div class="flex shrink-0 items-center gap-2 text-xs print:hidden">
        <button
          type="button"
          onclick={() => window.print()}
          class="
            cursor-pointer rounded-full bg-black px-4 py-1.5 text-white
            transition-colors duration-500 hover:bg-black/90
          "
        >
          {t("cv.labels.save")}
        </button>
      </div>
    </div>

    <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-black/70 print:hidden">
      {#each links as item (item.icon)}
        <li>
          <a
            href={item.href}
            class="inline-flex items-center gap-2 hover:text-black"
          >
            <Icon name={item.icon} class="size-4" />
            {item.text}
          </a>
        </li>
      {/each}
    </ul>

    <ul
      class="
        mt-2 hidden flex-wrap justify-center gap-x-4 text-[13px] text-black/70
        print:flex
      "
    >
      <li>{t("home.location")}</li>
      <li>{profile.email}</li>
      <li>{profile.phone}</li>
    </ul>
  </header>

  <div class="mt-10 space-y-10 print:mt-4 print:space-y-3.5">
    <section>
      {@render heading(t("cv.labels.profile"))}
      <p class="mt-3 text-black/80 print:mt-0">{t("cv.profile")}</p>
    </section>

    <section>
      {@render heading(t("cv.labels.projects"))}

      <div class="mt-3 space-y-6 print:mt-0 print:space-y-2.5">
        {#each t("cv.projects") as project (project.name)}
          <div class="break-inside-avoid">
            <div
              class="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <h3 class="font-medium">{project.name}</h3>
              <p class="text-xs text-black/60">{project.meta}</p>
            </div>

            <ul
              class="
                mt-1.5 list-disc space-y-1 pl-5 text-black/80
                print:mt-1 print:space-y-0
              "
            >
              {#each project.bullets as bullet (bullet)}
                <li>{bullet}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>

    <section class="break-inside-avoid">
      {@render heading(t("cv.labels.education"))}
      <div
        class="
          mt-3 flex flex-wrap items-baseline justify-between gap-x-4
          print:mt-0
        "
      >
        <p>{t("cv.education.name")}, {t("cv.education.school")}</p>
        <p class="text-xs text-black/60">{t("cv.education.period")}</p>
      </div>
      <p class="mt-1 text-black/80 print:mt-0.5">{t("cv.education.grade")}</p>
      <ul class="mt-1 list-disc space-y-1 pl-5 text-black/80 print:space-y-0">
        {#each t("cv.education.bullets") as bullet (bullet)}
          <li>{bullet}</li>
        {/each}
      </ul>
    </section>

    <section class="break-inside-avoid">
      {@render heading(t("cv.labels.skills"))}
      <dl
        class="
          mt-3 grid grid-cols-[9rem_1fr] gap-y-1 print:mt-0
          print:grid-cols-[8.5rem_1fr] print:gap-y-0
        "
      >
        {#each skillGroups as group (group.key)}
          <dt class="text-black/60">{t(`cv.skillGroups.${group.key}`)}</dt>
          <dd class="text-black/80">{group.items.join(", ")}</dd>
        {/each}
      </dl>
    </section>

    <section class="break-inside-avoid">
      {@render heading(t("cv.labels.languages"))}
      <p class="mt-3 text-black/80 print:mt-0">
        {t("cv.languages").join(", ")}
      </p>
    </section>

    <section class="hidden break-inside-avoid print:block">
      {@render heading(t("cv.labels.links"))}
      <ul class="flex flex-wrap gap-x-5 text-black/80">
        {#each links.slice(1) as item (item.icon)}
          <li><a href={item.href}>{item.text}</a></li>
        {/each}
      </ul>
    </section>
  </div>
</article>
