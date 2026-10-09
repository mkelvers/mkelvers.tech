<script lang="ts">
  import { page } from "$app/state";
  import { t } from "#lib/i18n.ts";
  import { profile } from "#lib/profile.ts";

  type Props = {
    title: string;
    description: string;
    type?: "website" | "article" | "profile";
    locale?: string;
  };

  let { title, description, type = "website", locale }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={page.url.origin + page.url.pathname} />

  <meta property="og:site_name" content={profile.name} />
  <meta property="og:type" content={type} />
  <meta
    property="og:locale"
    content={locale ?? (page.data.lang === "da" ? "da_DK" : "en_US")}
  />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={page.url.origin + page.url.pathname} />
  <meta property="og:image" content={page.url.origin + "/og.png"} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={t("seo.imageAlt")} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={page.url.origin + "/og.png"} />
</svelte:head>
