<script lang="ts">
    import { m } from './paraglide/messages.js'
    import { getLocale, setLocale } from './paraglide/runtime.js'

    let locale = $state(getLocale())
    let nextLocale: 'en' | 'da' = $derived(locale === 'da' ? 'en' : 'da')

    $effect(() => {
        document.documentElement.lang = locale
    })

    function switchLocale(nextLocale: 'en' | 'da') {
        locale = nextLocale
        setLocale(nextLocale, { reload: false })
    }
</script>

<div class="language-switcher" role="group" aria-label={m.language_switcher_label()}>
    <button
        type="button"
        aria-label={nextLocale === 'da' ? m.switch_to_danish() : m.switch_to_english()}
        onclick={() => switchLocale(nextLocale)}
    >
        <img
            src={nextLocale === 'da'
                ? 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@v7.5.0/flags/4x3/dk.svg'
                : 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@v7.5.0/flags/4x3/us.svg'}
            alt=""
        />
    </button>
</div>

{#key locale}
    <a class="skip-link" href="#content">{m.skip_to_content()}</a>

    <main id="content">
        <header>
            <img
                class="avatar"
                src="https://avatars.githubusercontent.com/u/125761948?v=4"
                alt={m.avatar_alt()}
                width="96"
                height="96"
            />
            <h1 id="page-title">Mikkel Elvers</h1>
            <p class="intro">
                {m.intro()}
            </p>
            <p class="availability">{m.availability()}</p>
            <ul class="tech-stack" aria-label={m.tech_stack_label()}>
                <li>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="" />
                    <span>React</span>
                </li>
                <li>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="" />
                    <span>Next.js</span>
                </li>
                <li>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="" />
                    <span>TypeScript</span>
                </li>
                <li>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="" />
                    <span>Tailwind CSS</span>
                </li>
            </ul>
            <nav aria-label={m.contact_links_label()}>
                <a href="mailto:mikkelelvers@outlook.com">( {m.email()} )</a>
                <a href="https://github.com/mkelvers" rel="me">( {m.github()} )</a>
                <a href="https://www.linkedin.com/in/mikkelnothlev/" rel="me"
                    >( {m.linkedin()} )</a
                >
                <a href={locale === 'da' ? '/cv.pdf' : '/cv-en.pdf'}>( {m.cv()} )</a>
            </nav>
        </header>
    </main>
{/key}
