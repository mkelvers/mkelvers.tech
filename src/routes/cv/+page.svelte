<script lang="ts">
  import Cv from "#lib/components/Cv.svelte";
  import Seo from "#lib/components/Seo.svelte";
  import { profile } from "#lib/utils.ts";
</script>

<Seo
  title={`CV · ${profile.username}`}
  description="CV for Mikkel Nothlev Elvers, a junior web developer based in Holbæk, Denmark, who builds whole products, from the database to the interface."
  type="profile"
/>

<Cv />
