<script lang="ts">
  import Icon from "#lib/components/Icon.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile, skillGroups } from "#lib/profile.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const contact = [
    {
      icon: "email",
      text: profile.email,
      href: `mailto:${profile.email}`,
      printOnly: false,
    },
    {
      icon: "phone",
      text: profile.phone,
      href: `tel:${profile.phone.replaceAll(" ", "")}`,
      printOnly: true,
    },
    {
      icon: "github",
      text: "github.com/mkelvers",
      href: profile.github,
      printOnly: false,
    },
    {
      icon: "linkedin",
      text: "linkedin.com/in/mikkelnothlev",
      href: profile.linkedin,
      printOnly: false,
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
      flex items-center gap-3 text-xs font-semibold tracking-widest
      text-leaf-text uppercase
      after:h-px after:flex-1 after:bg-black/15
    "
  >
    {label}
  </h2>
{/snippet}

<article
  lang={data.lang}
  class="text-sm leading-relaxed print:text-xs print:leading-normal"
>
  <header class="border-b-2 border-leaf pb-5 print:pb-3">
    <div class="flex items-start justify-between gap-6">
      <div>
        <h1 class="text-4xl font-semibold tracking-tight print:text-3xl">
          {profile.fullName}
        </h1>
        <p class="mt-1.5 text-base font-medium text-leaf-text print:text-sm">
          {t("cv.role")} · {t("home.location")}
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

    <ul
      class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-black/70 print:mt-2.5"
    >
      {#each contact as item (item.icon)}
        <li class={item.printOnly ? "hidden print:block" : undefined}>
          <a
            href={item.href}
            class="inline-flex items-center gap-2 hover:text-black"
          >
            <Icon name={item.icon} class="size-4 text-leaf-text" />
            {item.text}
          </a>
        </li>
      {/each}
    </ul>
  </header>

  <div class="mt-8 space-y-8 print:mt-5 print:space-y-5">
    <section>
      {@render heading(t("cv.labels.profile"))}
      <p class="mt-3 text-black/80 print:mt-1.5">{t("cv.profile")}</p>
    </section>

    <section>
      {@render heading(t("cv.labels.projects"))}

      <div class="mt-4 space-y-6 print:mt-2.5 print:space-y-3.5">
        {#each t("cv.projects") as project (project.name)}
          <div class="break-inside-avoid">
            <div
              class="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <h3 class="text-base font-semibold print:text-sm">
                {project.name}
              </h3>
              <p class="text-xs text-black/60">{project.meta}</p>
            </div>

            <ul
              class="
                mt-1.5 list-disc space-y-1 pl-5 text-black/80
                marker:text-leaf print:mt-0.5 print:space-y-0
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
          print:mt-1.5
        "
      >
        <p class="text-black/80">
          <span class="font-semibold text-black">{t("cv.education.name")}</span>, {t("cv.education.school")}
        </p>
        <p class="text-xs text-black/60">{t("cv.education.period")}</p>
      </div>
    </section>

    <section class="break-inside-avoid">
      {@render heading(t("cv.labels.skills"))}
      <dl
        class="
          mt-3 grid grid-cols-[8.5rem_1fr] gap-y-1.5 print:mt-1.5
          print:grid-cols-[8rem_1fr] print:gap-y-0.5
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
      <p class="mt-3 text-black/80 print:mt-1.5">
        {t("cv.languages").join(", ")}
      </p>
    </section>
  </div>
</article>
