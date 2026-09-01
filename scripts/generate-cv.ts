import { mkdir, writeFile } from 'node:fs/promises'
import { createResumePdf, type ResumeLanguage } from '../src/resume'

await mkdir('public', { recursive: true })

for (const language of ['da', 'en'] as ResumeLanguage[]) {
    const blob = await createResumePdf(language)
    const bytes = Buffer.from(await blob.arrayBuffer())
    await writeFile(`public/${language === 'da' ? 'cv' : 'cv-en'}.pdf`, bytes)
}
