import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  if (!installEvent || dismissed) return null

  const handleInstall = async () => {
    await installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-md items-center gap-3 rounded-lg bg-pink-600 px-4 py-3 text-white shadow-xl">
      <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="flex-1 text-sm font-medium">Install Lorvelle for a faster shopping experience.</p>
      <button type="button" onClick={handleInstall} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-pink-700 hover:bg-pink-50">
        Install
      </button>
      <button type="button" onClick={() => setDismissed(true)} className="rounded-md p-1 hover:bg-pink-700" aria-label="Dismiss install prompt">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export default InstallPrompt
