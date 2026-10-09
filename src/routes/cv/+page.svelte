<script lang="ts">
  import Icon from "#lib/components/Icon.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile, skills } from "#lib/profile.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const contact = [
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

<article
  lang={data.lang}
  class="print:grid print:grid-cols-3 print:gap-x-6 print:text-sm"
>
  <header
    class="print:col-span-3 print:border-b print:border-black/20 print:pb-5"
  >
    <div class="flex items-start justify-between gap-6">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight print:text-2xl">
          {profile.fullName}
        </h1>
        <p class="mt-1 text-black/60">{t("cv.role")} · {t("home.location")}</p>
      </div>

      <div class="flex shrink-0 items-center gap-2 text-xs print:hidden">
        <button
          type="button"
          onclick={() => window.print()}
          class="
            rounded-full bg-black px-4 py-1.5 text-white
            transition-colors duration-500 hover:bg-black/90
          "
        >
          {t("cv.labels.save")}
        </button>
      </div>
    </div>

    <ul
      class="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-black/70 print:mt-3"
    >
      {#each contact as item (item.icon)}
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
  </header>

  <div
    class="
      mt-10 space-y-10 text-sm leading-relaxed
      print:col-span-2 print:mt-6 print:space-y-4 print:leading-snug
    "
  >
    <section>
      <h2 class="text-xs tracking-widest text-black/60 uppercase">
        {t("cv.labels.profile")}
      </h2>
      <p class="mt-3 text-black/80 print:mt-1.5">{t("cv.profile")}</p>
    </section>

    <section>
      <h2 class="text-xs tracking-widest text-black/60 uppercase">
        {t("cv.labels.projects")}
      </h2>

      <div class="mt-3 space-y-6 print:mt-2 print:space-y-2">
        {#each t("cv.projects") as project (project.name)}
          <div class="break-inside-avoid">
            <h3 class="font-semibold">{project.name}</h3>
            <p class="text-xs text-black/60">
              {project.meta}
            </p>

            <ul
              class="mt-2 list-disc space-y-1 pl-5 text-black/80 print:mt-1 print:space-y-0.5"
            >
              {#each project.bullets as bullet (bullet)}
                <li>{bullet}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>
  </div>

  <div
    class="
      mt-10 space-y-10 text-sm
      print:mt-6 print:space-y-4 print:border-l print:border-black/10 print:pl-6
    "
  >
    <section>
      <h2 class="text-xs tracking-widest text-black/60 uppercase">
        {t("cv.labels.education")}
      </h2>
      <p class="mt-3 font-semibold print:mt-1.5">{t("cv.education.name")}</p>
      <p class="text-black/80">{t("cv.education.school")}</p>
      <p class="text-xs text-black/60">
        {t("cv.education.period")}
      </p>
    </section>

    <section>
      <h2 class="text-xs tracking-widest text-black/60 uppercase">
        {t("cv.labels.skills")}
      </h2>

      <ul class="mt-3 space-y-1 text-black/80 print:mt-1.5 print:space-y-0.5">
        {#each skills as skill (skill)}
          <li>{skill}</li>
        {/each}
      </ul>
    </section>

    <section>
      <h2 class="text-xs tracking-widest text-black/60 uppercase">
        {t("cv.labels.languages")}
      </h2>

      <ul class="mt-3 space-y-1 text-black/80 print:mt-1.5 print:space-y-0.5">
        {#each t("cv.languages") as language (language)}
          <li>{language}</li>
        {/each}
      </ul>
    </section>
  </div>
</article>
