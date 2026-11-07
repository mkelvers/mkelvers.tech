<script lang="ts">
  // Projects as a horizontal reel inside the vertical page. The section is one screen
  // tall per project; its content stays pinned while vertical scroll slides the row
  // sideways. Each screen is a snap point, so one scroll moves exactly one project.
  // Native scrolling stays in charge, so trackpads, keys and screen readers keep working.
  import { t, type Lang } from "#lib/i18n.ts";
  import { projects } from "#lib/projects.ts";

  let { lang }: { lang: Lang } = $props();

  const last = projects.length - 1;
  let section: HTMLElement;
  let progress = $state(0);
  const index = $derived(Math.round(progress * last));

  $effect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - innerHeight;
      progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(measure);
    };

    measure();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);

    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  });

  function show(target: number) {
    scrollTo({ top: section.offsetTop + target * innerHeight });
  }

  const link = `
    text-black underline decoration-black/30 underline-offset-4
    transition-colors duration-300 hover:decoration-black
  `;
</script>

<section
  id="projects"
  bind:this={section}
  aria-labelledby="projects-title"
  class="relative print:hidden"
  style:height="{projects.length * 100}svh"
>
  {#each projects as project, i (project.slug)}
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 h-svh snap-start"
      style:top="{i * 100}svh"
    ></div>
  {/each}

  <div class="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
    <div class="mx-auto w-full max-w-xl px-6">
      <h2 id="projects-title" class="text-xl font-medium tracking-tight">
        {t("projects.title")}
      </h2>
    </div>

    <ul class="mt-6 flex" style:translate="{-progress * last * 100}% 0">
      {#each projects as project, i (project.slug)}
        <li class="w-full shrink-0 px-6" inert={i !== index}>
          <article class="mx-auto max-w-xl leading-relaxed text-black/70">
            <h3 class="font-medium text-black">{project.name}</h3>
            <p class="mt-2">{project.description[lang]}</p>
            <p class="mt-3 text-sm text-black/50">{project.tags.join(" · ")}</p>
            <p class="mt-5 flex gap-5 text-sm">
              <a href="/projects/{project.slug}" class={link}>{t("projects.readMore")}</a>
              {#if project.source}
                <a href={project.source} rel="noreferrer" class={link}>
                  {t("projects.source")}
                </a>
              {/if}
            </p>
          </article>
        </li>
      {/each}
    </ul>

    <nav
      aria-label={t("projects.title")}
      class="mx-auto mt-10 flex w-full max-w-xl gap-1 px-5"
    >
      {#each projects as project, i (project.slug)}
        <button
          type="button"
          onclick={() => show(i)}
          aria-label={project.name}
          aria-current={i === index ? "true" : undefined}
          class="grid size-6 cursor-pointer place-items-center"
        >
          <span
            class="
              size-1.5 rounded-full transition-colors duration-300
              {i === index ? 'bg-black' : 'bg-black/20'}
            "
          ></span>
        </button>
      {/each}
    </nav>
  </div>
</section>
