---
name: Newsify
order: 3
source: https://github.com/mkelvers/newsify
tags: [React, TypeScript, React Query, Sass]
description:
  en: "A mobile news reader on The New York Times APIs, with swipe gestures, a private archive, light and dark themes and animated categories."
  da: "En mobil nyhedslæser på The New York Times' API'er, med swipe-bevægelser, et privat arkiv, lyst og mørkt tema og animerede kategorier."
facts:
  en:
    Type: "School project, presented at the end"
    Stack: "React, TypeScript, Vite, Sass, React Router, React Query, GSAP, Fuse.js"
  da:
    Type: "Skoleprojekt, fremlagt til sidst"
    Stack: "React, TypeScript, Vite, Sass, React Router, React Query, GSAP, Fuse.js"
---

<script>
  import { page } from "$app/state";
</script>

{#if page.data.lang === "da"}

## Hvad det var

En skoleopgave: en nyhedsapp lavet til telefoner. Den viser artikler fra The New York Times i kategorier, og et tryk på en artikel åbner hele artiklen på nytimes.com. Et swipe til venstre på en artikel gemmer den i et privat arkiv, og et swipe til venstre på en arkiveret artikel sletter den. I indstillingerne slår du kategorier til og fra og vælger mellem et lyst og et mørkt tema.

Opgaven nævnte fire ting at øve: at automatisere build med Vite, modulær CSS, at gemme indstillinger og data og at finpudse oplevelsen med små interaktioner og animation. Vi fik også at vide, at den ville blive testet på en rigtig telefon og ikke i en browser-emulator.

## Sådan er den bygget

React med TypeScript på Vite, med Sass til styling. React Router står for siderne: de populære artikler, arkivet, indstillingerne og en onboarding ved første brug. React Query henter artiklerne, og dens cache bliver gemt i browseren, så appen har sine data og husker dine indstillinger mellem besøg.

Søgningen bruger Fuse.js, swipe-bevægelserne bruger react-swipeable, og GSAP animerer en kategoris åbning og lukning og kontakterne i indstillingerne.

## Hvordan det gik

Jeg brugte GSAP, fordi jeg havde arbejdet med det før, hvilket holdt animationen enkel. Jeg fik kernefunktionerne til at virke hurtigt, men det kostede på kodekvaliteten. Bagefter gik jeg tilbage gennem kodebasen og omarbejdede en god del for at rette fejl.

{:else}

## What it was

A school assignment: a news app made for phones. It lists articles from The New York Times in categories, and tapping one opens the full article on nytimes.com. Swiping left on an article saves it to a private archive, and swiping left on an archived one deletes it. In the settings you switch categories on and off and choose between a light and a dark theme.

The brief named four things to practise: automating the build with Vite, modular CSS, storing settings and data, and polishing the experience with small interactions and animation. We were also told it would be tested on a real phone, not in a browser emulator.

## How it is built

React with TypeScript on Vite, with Sass for the styling. React Router handles the pages: the popular articles, the archive, the settings and a first-run onboarding. React Query loads the articles, and its cache is saved to the browser, so the app has its data and keeps your settings between visits.

Search uses Fuse.js, the swipe gestures use react-swipeable, and GSAP animates a category opening and closing and the on and off switches in the settings.

## How it went

I used GSAP because I had worked with it before, which kept the animation simple. I got the core features working quickly, but it cost me in code quality. Afterwards I went back through the codebase and reworked a good part of it to fix mistakes.

{/if}
