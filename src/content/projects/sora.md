---
name: Sora
order: 1
source: https://github.com/mkelvers/sora
tags: [TypeScript, Hono, SvelteKit, PostgreSQL, Docker]
description:
  en: "A self-hosted anime library with its own typed API, job scheduler and SDK. It runs in production on my own server."
  da: "Et selvhostet anime-bibliotek med sit eget typede API, sin egen jobscheduler og SDK. Det kører i produktion på min egen server."
facts:
  en:
    Role: "Solo: design, backend, frontend, deployment"
    Stack: "Bun, TypeScript, Hono, SvelteKit, PostgreSQL, Drizzle, Docker"
    Size: "39 API routes, about 32,000 lines, over 400 tests"
    Data: "A catalogue of 12,000+ series and 170,000+ episodes"
  da:
    Rolle: "Alene: design, backend, frontend og drift"
    Stack: "Bun, TypeScript, Hono, SvelteKit, PostgreSQL, Drizzle, Docker"
    Størrelse: "39 API-ruter, cirka 32.000 linjer, over 400 tests"
    Data: "Et katalog med over 12.000 serier og 170.000 afsnit"
---

<script>
  import { page } from "$app/state";
  import Diagram from "#lib/components/Diagram.svelte";
</script>

{#if page.data.lang === "da"}

## Hvad det er

Sora er et katalog, en afspiller, en watchlist og en udgivelseskalender for anime, som kører fra din egen server. En konto kan have flere profiler, og hver profil har sin egen watchlist, sin egen fremgang og sine egne notifikationer.

Webappen er én klient til et versioneret HTTP-API. En scheduler holder kataloget opdateret, og en typet SDK giver anden kode samme adgang, som webappen har. Sora laver ingen anime-data og hoster ingen video: metadata kommer fra offentlige databaser, og afspilning bliver fundet hos tredjepartskilder, når den bruges.

## Sådan hænger det sammen

Et Bun-monorepo, delt op efter det, der ændrer sig sammen:

- **api**: en Hono-app, der serverer `/v1` og sit OpenAPI-dokument.
- **scheduler**: baggrundsjobs, der følger serier, der er i gang, og fylder kataloget.
- **web**: SvelteKit-appen, som taler med API'et gennem SDK'et.
- **core**: databaseskemaet, kataloget og koden til afspilning og jobs, som de andre dele deler.
- **sdk**: den typede klient.

<Diagram
  name="sora-architecture"
  description="Et rutediagram. Webappen og andre klienter når API'et gennem SDK'et. API'et og scheduleren bruger begge core, og core læser fra PostgreSQL, fra offentlige databaser og fra afspilningskilder."
  caption="Sådan hænger Soras dele sammen."
/>

## Beslutninger

### Én kontrakt og en klient, der bliver tjekket mod den

Hver rute er defineret ét sted, med Zod-skemaer for parametre, query, body og svar. OpenAPI-dokumentet kommer fra de definitioner, og det samme gør SDK'ets typer: et kald med den forkerte stiparameter eller den forkerte body fejler ved kompilering i stedet for som en 400 i produktion.

Fordi webappen også går gennem SDK'et, har den ingen privat vej til dataene. Hvis noget virker i appen, virker det for enhver anden klient. Prisen er mere typemaskineri i SDK'et, som udleder sine input og output fra rutens form. Jeg tog den handel, fordi det betyder, at klienten og API'et ikke stille og roligt kan glide fra hinanden.

### Læsninger venter aldrig på andres API

Søgning og browsing læser kun fra Soras egen PostgreSQL-database. Det er scheduleren, der taler med omverdenen, og den gør det under begrænsninger: én fælles HTTP-klient håndhæver rate limits pr. vært, og grænsen for en kilde, der tillader 60 forespørgsler i minuttet, er sat til 55.

Scheduleren er bygget på graphile-worker, så dens kø og cron ligger i samme PostgreSQL-instans, og der ikke er en separat kø at drive. Hver serie, der er i gang, har højst ét ventende tjek, identificeret ved en jobnøgle, der erstatter det gamle, når der planlægges igen. Tjek af nye afsnit kører med højere prioritet end køen af serieopsætninger, for ellers ville et nyligt udsendt afsnit stå bag hundredvis af dem. En serie bliver først vist, når en kilde faktisk har dens afsnit.

### Gå ud fra, at afspilningskilderne går i stykker

Afspilningskilderne er tredjepart og ændrer sig uden varsel. De ligger bag ét interface og prøves i rækkefølge, så den næste tager over, når en fejler. Hvert kald bliver registreret i en `provider_calls`-tabel med operation, udfald og varighed.

En kildes tilstand regnes ud fra de registreringer, og der er tre tilstande i stedet for to. Den er *failing* kun, når mindst fem kald inden for tre timer alle fejlede eller kom tomme tilbage. Med færre kald er den *idle*, ikke failing, fordi en kilde ikke har alle titler, og en stille time ikke skal ligne et udfald.

### En proxy, der ikke kan blive en åben proxy

Streams går gennem Soras egen proxy, så browseren aldrig ser en upstream-URL, og de nødvendige headers bliver tilføjet på serveren. En proxy, der henter en hvilken som helst URL, den får, kan bruges til at nå interne tjenester, så denne tager aldrig imod en URL. Den tager imod tokens.

Et token indeholder mål-URL'en, dens type, de headers den skal bruge, reserve-mirrors, den konto det er udstedt til og en udløbstid. Det er krypteret og autentificeret med AES-256-GCM under en nøgle afledt af en serverhemmelighed. Et ændret token bliver afvist, det samme gør et udløbet, og det samme gør et, der bruges af en anden konto.

HLS-playlister bliver omskrevet, så hver segment-, nøgle- og underplaylist-URI bliver til et nyt token, hvor relative URI'er først bliver løst, og tags bevares. Nogle værter sætter et PNG- eller JPEG-hoved foran videosegmenter for at forklæde dem. Proxyen opdager og fjerner det og behandler et segment, der i virkeligheden kun er et billede, som en fejl i stedet for at afspille det.

Den læser også forud. Værter leverer segmenter, de ikke har leveret før, med omtrent streamens egen bitrate, og en afspiller beder om ét ad gangen, så den kan aldrig komme foran. At hente de næste 32 segmenter samtidig, i en cache begrænset til 256 MB, lader afspilningen løbe fra værten.

### Tidsjustering af undertekster fra en anden encode

Et undertekstspor er timet til én video, og en dub af samme afsnit kan have en anden længde på åbningen, så replikkerne driver. At rette det uden et bibliotek betød at bruge dataenes struktur. HLS-segmenter bliver skåret ved keyframes, og encodere sætter keyframes ved scenskift, så to encodes af samme billede deler de fleste segmentgrænser, forskudt med det optagelsesmateriale, den ene lægger til eller skærer fra.

Justeringen lader grænserne stemme om forskydninger. To grænser inden for 0,12 sekunder tæller som det samme klip, en forskydning skal have mindst fire enige grænser for at komme i betragtning, og for at skifte til en ny forskydning kræves seks flere match end ved at blive, så tilfældige match ikke giver flimmer. Forskydningen findes stykvis gennem afsnittet, hvilket håndterer en kortere åbning efterfulgt af en identisk rest. Hvis færre end halvdelen af grænserne matcher, konkluderer den, at encodes ikke er det samme afsnit, og nægter at tidsjustere noget.

## Hvad der gik galt

- **Døde workers holdt på deres jobs.** Når en proces dør uden at lukke rent ned, holder graphile-worker dens jobs låst i fire timer. Under udvikling skete det ved hver genstart, og arbejde, en seer ventede på, blev hængende. Hver scheduler skriver nu et hjerteslag hvert 30. sekund, og enhver pulje, der har været tavs i to minutter, får sine låste jobs frigivet af den scheduler, der først opdager det.
- **En fallback skjulte en langsom afhængighed.** En opslagstjeneste brugte omkring 15 sekunder på at fejle ved hver forespørgsel, før den næste kilde tog over. Afspilning virkede stadig, bare langsomt. Jeg slog den tjeneste fra.

## Drift

Én Dockerfile bygger tre images: web, API og scheduler. API'et kører databasemigreringer ved start, så det udrulles før scheduleren. PostgreSQL kører på et vedvarende volume og er kun tilgængelig internt på Docker-netværket. Det hele ligger bag en Cloudflare Tunnel, og webtjenesten er sat op til at læse den besøgendes rigtige adresse, så grænser for login gælder pr. person.

Tests kører på Buns runner og ligger ved siden af den kode, de dækker. Typetjek og lint kører på tværs af alle workspaces fra roden.

{:else}

## What it is

Sora is a catalogue, player, watchlist and release calendar for anime, run from your own server. An account holds any number of profiles, and each profile keeps its own watchlist, progress and notifications.

The web app is one client of a versioned HTTP API. A scheduler keeps the catalogue current, and a typed SDK gives other code the same access the web app has. Sora makes no anime data and hosts no video: metadata comes from public databases, and playback is resolved from third-party sources at request time.

## How it is put together

A Bun monorepo, split by what changes together:

- **api**: a Hono app serving `/v1` and its OpenAPI document.
- **scheduler**: background jobs that follow airing shows and fill the catalogue.
- **web**: the SvelteKit app, which talks to the API through the SDK.
- **core**: the database schema, catalogue, playback and job code the other parts share.
- **sdk**: the typed client.

<Diagram
  name="sora-architecture"
  description="A flowchart. The web app and other clients reach the API through the SDK. The API and the scheduler both use the core, and the core reads from PostgreSQL, from public databases and from playback sources."
  caption="How Sora's parts connect."
/>

## Decisions

### One contract, and a client checked against it

Each route is defined once, with Zod schemas for its parameters, query, body and responses. The OpenAPI document comes from those definitions, and so do the SDK's types: a call with the wrong path parameter or the wrong body fails to compile instead of failing as a 400 in production.

Because the web app goes through the SDK too, it has no private way to the data. If something works in the app, it works for any other client. The cost is more type machinery in the SDK, which infers its inputs and outputs from the route shape. I took that trade because it means the client and the API cannot quietly drift apart.

### Reads never wait on someone else's API

Search and browsing read only from Sora's own PostgreSQL database. The scheduler is what talks to the outside, and it does so under limits: one shared HTTP client enforces per-host rate limits, and the one for a source that allows 60 requests a minute is set to 55.

The scheduler is built on graphile-worker, so its queue and cron live in the same PostgreSQL instance and there is no separate queue to run. Each airing show has at most one pending check, identified by a job key that replaces the old one on reschedule. Airing checks run at a higher priority than the queue of series layouts, because otherwise a newly aired episode waits behind hundreds of them. A show is only listed once a source actually carries its episode.

### Assume the playback sources will break

The playback sources are third-party and change without notice. They sit behind one interface and are tried in order, falling through to the next when one fails. Every call is recorded in a `provider_calls` table with its operation, outcome and duration.

A source's health is computed from those records, and it has three states instead of two. It is *failing* only when at least five calls within three hours all failed or came back empty. With fewer calls it is *idle*, not failing, because a source does not carry every title and a quiet hour should not read as an outage.

### A proxy that cannot become an open proxy

Streams go through Sora's own proxy, so the browser never sees an upstream URL and required headers are added on the server. A proxy that fetches whatever URL it is given can be used to reach internal services, so this one never accepts a URL at all. It accepts tokens.

A token holds the target URL, its kind, the headers it needs, fallback mirrors, the account it was issued to and an expiry. It is encrypted and authenticated with AES-256-GCM under a key derived from a server secret. A changed token is rejected, so is an expired one, and so is one used by a different account.

HLS playlists are rewritten so that every segment, key and sub-playlist URI becomes a new token, with relative URIs resolved first and tags preserved. Some hosts prepend a PNG or JPEG header to video segments to disguise them. The proxy detects and strips that, and treats a segment that is really just an image as a failure instead of playing it.

It also reads ahead. Hosts serve segments they have not served before at roughly the stream's own bitrate, and a player asks for one at a time, so it can never get ahead. Fetching the next 32 segments together, in a cache capped at 256 MB, lets playback outrun the host.

### Lining up subtitles from a different encode

A subtitle track is timed to one video, and a dub of the same episode can have a different opening length, so the cues drift. Fixing that without a library meant using the structure of the data. HLS segments are cut at keyframes, and encoders put keyframes at scene cuts, so two encodes of the same picture share most segment boundaries, shifted by whatever footage one adds or cuts.

The aligner lets boundaries vote on offsets. Two boundaries within 0.12 seconds count as the same cut, an offset needs at least four agreeing boundaries to be considered, and switching to a new offset needs six more matches than staying, so stray matches cannot cause jitter. The shift is found piecewise along the episode, which handles a shorter opening followed by an identical rest. If fewer than half the boundaries match, it concludes the encodes are not the same episode and refuses to retime anything.

## What went wrong

- **Dead workers held their jobs.** When a process dies without shutting down cleanly, graphile-worker keeps its jobs locked for four hours. In development that happened on every restart, and work a viewer was waiting on stayed stuck. Each scheduler now writes a heartbeat every 30 seconds, and any pool silent for two minutes has its locked jobs released by whichever scheduler notices first.
- **A fallback hid a slow dependency.** One lookup service spent about 15 seconds failing on every request before the next source took over. Playback still worked, just slowly. I switched that service off.

## Running it

One Dockerfile builds three images: web, API and scheduler. The API applies database migrations on start, so it deploys before the scheduler. PostgreSQL runs on a persistent volume and stays internal to the Docker network. The whole thing sits behind a Cloudflare Tunnel, with the web service configured to read the visitor's real address so that sign-in limits apply per person.

Tests run on Bun's runner and sit next to the code they cover. Type checking and linting run across every workspace from the root.

{/if}
