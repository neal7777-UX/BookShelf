import { CheckCircle2 } from 'lucide-react'

interface ToastProps {
  message: string
  visible: boolean
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={
        `pointer-events-none fixed left-1/2 top-8 z-[60] -translate-x-1/2 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5 flex items-center gap-2 text-sm transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`
      }
      aria-live="polite"
    >
      <CheckCircle2 className="text-green-500" size={18} />
      <span className="text-gray-700">{message}</span>
    </div>
  )
}
