---
name: Vinyl Shop
order: 5
tags: [Laravel, PHP, Inertia.js, React, Strapi]
description:
  en: "A two-week exam project, a small webshop for vinyl and CDs on Laravel, React and the Strapi headless CMS. Unfinished, and built to put CMS work and PHP together."
  da: "Et eksamensprojekt på to uger, en lille webshop til vinyl og cd'er på Laravel, React og det headless CMS Strapi. Uafsluttet og bygget for at få CMS og PHP til at spille sammen."
facts:
  en:
    Type: "Exam project, about two weeks"
    Stack: "Laravel (PHP), Inertia.js, React with TypeScript, Strapi, Zustand, Tailwind"
  da:
    Type: "Eksamensprojekt, cirka to uger"
    Stack: "Laravel (PHP), Inertia.js, React med TypeScript, Strapi, Zustand, Tailwind"
---

<script>
  import { page } from "$app/state";
</script>

{#if page.data.lang === "da"}

## Hvad det var

En kort eksamen, som vi skulle bygge og derefter fremlægge. Før den havde vi arbejdet med flere indholdsstyringssystemer, både headless, som kun gemmer og leverer indhold, og traditionelle som WordPress. Eksamen var en chance for at bruge det i én applikation. Jeg havde arbejdet med Strapi og WordPress før, og jeg havde lært PHP cirka en måned tidligere.

Jeg valgte Strapi til indholdet og Laravel til applikationen omkring det. Jeg ville teste CMS-siden og PHP sammen og gå dybere ind i PHP.

## Sådan hænger det sammen

Strapi holder indholdet: produkter med titel, kunstner, genre, år, pris, billede og stand på cover og medie, plus genrer og et hero-banner. Laravel henter det gennem en lille service og giver det til React-siderne med Inertia.js. Inertia betyder, at der ikke er et separat API at vedligeholde. Når du klikker på et link, svarer Laravel med en React-komponent og dens data, og siden opdateres uden genindlæsning.

Butikken har et produktgitter med filtre for genre, år og pris, en søgning, produktsider og en kurv, som ligger i browseren i en Zustand-store. Der er feature-tests for produktsiden og kurven.

## Hvordan det gik

Det var småt, fordi der kun var to uger, og det blev ikke færdigt. Det gik dog ret godt. Det var sjovt at bygge, og jeg lærte meget.

{:else}

## What it was

A short exam that we had to build and then present. Before it, we had worked with several content management systems, both headless ones, which only store and serve content, and traditional ones such as WordPress. The exam was a chance to use that in one application. I had worked with Strapi and WordPress before, and I had learned PHP about a month earlier.

I chose Strapi for the content and Laravel for the application around it. I wanted to test the CMS side and PHP together, and go deeper into PHP.

## How it fits together

Strapi holds the content: products with title, artist, genre, year, price, image and the condition of the sleeve and the media, plus genres and a hero banner. Laravel fetches it through a small service and hands it to the React pages with Inertia.js. Inertia means there is no separate API to maintain. When you click a link, Laravel answers with a React component and its data, and the page updates without a reload.

The shop has a product grid with filters for genre, year and price, a search, product pages and a cart, which lives in the browser in a Zustand store. There are feature tests for the products page and the cart.

## How it went

It was small, because there were only two weeks, and it was not finished. It went quite well, though. It was fun to build and I learned a lot.

{/if}
