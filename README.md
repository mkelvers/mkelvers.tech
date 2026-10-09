# mkelvers.tech

Personal portfolio for Mikkel Elvers. SvelteKit, Svelte 5, Tailwind CSS 4, mdsvex, i18next (English and Danish) and a self-hosted Inter. No analytics, no cookies beyond the language choice, and no third-party requests.

## Develop

```sh
bun install
bun run dev
bun run check
```

## Add a project

Add a Markdown file to `src/content/projects/`. Frontmatter holds `name`, `description`, `tags`, `order`, `page`, `source` and `facts`. With `page: true` it gets its own page at `/projects/<slug>`; otherwise the card links to `source`.

## Deploy

```sh
bun run build
bun run start
```

The build is a Node server (`@sveltejs/adapter-node`). Behind a reverse proxy, set `PROTOCOL_HEADER=x-forwarded-proto` and `HOST_HEADER=x-forwarded-host`, or canonical URLs and the sitemap come out wrong. The `Dockerfile` sets both.
