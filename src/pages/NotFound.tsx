import { useNavigate } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-primary-light flex items-center justify-center">
            <FileQuestion size={40} className="text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-xl font-semibold text-text">Page not found</p>
          <p className="text-sm text-text-muted">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go back
          </Button>
          <Button onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
