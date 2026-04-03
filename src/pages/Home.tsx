import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Sparkle } from '../components/ui/Sparkle'

export const Home: React.FC = () => {
  const alumni = [
    { initial: 'Z', name: 'Zach F.', role: 'Hacker', year: "'14", color: 'bg-orange' },
    { initial: 'P', name: 'Priya M.', role: 'Organizer', year: "'19", color: 'bg-blue-500' },
    { initial: 'A', name: 'Alex K.', role: 'Sponsor', year: "'22", color: 'bg-teal' },
    { initial: 'J', name: 'Jordan L.', role: 'Staff', year: "'23", color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-space text-cream pb-20">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-32 text-center mb-8">
        <div className="flex justify-center mb-12 gap-6">
          <Sparkle size={24} />
          <Sparkle size={24} />
        </div>
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-bold text-white mb-8">
          Bitcamp Alumni
        </h1>
        <p className="text-2xl text-cream mb-16">
          Eleven years of builders. One community.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" as={Link} to="/join">JOIN NOW</Button>
          <Button size="lg" variant="ghost" as={Link} to="/about">LEARN MORE</Button>
        </div>
      </section>

      {/* Stats Row */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="text-6xl font-bold text-orange mb-3">11</div>
          <div className="text-cream text-sm">Years of Bitcamp</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-orange mb-3">1,400+</div>
          <div className="text-cream text-sm">Hackers per year</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-orange mb-3">100+</div>
          <div className="text-cream text-sm">Alumni connected</div>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-orange mb-3">∞</div>
          <div className="text-cream text-sm">Ideas spawned</div>
        </div>
      </section>

      {/* Join CTA Card */}
      <section className="max-w-3xl mx-auto px-6 py-16 mb-20">
        <div className="rounded-card p-12 text-center" style={{ backgroundColor: '#1A2E33' }}>
          <h2 className="text-4xl font-display font-bold text-white mb-4">Are you a Bitcamp alum?</h2>
          <p className="text-cream mb-10">Whether you hacked, organized, sponsored, or staffed — this community is for you.<br />Share your info and we'll add you to the alumni network.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <input type="email" placeholder="Your email address" className="sm:flex-1 px-4 py-3 rounded-card bg-space border border-teal text-cream placeholder-muted focus:outline-none focus:border-orange" />
            <input type="number" placeholder="Year attended" className="sm:flex-1 px-4 py-3 rounded-card bg-space border border-teal text-cream placeholder-muted focus:outline-none focus:border-orange" />
            <Button as={Link} to="/join">JOIN</Button>
          </div>
          <p className="text-muted text-xs mb-4">Your info is saved to a private spreadsheet. We'll never share it.</p>
          <p className="text-cream text-sm">
            or{' '}
            <a href={import.meta.env.VITE_DISCORD_INVITE_URL || 'https://discord.gg/bitcamp'} target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
              Join our Discord →
            </a>
          </p>
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-display font-bold text-white mb-2 text-center">Featured Alumni</h2>
        <p className="text-muted text-center mb-12">A few of the people who've made Bitcamp what it is.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {alumni.map((person) => (
            <Card key={person.initial} className="text-center p-6">
              <div className={`w-20 h-20 ${person.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white">{person.initial}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">{person.name}</h3>
              <p className="text-orange text-sm font-semibold mb-1">{person.role}</p>
              <p className="text-muted text-xs">Bitcamp {person.year}</p>
              <p className="text-cream text-xs mt-3">"Built something amazing at Bitcamp and never looked back."</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
