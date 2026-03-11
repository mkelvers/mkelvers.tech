import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-center min-h-[50vh]">
      <h1 className="text-4xl font-bold mb-4 text-white">
        <span className="text-accent mr-2 font-mono">*</span>
        404
      </h1>

      <p className="text-gray-400 mb-8 max-w-md">
        this page doesn&apos;t exist. you might have typed the address incorrectly or the page has
        moved.
      </p>

      <Link
        href="/"
        className="text-gray-400 hover:text-accent transition-colors text-sm flex items-center gap-2 group w-fit"
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        back to home
      </Link>
    </div>
  )
}
