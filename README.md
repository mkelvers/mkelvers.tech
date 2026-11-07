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

Optionally set `SORA_API_URL` to the Sora API origin on the Docker network, such as `http://sora-api:3000`, and `SORA_PORTFOLIO_TOKEN` to the API's `PORTFOLIO_TOKEN`. Both are private runtime variables read only by the portfolio server. If either is missing, the home page skips Sora entirely. Successful title lists are cached per process for five minutes; failures hide the paragraph and are cached for 60 seconds. Requests time out after 1500 ms. Restart the portfolio after rotating the token to clear its cache.
