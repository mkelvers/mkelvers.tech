import { useTranslation } from 'react-i18next'
import { setStoredLanguage } from '@/lib/i18n'

type LanguageModalProps = {
  open: boolean
  onClose: () => void
}

function DanishFlag(): React.JSX.Element {
  return (
    <svg className="size-8" viewBox="0 0 640 480">
      <path fill="#c8102e" d="M0 0h640v480H0z" />
      <path fill="#fff" d="M205.71 0h68.57v480h-68.57z" />
      <path fill="#fff" d="M0 205.71h640v68.57H0z" />
    </svg>
  )
}

function BritishFlag(): React.JSX.Element {
  return (
    <svg className="size-8" viewBox="0 0 640 480">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
      <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
      <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
      <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
    </svg>
  )
}

export function LanguageModal({ open, onClose }: LanguageModalProps): React.JSX.Element | null {
  const { t, i18n } = useTranslation()

  if (!open) return null

  const selectLanguage = (lang: string): void => {
    i18n.changeLanguage(lang)
    setStoredLanguage(lang)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-muted-background border border-border rounded-lg p-8 max-w-sm w-full mx-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-medium">{t('language_modal.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('language_modal.subtitle')}</p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => selectLanguage('da')}
            className="flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <DanishFlag />
            <span className="font-medium">Dansk</span>
          </button>
          <button
            type="button"
            onClick={() => selectLanguage('en')}
            className="flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-colors"
          >
            <BritishFlag />
            <span className="font-medium">English</span>
          </button>
        </div>
      </div>
    </div>
  )
}
