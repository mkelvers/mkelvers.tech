<script lang="ts">
  import cv from "#lib/cv.json";
  import { profile } from "#lib/utils.ts";

  const github = {
    label: "GitHub",
    text: "github.com/mkelvers",
    href: profile.github,
  };

  const linkedin = {
    label: "LinkedIn",
    text: "linkedin.com/in/mikkelnothlev",
    href: profile.linkedin,
  };

  const links = [
    {
      label: "Email",
      href: `mailto:${profile.email}`,
    },
    github,
    linkedin,
  ];
</script>

{#snippet label(text: string)}
  <h2
    class="
      mb-3 text-sm leading-relaxed text-black/60
      lg:absolute lg:top-px lg:right-full lg:mr-10 lg:mb-0 lg:w-36 lg:text-right
    "
  >
    {text}
  </h2>
{/snippet}

{#snippet printHeading(text: string)}
  <h2
    class="
      mt-[18px] mb-2 border-b border-[#111827] pb-0.5 font-cv-display
      text-[15px] font-bold uppercase
    "
  >
    {text}
  </h2>
{/snippet}

{#snippet printBullets(items: readonly string[])}
  <ul class="list-disc pl-4 marker:text-[10px]">
    {#each items as item (item)}
      <li>{item}</li>
    {/each}
  </ul>
{/snippet}

<article class="mt-16 leading-relaxed text-black/70 print:hidden">
  <header>
    <h1 class="text-xl font-medium tracking-tight text-black">{profile.fullName}</h1>
    <p class="mt-1 text-black/60">{cv.role} · {cv.location}</p>
    <p class="mt-5">{cv.profile}</p>

    <ul class="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {#each links as item (item.href)}
        <li>
          <a
            href={item.href}
            class="
              text-black underline decoration-black/30 underline-offset-4
              transition-colors duration-300 hover:decoration-black
            "
          >
            {item.label}
          </a>
        </li>
      {/each}
      <li>
        <button
          type="button"
          onclick={() => window.print()}
          class="
            cursor-pointer text-black underline decoration-black/30 underline-offset-4
            transition-colors duration-300 hover:decoration-black
          "
        >
          Save as PDF
        </button>
      </li>
    </ul>
  </header>

  <section class="relative mt-16">
    {@render label(cv.labels.projects)}
    <ul class="space-y-8">
      {#each cv.projects as project (project.name)}
        <li>
          <h3 class="font-medium text-black">{project.name}</h3>
          <p class="text-sm text-black/60">{project.meta}</p>
          <p class="mt-2">{project.bullets.join(" ")}</p>
        </li>
      {/each}
    </ul>
  </section>

  <section class="relative mt-14">
    {@render label(cv.labels.education)}
    <h3 class="font-medium text-black">
      {cv.education.name}, {cv.education.school}
    </h3>
    <p class="text-sm text-black/60">{cv.education.period}</p>
    <p class="mt-2">
      {cv.education.grade}
      {cv.education.bullets.join(" ")}
    </p>
  </section>

  <section class="relative mt-14">
    {@render label(cv.labels.skills)}
    <dl class="space-y-3">
      {#each cv.skills as group (group.label)}
        <div>
          <dt class="text-black">{group.label}</dt>
          <dd>{group.items.join(", ")}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <section class="relative mt-14">
    {@render label(cv.labels.languages)}
    <p>{cv.languages.join(", ")}</p>
  </section>
</article>

<article class="hidden font-cv text-[12.5px] leading-[1.45] text-[#111827] print:block">
  <header class="text-center">
    <h1 class="font-cv-display text-2xl font-bold">{profile.fullName}</h1>
    <p class="text-[#4b5563] italic">{cv.role}</p>
    <p class="mt-1.5 text-[#374151]">{cv.location}</p>
    <p class="text-[#374151]">{profile.email} | {profile.phone}</p>
    <p class="text-[#374151]">
      <a href={github.href}>{github.text}</a> |
      <a href={linkedin.href}>{linkedin.text}</a>
    </p>
  </header>

  <section>
    {@render printHeading(cv.labels.profile)}
    <p>{cv.profile}</p>
  </section>

  <section>
    {@render printHeading(cv.labels.education)}
    <p class="font-bold uppercase">{cv.education.school}</p>
    <p class="flex justify-between italic">
      <span>{cv.education.name}</span>
      <span>{cv.education.period}</span>
    </p>
    <p>{cv.education.grade}</p>
    {@render printBullets(cv.education.bullets)}
  </section>

  <section>
    {@render printHeading(cv.labels.skills)}
    {#each cv.skills as group (group.label)}
      <p>
        <span class="font-bold">{group.label}:</span>
        {group.items.join(", ")}
      </p>
    {/each}
  </section>

  <section>
    {@render printHeading(cv.labels.additional)}
    <p>
      <span class="font-bold">{cv.labels.languages}:</span>
      {cv.languages.join(", ")}
    </p>
  </section>

  <section>
    {@render printHeading(cv.labels.projects)}
    <ul class="space-y-2">
      {#each cv.projects as project (project.name)}
        <li class="break-inside-avoid">
          <p class="font-bold uppercase">{project.name}</p>
          <p>{project.meta}</p>
          {@render printBullets(project.bullets)}
        </li>
      {/each}
    </ul>
  </section>
</article>
