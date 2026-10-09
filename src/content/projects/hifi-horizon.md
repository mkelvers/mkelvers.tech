---
name: HiFi Horizon
order: 2
source: https://github.com/mkelvers/hifi-horizon
tags: [React, TypeScript, Express, PostgreSQL]
description:
  en: "A hi-fi webshop built to a design we were given, with filtering, product comparison, a checkout flow, accounts and a PostgreSQL back end."
  da: "En hi-fi-webshop bygget efter et design, vi fik udleveret, med filtrering, produktsammenligning, et checkout-flow, brugerkonti og en PostgreSQL-backend."
facts:
  en:
    Type: "School project, about a month, presented at the end"
    Stack: "React, TypeScript, TanStack Router and Query, Zustand, Tailwind, Express, PostgreSQL, Drizzle"
  da:
    Type: "Skoleprojekt, cirka en måned, fremlagt til sidst"
    Stack: "React, TypeScript, TanStack Router og Query, Zustand, Tailwind, Express, PostgreSQL, Drizzle"
---

<script>
  import { page } from "$app/state";
</script>

{#if page.data.lang === "da"}

## Hvad det var

En skoleopgave: lav en e-commerce-side til en hi-fi-butik og følg et design, vi fik udleveret. Vi havde cirka en måned, og til sidst fremlagde vi, hvad vi havde lavet, og hvordan.

Opgavebeskrivelsen bad kun om browsing-delen. Det betød en forside, lister over mærker og kategorier, produktsider og søgning, med data fra JSON-filer, og der stod udtrykkeligt, at ingen skulle kunne købe noget. Denne version går længere end det.

## Hvad den kan

Du kan browse efter kategori og mærke og søge i produkterne, med filtre og en produktside med billedkarrusel, valg af farve og antal og en lagerindikator. Du kan sammenligne produkter side om side. Der er en kurv og et checkout, der løber fra kurven gennem en formular til oplysninger og betaling til en faktura. Der er brugerkonti med registrering, login og en profil, der viser dine ordrer, plus sider med FAQ, om os, kontakt, privatlivspolitik og vilkår.

Der er ingen rigtig betalingsudbyder bag betalingstrinnet. Det er en formular, der afgiver en ordre.

## Sådan er den bygget

Et Bun- og Turborepo-monorepo med tre dele.

Frontenden er React med TypeScript. TanStack Router giver filbaserede ruter, TanStack Query henter dataene, og Zustand holder kurven, checkout og sammenligningen. Formularer valideres med Zod, og søgningen bruger Fuse.js, så en tastefejl stadig finder produktet. Styling er Tailwind.

Backenden er Express på PostgreSQL gennem Drizzle. Den har ruter til konti, produkter, ordrer og kontaktbeskeder. Adgangskoder hashes med bcrypt, og et login sætter et JWT i en cookie.

En delt pakke holder databaseskemaet og de Zod-skemaer, der er lavet ud fra det, så frontenden og backenden bruger de samme definitioner af et produkt og en bruger.

{:else}

## What it was

A school assignment: make an e-commerce site for a hi-fi shop and follow a design we were given. We had about a month, and at the end we presented what we had made and how.

The brief only asked for the browsing side. That meant a front page, brand and category lists, product pages and search, with the data coming from JSON files, and it said explicitly that nobody should be able to buy anything. This version goes further than that.

## What it does

You can browse by category and brand and search the products, with filters and a product page that has an image carousel, colour and quantity choices and a stock indicator. You can compare products side by side. There is a cart, and a checkout that runs from the cart through a details and payment form to an invoice. There are accounts, with registration, login and a profile that lists your orders, plus FAQ, about, contact, privacy and terms pages.

There is no real payment provider behind the payment step. It is a form that places an order.

## How it is built

A Bun and Turborepo monorepo with three parts.

The front end is React with TypeScript. TanStack Router gives file-based routes, TanStack Query loads the data, and Zustand holds the cart, the checkout and the comparison. Forms are validated with Zod, and the search uses Fuse.js, so a typo still finds the product. Styling is Tailwind.

The back end is Express on PostgreSQL through Drizzle. It has routes for accounts, products, orders and contact messages. Passwords are hashed with bcrypt, and a login sets a JWT in a cookie.

A shared package holds the database schema and the Zod schemas made from it, so the front end and the back end use the same definitions of a product and a user.

{/if}
