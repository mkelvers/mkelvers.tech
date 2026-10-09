---
name: Escape Room
order: 4
tags: [React, Vite, Bun, SQLite]
description:
  en: "A browser game where you have five minutes to fix a compromised bank website by solving small CSS puzzles. A team project, built to a school brief."
  da: "Et browserspil, hvor du har fem minutter til at rette en kompromitteret bankhjemmeside ved at løse små CSS-opgaver. Et teamprojekt efter en opgavebeskrivelse fra skolen."
facts:
  en:
    Type: "Team project, built to a school brief"
    Stack: "React, Vite, GSAP, Howler.js, Bun, Express, SQLite"
    Puzzles: "10 short CSS puzzles"
  da:
    Type: "Teamprojekt efter en opgavebeskrivelse fra skolen"
    Stack: "React, Vite, GSAP, Howler.js, Bun, Express, SQLite"
    Opgaver: "10 korte CSS-opgaver"
---

<script>
  import { page } from "$app/state";
</script>

{#if page.data.lang === "da"}

## Opgaven

Skolen bad om et digitalt escape room, der viser, hvad en webudvikler egentlig laver. Historien er, at en banks hjemmeside er blevet kompromitteret, og at dens låsekode er blevet glemt. Du har fem minutter til at rette den ødelagte side, og hver rettelse afslører en bid af koden. Tast hele koden ind for at vinde. Løber tiden ud, eller taster du forkert, starter du forfra.

Opgavebeskrivelsen stillede også kravene: et udseende et sted mellem en bank og et escape room, stressende musik i baggrunden, en nedtælling, der altid er synlig, og opgaver, som folk uden udviklerbaggrund kan løse, med mindst én rigtig kodeopgave.

## Sådan virker det

Hver bane er et lille stykke ødelagt CSS, som du retter i browseren. Du flytter en boks til højre med `justify-content`, centrerer en knap med `align-items`, giver en overskrift sin størrelse tilbage, skifter en skrifttype tilbage til noget læseligt, stabler en formulars felter i en kolonne og tilføjer den manglende ramme. I historien bliver flere af de fejl skyldt på en AI.

Spillet har ti af den slags baner. Frontenden er React med Vite, GSAP til animation og Howler til musikken.

## Highscorelisten

En lille server skrevet med Express på Bun gemmer en highscoreliste i SQLite. Et spillernavn er præcis tre bogstaver, valideret med Zod og tjekket mod en liste over forbudte ord, og forespørgsler er rate limited.

{:else}

## The brief

The school asked for a digital escape room that shows what a web developer actually does. The story is that a bank's website has been compromised and its lock code has been forgotten. You have five minutes to fix the broken page, and every fix reveals a piece of the code. Type the full code in to win. Run out of time, or get it wrong, and you start again.

The brief also set the requirements: a look somewhere between a bank and an escape room, stressful music in the background, a countdown that is always visible, and puzzles that people who are not developers can solve, with at least one real coding task.

## How it works

Each level is a small piece of broken CSS that you fix in the browser. You move a box to the right with `justify-content`, centre a button with `align-items`, bring back a heading's size, switch a font back to something readable, stack a form's fields in a column, and add the missing border. In the story, several of these mistakes are blamed on an AI.

The game has ten of these levels. The front end is React with Vite, GSAP for the animation and Howler for the music.

## The leaderboard

A small server written with Express on Bun keeps a leaderboard in SQLite. A player's name is exactly three letters, validated with Zod and checked against a list of banned words, and requests are rate limited.

{/if}
