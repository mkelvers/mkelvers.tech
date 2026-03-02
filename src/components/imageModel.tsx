import { useState } from 'react'
import { cn } from '@/lib/utils'

export type ImageModalState = {
  images: readonly string[]
  index: number
} | null

type ImageModalProps = {
  state: ImageModalState
  onClose: () => void
}

export function ImageModal({ state, onClose }: ImageModalProps): React.JSX.Element | null {
  if (!state) return null

  const { images, index } = state
  const [currentIndex, setCurrentIndex] = useState(index)

  const goPrev = (): void => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  const goNext = (): void => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img
          src={images[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          className="w-full rounded-lg"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous image"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next image"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    'size-2 rounded-full transition-colors',
                    i === currentIndex ? 'bg-accent' : 'bg-muted-foreground/50'
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
