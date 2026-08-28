import { useToast } from '../../contexts/ToastContext'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export function Toast() {
  const { toasts, removeToast } = useToast()

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]
        const bgColor = colors[toast.type]

        return (
          <div
            key={toast.id}
            className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
