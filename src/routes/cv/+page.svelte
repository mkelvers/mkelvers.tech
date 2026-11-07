<script lang="ts">
  import Cv from "#lib/components/Cv.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { copy, fill } from "#lib/copy.ts";
  import { profile } from "#lib/profile.ts";
</script>

<Seo
  title={`${copy.cv.title} · ${profile.username}`}
  description={fill(copy.cv.description, {
    location: copy.home.location,
  })}
  type="profile"
/>

<Cv />
