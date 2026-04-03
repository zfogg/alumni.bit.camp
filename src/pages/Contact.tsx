import { useForm } from 'react-hook-form'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import type { ContactFormData } from '../types'

export const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>()
  const discordUrl = import.meta.env.VITE_DISCORD_INVITE_URL || 'https://discord.gg/bitcamp'

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form data:', data)
    alert('Message sent! (Mock)')
  }

  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-4">Email</h3>
            <p className="text-cream">
              <a href="mailto:alumni@bit.camp" className="text-orange hover:underline">
                alumni@bit.camp
              </a>
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-4">Discord</h3>
            <p className="text-cream">
              <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                Join our server →
              </a>
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-4">Want to Sponsor?</h3>
            <p className="text-cream">
              Head over to our{' '}
              <a href="/give" className="text-orange hover:underline">
                Give Back page
              </a>
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-4">Main Event</h3>
            <p className="text-cream">
              <a href="https://bit.camp" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                bit.camp
              </a>
            </p>
          </Card>
        </div>

        <Card>
          <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">Send us a Message</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Name"
              placeholder="Your name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />

            <Input
              label="Subject"
              placeholder="What's this about?"
              {...register('subject')}
            />

            <div>
              <label className="block text-sm font-semibold text-cream mb-2">Message</label>
              <textarea
                placeholder="Tell us what's on your mind..."
                className="w-full px-4 py-2 rounded-card bg-space border-2 border-teal text-cream placeholder-muted focus:outline-none focus:border-orange"
                rows={5}
                {...register('message', { required: 'Message is required' })}
              />
              {errors.message && <p className="text-orange text-sm mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
