<script lang="ts">
  import Cv from "#lib/components/Cv.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { t } from "#lib/i18n.ts";
  import { profile } from "#lib/profile.ts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Seo
  title={`${t("cv.title")} · ${profile.username}`}
  description={t("cv.description", {
    location: t("home.location"),
  })}
  type="profile"
/>

<Cv lang={data.lang} />
