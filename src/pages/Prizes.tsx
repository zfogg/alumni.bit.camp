import { Card } from '../components/ui/Card'

export const Prizes: React.FC = () => {
  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">Prize Hall of Fame</h1>

        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <h2 className="text-2xl font-display font-bold text-orange mb-6">
                The Prize {i}
              </h2>
              <p className="text-cream mb-6">$500 cash prize for the best use of X technology</p>

              <div className="space-y-3">
                <div className="border-l-2 border-orange pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-semibold">2024 · Team Name</p>
                      <p className="text-cream">Amazing Project Description</p>
                    </div>
                    <span className="text-muted text-sm">Zach, Ali, Chen</span>
                  </div>
                </div>
                <div className="border-l-2 border-orange pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-semibold">2023 · Another Team</p>
                      <p className="text-cream">Previous winner with great project</p>
                    </div>
                    <span className="text-muted text-sm">Sarah, Mike</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
