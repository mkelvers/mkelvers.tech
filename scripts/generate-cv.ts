import { mkdir, writeFile } from 'node:fs/promises'
import { createResumePdf } from '../src/resume'

await mkdir('public', { recursive: true })

const blob = await createResumePdf('da')
const bytes = Buffer.from(await blob.arrayBuffer())
await writeFile('public/cv.pdf', bytes)
