import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-space text-cream pt-20 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="text-9xl font-bold text-orange mb-4">404</div>
        <h1 className="text-5xl font-display font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-xl text-cream mb-8">
          Looks like this hack doesn't exist. Let's get you back on track.
        </p>
        <Button size="lg" as={Link} to="/">
          Return Home
        </Button>
      </div>
    </div>
  )
}
