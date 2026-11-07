# mkelvers.tech

Personal portfolio for Mikkel Elvers. SvelteKit, Svelte 5, Tailwind CSS 4, i18next (English and Danish) and a self-hosted Open Runde. No analytics, no cookies beyond an optional `?lang=` override, and no third-party requests.

## Develop

```sh
bun install
bun run dev
bun run check
```

## Projects

Projects live on GitHub, not on this site. The home page links to the GitHub profile, and old `/projects/...` links redirect there.

## Deploy

```sh
bun run build
bun run start
```

The build is a Node server (`@sveltejs/adapter-node`). Behind a reverse proxy, set `PROTOCOL_HEADER=x-forwarded-proto` and `HOST_HEADER=x-forwarded-host`, or canonical URLs and the sitemap come out wrong. The `Dockerfile` sets both.
