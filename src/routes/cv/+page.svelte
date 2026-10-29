<script lang="ts">
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile, skillGroups } from "#lib/profile.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const contact = [
    {
      text: t("home.location"),
      printOnly: false,
    },
    {
      text: profile.email,
      href: `mailto:${profile.email}`,
      printOnly: false,
    },
    {
      text: profile.phone,
      href: `tel:${profile.phone.replaceAll(" ", "")}`,
      printOnly: true,
    },
  ] as const;

  const links = [
    {
      text: "github.com/mkelvers",
      href: profile.github,
    },
    {
      text: "linkedin.com/in/mikkelnothlev",
      href: profile.linkedin,
    },
    {
      text: "mkelvers.tech",
      href: profile.website,
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

{#snippet heading(label: string)}
  <h2
    class="
      mb-1.5 text-xs font-normal tracking-widest text-black/60 uppercase
      print:mb-1
    "
  >
    {label}
  </h2>
{/snippet}

<article
  lang={data.lang}
  class="text-base leading-relaxed print:text-[13.5px] print:leading-snug"
>
  <div class="mb-6 flex justify-end text-xs print:hidden">
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

  <header class="border-b border-black/20 pb-5 text-center print:pb-3">
    <h1 class="text-4xl font-semibold tracking-tight print:text-3xl">
      {profile.fullName}
    </h1>
    <p class="mt-1 text-black/60">{t("cv.role")}</p>

    <ul
      class="
        mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm
        text-black/70 print:mt-2 print:text-[13px]
      "
    >
      {#each contact as item (item.text)}
        <li
          class="
            {item.printOnly ? 'hidden print:block' : ''}
            not-first:before:mr-4 not-first:before:text-black/30
            not-first:before:content-['·']
          "
        >
          {#if "href" in item}
            <a href={item.href} class="hover:text-black">{item.text}</a>
          {:else}
            {item.text}
          {/if}
        </li>
      {/each}
    </ul>
  </header>

  <div class="mt-6 space-y-6 print:mt-4 print:space-y-3.5">
    <section>
      {@render heading(t("cv.labels.profile"))}
      <p class="text-black/80">{t("cv.profile")}</p>
    </section>

    <section>
      {@render heading(t("cv.labels.projects"))}

      <div class="space-y-5 print:space-y-2.5">
        {#each t("cv.projects") as project (project.name)}
          <div class="break-inside-avoid">
            <div
              class="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <h3 class="font-medium">{project.name}</h3>
              <p class="text-sm text-black/60 print:text-xs">{project.meta}</p>
            </div>

            <ul
              class="
                mt-1 list-disc space-y-1 pl-5 text-black/80
                print:space-y-0
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
      <div class="flex flex-wrap items-baseline justify-between gap-x-4">
        <p>{t("cv.education.name")}, {t("cv.education.school")}</p>
        <p class="text-sm text-black/60 print:text-xs">
          {t("cv.education.period")}
        </p>
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
          grid grid-cols-[9rem_1fr] gap-y-1 print:grid-cols-[8.5rem_1fr]
          print:gap-y-0
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
      <p class="text-black/80">{t("cv.languages").join(", ")}</p>
    </section>

    <section class="break-inside-avoid">
      {@render heading(t("cv.labels.links"))}
      <ul class="flex flex-wrap gap-x-5 gap-y-1 text-black/80">
        {#each links as link (link.href)}
          <li><a href={link.href} class="hover:text-black">{link.text}</a></li>
        {/each}
      </ul>
    </section>
  </div>
</article>
