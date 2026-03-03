import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const ContactSchema = z.object({
  email: z.email('please enter a valid email'),
  message: z.string().min(10, 'message must be at least 10 characters'),
  honeypot: z.string().optional()
})

type ContactFormData = z.infer<typeof ContactSchema>

type FormStatus = 'idle' | 'submitting'

export function ContactForm(): React.JSX.Element {
  const { t } = useTranslation()
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  })

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setFormStatus('submitting')

    if (data.honeypot) {
      reset()
      setFormStatus('idle')
      return
    }

    try {
      const res = await fetch('https://formspree.io/f/mlgwygew', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        toast.success(t('contact.success'))
        reset()
      } else {
        toast.error(t('contact.error'))
      }
    } catch {
      toast.error(t('contact.error'))
    } finally {
      setFormStatus('idle')
    }
  }

  const isSubmitting = formStatus === 'submitting'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-md">
      <div>
        <label htmlFor="email" className="sr-only">{t('contact.email')}</label>
        <input
          id="email"
          type="email"
          placeholder={t('contact.email')}
          disabled={isSubmitting}
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
          className="w-full bg-background border border-border rounded px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent disabled:opacity-50"
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="sr-only">{t('contact.message')}</label>
        <textarea
          id="message"
          placeholder={t('contact.message')}
          rows={4}
          disabled={isSubmitting}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
          className="w-full bg-background border border-border rounded px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent resize-none disabled:opacity-50"
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-400 mt-1">{errors.message.message}</p>
        )}
      </div>
      <div aria-hidden="true" className="absolute -left-2499.75 w-px h-px overflow-hidden">
        <label htmlFor='honeypot'>leave this field empty</label>
        <input
          id='honeypot'
          type='text'
          tabIndex={-1}
          autoComplete='off'
          {...register('honeypot')}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent text-background font-medium rounded px-4 py-2 text-sm hover:bg-accent/90 transition-colors w-fit disabled:opacity-50"
      >
        {isSubmitting ? t('contact.sending') : t('contact.send')}
      </button>
    </form>
  )
}
