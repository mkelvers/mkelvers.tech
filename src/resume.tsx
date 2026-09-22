import React from 'react'
import { fileURLToPath } from 'node:url'
import { Document, Font, Page, Path, StyleSheet, Svg, Text, View, pdf } from '@react-pdf/renderer'

export type ResumeLanguage = 'en' | 'da'

Font.register({
    family: 'Inter',
    fonts: [
        { src: fileURLToPath(new URL('./fonts/Inter.ttf', import.meta.url)), fontWeight: 400 }
    ]
})

Font.registerHyphenationCallback((word) => [word])

const styles = StyleSheet.create({
    page: { position: 'relative', backgroundColor: '#ffffff', fontFamily: 'Inter' },
    banner: { height: 126, padding: 30, alignItems: 'center', justifyContent: 'center', color: '#ffffff', backgroundColor: '#1f4e79' },
    bannerName: { color: '#ffffff', fontFamily: 'Helvetica-Bold', fontSize: 30, letterSpacing: 0.8 },
    bannerTitle: { marginTop: 6, color: '#ffffff', fontFamily: 'Helvetica-Bold', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' },
    body: { position: 'relative', height: 714 },
    sidebar: { position: 'absolute', top: 0, left: 0, width: '30%', height: '100%', padding: 24, backgroundColor: '#f3f3f3' },
    main: { position: 'absolute', top: 0, left: '30%', width: '70%', height: '100%', padding: 28, color: '#161616' },
    sidebarSection: { marginBottom: 18 },
    sidebarHeader: { paddingBottom: 4, marginBottom: 8, color: '#000000', fontFamily: 'Helvetica-Bold', fontSize: 10.5, letterSpacing: 0.5, textAlign: 'left', textTransform: 'uppercase' },
    contactRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 6 },
    contactIcon: { width: 12, height: 12, marginRight: 7 },
    contactText: { color: '#222222', fontSize: 8.5, lineHeight: 1.2, textAlign: 'left' },
    sidebarText: { color: '#222222', fontSize: 9.5, lineHeight: 1.2, textAlign: 'left' },
    sidebarEducationName: { marginBottom: 3, color: '#222222', fontSize: 9.8, lineHeight: 1.2, textAlign: 'left' },
    sidebarListItem: { marginBottom: 3, color: '#222222', fontSize: 9.8, lineHeight: 1.2, textAlign: 'left' },
    section: { marginBottom: 17 },
    sectionHeader: { paddingBottom: 4, marginBottom: 8, color: '#000000', fontFamily: 'Helvetica-Bold', fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase' },
    profile: { color: '#222222', fontSize: 10.6, lineHeight: 1.25 },
    projectEntry: { marginBottom: 11 },
    entryTitle: { color: '#000000', fontFamily: 'Inter', fontSize: 11.2 },
    entryMeta: { marginTop: 2, marginBottom: 4, color: '#333333', fontSize: 9.2 },
    bulletRow: { flexDirection: 'row', marginBottom: 2 },
    bullet: { width: 9, color: '#000000', fontFamily: 'Inter', fontSize: 10.2 },
    bulletText: { flex: 1, color: '#222222', fontSize: 10, lineHeight: 1.2 },
})

type ContactIconKind = 'email' | 'phone' | 'location' | 'linkedin' | 'github'

function ContactIcon({ kind }: { kind: ContactIconKind }) {
    const iconColor = '#7d8287'

    if (kind === 'email') {
        return <Svg style={styles.contactIcon} viewBox="0 0 256 256"><Path d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8Zm-96 85.15L52.57 64h150.86ZM98.71 128 40 181.81V74.19Zm11.84 10.85 12 11.05a8 8 0 0 0 10.82 0l12-11.05 58 53.15H52.57ZM157.29 128 216 74.18v107.64Z" fill={iconColor} /></Svg>
    }

    if (kind === 'phone') {
        return <Svg style={styles.contactIcon} viewBox="0 0 256 256"><Path d="M222.37 158.46l-47.11-21.11-.13-.06a16 16 0 0 0-15.17 1.4 8.12 8.12 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06l0-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92 16 16 0 0 0-9.51-16.62ZM176 208A128.14 128.14 0 0 1 48 80 40.2 40.2 0 0 1 82.87 40a.61.61 0 0 0 0 .12l21 47L83.2 111.86a6.13 6.13 0 0 0-.57.77 16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14 8.44 8.44 0 0 0 .74-.56L168.89 152l47 21.05h.11a40.21 40.21 0 0 1-40 34.95Z" fill={iconColor} /></Svg>
    }

    if (kind === 'location') {
        return <Svg style={styles.contactIcon} viewBox="0 0 256 256"><Path d="M128 64a40 40 0 1 0 40 40 40 40 0 0 0-40-40Zm0 64a24 24 0 1 1 24-24 24 24 0 0 1-24 24Zm0-112a88.1 88.1 0 0 0-88 88c0 31.4 14.51 64.68 42 96.25a254.19 254.19 0 0 0 41.45 38.3 8 8 0 0 0 9.18 0A254.19 254.19 0 0 0 174 200.25c27.45-31.57 42-64.85 42-96.25a88.1 88.1 0 0 0-88-88Zm0 206c-16.53-13-72-60.75-72-118a72 72 0 0 1 144 0c0 57.23-55.47 105-72 118Z" fill={iconColor} /></Svg>
    }

    if (kind === 'linkedin') {
        return <Svg style={styles.contactIcon} viewBox="0 0 256 256"><Path d="M216 24H40a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16Zm0 192H40V40h176ZM96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm88 28v36a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.79-1.78A36 36 0 0 1 184 140ZM100 84A12 12 0 1 1 88 72a12 12 0 0 1 12 12Z" fill={iconColor} /></Svg>
    }

    return <Svg style={styles.contactIcon} viewBox="0 0 256 256"><Path d="M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4 59.75 59.75 0 0 0-48 24H124A59.75 59.75 0 0 0 76 24a8 8 0 0 0-6.93 4 59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24A40 40 0 0 0 8 136a8 8 0 0 0 0 16 24 24 0 0 1 24 24 40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32ZM200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48A8 8 0 0 0 80 73.83a43.81 43.81 0 0 1 .79-33.58 43.88 43.88 0 0 1 32.32 20.06A8 8 0 0 0 119.82 64h32.35a8 8 0 0 0 6.74-3.69 43.87 43.87 0 0 1 32.32-20.06A43.81 43.81 0 0 1 192 73.83a8.09 8.09 0 0 0 1 7.65A41.72 41.72 0 0 1 200 104Z" fill={iconColor} /></Svg>
}

const content = {
    en: {
        title: 'Web developer',
        contact: 'Contact',
        education: 'Education',
        expertise: 'Core skills',
        languages: 'Languages',
        profileHeading: 'Profile',
        projects: 'Projects',
        educationName: 'Web Developer',
        school: 'Roskilde Technical School',
        educationDate: 'August 2024 - October 2026',
        profile: 'Web developer focused on React, TypeScript, and modern web applications. I have built both frontend and backend through projects using Next.js, Express, and REST APIs. I care about readable code, clear abstractions, and understanding the technology behind the solutions I build.',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git'],
        languageLevels: ['Danish', 'English'],
        contactItems: [
            { kind: 'email' as const, value: 'mikkelelvers@outlook.com' },
            { kind: 'phone' as const, value: '+45 42 73 63 93' },
            { kind: 'location' as const, value: 'Regstrup, Denmark' },
            { kind: 'linkedin' as const, value: 'linkedin.com/in/mikkelnothlev' },
            { kind: 'github' as const, value: 'github.com/mkelvers' }
        ],
        projectsList: [
            {
                name: 'HiFi Horizon',
                meta: 'React · TypeScript · Express · PostgreSQL',
                bullets: [
                    'Full-stack webshop for browsing and comparing hi-fi products before adding them to a cart and completing checkout.',
                    'Implemented product search, filtering, comparison, user profiles, order history, and authentication.',
                    'Built the Express API that connects the React frontend to PostgreSQL data for users, products, and orders.'
                ]
            },
            {
                name: 'Newsify',
                meta: 'React · TypeScript · React Query · Sass',
                bullets: [
                    "Mobile news reader that fetches The New York Times' Top Stories and Most Popular APIs and groups articles by category.",
                    'Implemented search with Fuse.js, React Query data fetching, and a swipe-based archive for articles.',
                    'Persisted theme, selected categories, and archive state so the app keeps its settings between sessions.'
                ]
            },
            {
                name: 'Dyrevelfærd',
                meta: 'Next.js · TypeScript · SQLite',
                bullets: [
                    'Content platform for Foreningen for Dyrevelfærd where visitors can browse animals, read detail pages, and sign up for updates.',
                    'Built the public catalogue with pagination and a protected admin area for login, animal CRUD, and image uploads.',
                    'Implemented newsletter subscribe and unsubscribe actions in the SQLite-backed Next.js application.'
                ]
            }
        ]
    },
    da: {
        title: 'Webudvikler',
        contact: 'Kontakt',
        education: 'Uddannelse',
        expertise: 'Kernekompetencer',
        languages: 'Sprog',
        profileHeading: 'Profil',
        projects: 'Projekter',
        educationName: 'Webudvikler',
        school: 'Roskilde Tekniske Skole',
        educationDate: 'August 2024 - Oktober 2026',
        profile: "Webudvikler med fokus på React, TypeScript og moderne webapplikationer. Jeg har bygget både frontend og backend gennem projekter med Next.js, Express og REST API'er. Jeg prioriterer læsbar kode, tydelige abstraktioner og at forstå teknologien bag de løsninger, jeg bygger.",
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git'],
        languageLevels: ['Dansk', 'Engelsk'],
        contactItems: [
            { kind: 'email' as const, value: 'mikkelelvers@outlook.com' },
            { kind: 'phone' as const, value: '+45 42 73 63 93' },
            { kind: 'location' as const, value: 'Regstrup, Danmark' },
            { kind: 'linkedin' as const, value: 'linkedin.com/in/mikkelnothlev' },
            { kind: 'github' as const, value: 'github.com/mkelvers' }
        ],
        projectsList: [
            {
                name: 'HiFi Horizon',
                meta: 'React · TypeScript · Express · PostgreSQL',
                bullets: [
                    'Full-stack webshop, hvor brugere kan finde, sammenligne og købe hi-fi-produkter.',
                    'Implementerede søgning, filtrering, produktsammenligning, kurv, checkout, brugerprofiler og ordrehistorik.',
                    'Byggede et Express-API, der forbinder React-frontend til PostgreSQL-data for brugere, produkter og ordrer.'
                ]
            },
            {
                name: 'Newsify',
                meta: 'React · TypeScript · React Query · Sass',
                bullets: [
                    "Mobil nyhedsapp, der henter artikler fra The New York Times' Top Stories- og Most Popular-API'er og grupperer dem efter kategori.",
                    'Implementerede søgning med Fuse.js, datahentning med React Query og et swipe-baseret arkiv.',
                    'Gemte tema, valgte kategorier og arkivstatus, så appens indstillinger bevares mellem sessioner.'
                ]
            },
            {
                name: 'Dyrevelfærd',
                meta: 'Next.js · TypeScript · SQLite',
                bullets: [
                    'Indholdsplatform for Foreningen for Dyrevelfærd, hvor besøgende kan se dyr, læse detaljesider og tilmelde sig nyheder.',
                    'Byggede et pagineret offentligt katalog samt et beskyttet adminområde til login, oprettelse, redigering og billedupload.',
                    'Implementerede til- og afmelding til nyhedsbrev i en Next.js-applikation med SQLite.'
                ]
            }
        ]
    }
} as const

function ResumeDocument({ language }: { language: ResumeLanguage }) {
    const text = content[language]

    return (
        <Document author="Mikkel Nothlev Elvers" title={`${text.title} · Mikkel Nothlev Elvers`} language={language === 'da' ? 'da-DK' : 'en-US'}>
            <Page size="A4" style={styles.page}>
                <View style={styles.banner}>
                    <Text style={styles.bannerName}>MIKKEL NOTHLEV ELVERS</Text>
                    <Text style={styles.bannerTitle}>{text.title}</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.main}>
                        <View style={styles.section}>
                            <Text style={styles.profile}>{text.profile}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>{text.projects}</Text>
                            {text.projectsList.map((project) => <View key={project.name} style={styles.projectEntry} wrap={false}>
                                <Text style={styles.entryTitle}>{project.name}</Text>
                                <Text style={styles.entryMeta}>{project.meta}</Text>
                                {project.bullets.map((bullet) => <View key={bullet} style={styles.bulletRow}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bulletText}>{bullet}</Text>
                                </View>)}
                            </View>)}
                        </View>
                    </View>
                    <View style={styles.sidebar}>
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarHeader}>{text.contact}</Text>
                            {text.contactItems.map((item) => <View key={item.kind} style={styles.contactRow}>
                                <ContactIcon kind={item.kind} />
                                <Text style={styles.contactText}>{item.value}</Text>
                            </View>)}
                        </View>
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarHeader}>{text.education}</Text>
                            <Text style={styles.sidebarEducationName}>{text.educationName}</Text>
                            <Text style={styles.sidebarText}>{text.school}</Text>
                            <Text style={{ ...styles.sidebarText, marginTop: 4 }}>{text.educationDate}</Text>
                        </View>
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarHeader}>{text.expertise}</Text>
                            {text.skills.map((skill) => <Text key={skill} style={styles.sidebarListItem}>{skill}</Text>)}
                        </View>
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarHeader}>{text.languages}</Text>
                            {text.languageLevels.map((languageLevel) => <Text key={languageLevel} style={styles.sidebarListItem}>{languageLevel}</Text>)}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export async function createResumePdf(language: ResumeLanguage) {
    return pdf(<ResumeDocument language={language} />).toBlob()
}
