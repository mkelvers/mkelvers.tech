import React from 'react'
import { Document, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer'

export type ResumeLanguage = 'en' | 'da'

const styles = StyleSheet.create({
    page: { flexDirection: 'row', backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
    sidebar: { width: '30%', minHeight: '100%', padding: 22, color: '#ffffff', backgroundColor: '#2a2a2a' },
    main: { width: '70%', padding: 32, color: '#333333' },
    sidebarSection: { marginBottom: 24 },
    sidebarHeader: { paddingBottom: 5, marginBottom: 10, color: '#ffffff', fontSize: 10, letterSpacing: 0.7, textTransform: 'uppercase' },
    sidebarText: { marginBottom: 5, color: '#ffffff', fontSize: 9.5, lineHeight: 1.4 },
    section: { marginBottom: 22 },
    name: { marginBottom: 5, color: '#2c3e50', fontSize: 24 },
    title: { marginBottom: 18, color: '#7f8c8d', fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase' },
    sectionHeader: { paddingBottom: 5, marginBottom: 10, color: '#2c3e50', fontSize: 11, letterSpacing: 0.7, textTransform: 'uppercase' },
    entryContainer: { marginBottom: 13 },
    entryTitle: { color: '#34495e', fontSize: 10.5 },
    entryMeta: { marginTop: 2, marginBottom: 5, color: '#7f8c8d', fontSize: 8.5 },
    entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    entryDescription: { color: '#333333', fontSize: 9.5, lineHeight: 1.45 },
    projectLink: { marginTop: 3, color: '#2456a6', fontSize: 8.5 },
})

const content = {
    en: {
        title: 'Frontend developer', contact: 'Contact', expertise: 'Expertise', languages: 'Languages', projects: 'Projects', education: 'Education', educationName: 'Web Developer', school: 'Roskilde Technical School', educationDate: 'October 2, 2026',
        profile: 'I enjoy experimenting, solving problems, and understanding how software works beneath the surface. I am looking for an opportunity to contribute to a real product, grow through collaboration, and work on something with a clear visual result.',
        projectsList: [
            { name: 'HiFi Horizon', meta: 'React · TypeScript · Vite · Tailwind CSS · Express · PostgreSQL', description: 'A React and TypeScript hi-fi webshop with product browsing, category, manufacturer, colour and price filters, search, product pages, comparison, a cart and checkout flow. The project also includes registration and login, user profiles, order history, invoices, a contact form and an Express API backed by PostgreSQL and Drizzle ORM.', link: 'github.com/mkelvers/hifi-horizon' },
            { name: 'Newsify', meta: 'React · React Router · React Query · Sass', description: 'A mobile-focused React app that combines The New York Times Top Stories and Most Popular APIs into feeds based on the user’s selected categories. I worked with Fuse.js search, onboarding, saved articles and an archive, swipe actions, locally stored settings, and light and dark themes.', link: 'github.com/mkelvers/newsify' },
            { name: 'Digital Escape Room', meta: 'Vite · JavaScript · CSS · Group project', description: 'A school project created to introduce prospective students to web development. Players solve approachable coding tasks in a five-minute, bank-themed escape room. Contributed across implementation, issue fixing, merge conflict resolution, and GitHub collaboration.', link: '' },
        ],
    },
    da: {
        title: 'Webudvikler', contact: 'Kontakt', expertise: 'Kompetencer', languages: 'Sprog', projects: 'Projekter', education: 'Uddannelse', educationName: 'Webudvikler', school: 'Roskilde Tekniske Skole', educationDate: 'August 2025 - 2. oktober 2026',
        profile: 'Jeg er en nysgerrig webudvikler med stor interesse for teknologi og udvikling. Jeg elsker en god udfordring og kan godt lide at eksperimentere, løse problemer og forstå, hvordan tingene fungerer under overfladen. Gennem skoleprojekter har jeg arbejdet med flere teknologier inden for frontendudvikling. Jeg er stadig ved at bygge min erfaring op og lærer gerne nyt, når et projekt kræver det.',
        projectsList: [
            { name: 'HiFi Horizon', meta: 'React · TypeScript · Vite · Tailwind CSS · Express · PostgreSQL', description: 'En React- og TypeScript-baseret hi-fi-webshop med produktvisning, filtrering efter kategori, producent, farve og pris, søgning, produktsider, sammenligning, kurv og checkout-flow. Projektet indeholder også login og registrering, brugerprofil, ordreoversigt, fakturaer, kontaktformular samt et Express-API med PostgreSQL og Drizzle ORM.', link: 'github.com/mkelvers/hifi-horizon' },
            { name: 'Newsify', meta: 'React · React Router · React Query · Sass', description: 'En mobilfokuseret React-app, der samler The New York Times’ Top Stories og Most Popular API’er i nyhedsfeeds ud fra brugerens valgte kategorier. Jeg arbejdede med Fuse.js-søgning, onboarding, gemte artikler og arkiv, swipe-handlinger, lokalt gemte indstillinger samt lyst og mørkt tema.', link: 'github.com/mkelvers/newsify' },
            { name: 'Digitalt escaperoom', meta: 'Vite · JavaScript · CSS · Gruppeprojekt', description: 'Et skoleprojekt, der skulle introducere kommende elever til webudvikling. Spilleren løser tilgængelige kodeopgaver i et fem minutters bank-inspireret escaperoom. Jeg bidrog med implementering, fejlrettelser, løsning af merge-konflikter og samarbejde via GitHub.', link: '' },
        ],
    },
} as const

function ResumeDocument({ language }: { language: ResumeLanguage }) {
    const text = content[language]

    return (
        <Document author="Mikkel Nothlev Elvers" title={`${text.title} · Mikkel Nothlev Elvers`} language={language === 'da' ? 'da-DK' : 'en-US'}>
            <Page size="A4" style={styles.page}>
                <View style={styles.sidebar}>
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarHeader}>{text.contact}</Text>
                        <Text style={styles.sidebarText}>Holbæk, {language === 'en' ? 'Denmark' : 'Danmark'}</Text>
                        <Text style={styles.sidebarText}>+45 42 73 63 93</Text>
                        <Text style={styles.sidebarText}>mikkelelver@outlook.com</Text>
                        <Text style={styles.sidebarText}>linkedin.com/in/mikkelnothlev</Text>
                        <Text style={styles.sidebarText}>github.com/mkelvers</Text>
                    </View>
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarHeader}>{text.expertise}</Text>
                        {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map((skill) => <Text key={skill} style={styles.sidebarText}>{skill}</Text>)}
                    </View>
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarHeader}>{text.languages}</Text>
                        <Text style={styles.sidebarText}>{language === 'en' ? 'Danish' : 'Dansk'}</Text>
                        <Text style={styles.sidebarText}>{language === 'en' ? 'English' : 'Engelsk'}</Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <View style={styles.section}>
                        <Text style={styles.name}>Mikkel Nothlev Elvers</Text>
                        <Text style={styles.title}>{text.title}</Text>
                        <Text style={styles.entryDescription}>{text.profile}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>{text.projects}</Text>
                        {text.projectsList.map((project) => <View key={project.name} style={styles.entryContainer} wrap={false}>
                            <Text style={styles.entryTitle}>{project.name}</Text>
                            <Text style={styles.entryMeta}>{project.meta}</Text>
                            <Text style={styles.entryDescription}>{project.description}</Text>
                            {project.link ? <Text style={styles.projectLink}>{project.link}</Text> : null}
                        </View>)}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>{text.education}</Text>
                        <View style={styles.entryContainer}>
                            <Text style={styles.entryTitle}>{text.educationName}</Text>
                            <View style={styles.entryRow}>
                                <Text style={styles.entryMeta}>{text.school}</Text>
                                <Text style={styles.entryMeta}>{text.educationDate}</Text>
                            </View>
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
