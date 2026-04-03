import { useForm } from "react-hook-form";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import type { ContactFormData } from "../types";

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();
  const discordUrl = import.meta.env.VITE_DISCORD_INVITE_URL || "https://discord.gg/bitcamp";

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form data:", data);
    alert("Message sent! (Mock)");
  };

  const contactMethods = [
    {
      icon: "✉️",
      title: "Email",
      description: "Reach us directly",
      action: "alumni@bit.camp",
      href: "mailto:alumni@bit.camp",
    },
    {
      icon: "💬",
      title: "Discord",
      description: "Chat with the community",
      action: "Join our server →",
      href: discordUrl,
      external: true,
    },
    {
      icon: "🎁",
      title: "Want to Sponsor?",
      description: "Contribute & give back",
      action: "Sponsorship Info",
      href: "/give",
    },
    {
      icon: "🔥",
      title: "Main Event",
      description: "Learn about Bitcamp",
      action: "bit.camp →",
      href: "https://bit.camp",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-space text-cream" style={{ paddingBottom: 0 }}>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 text-center" style={{ marginTop: "100px" }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-cream max-w-2xl mx-auto leading-relaxed">
            Have a question? Want to sponsor? Just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {contactMethods.map((method, idx) => (
              <a
                key={idx}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="block group"
              >
                <Card className="h-full cursor-pointer transition-all transform hover:scale-105 hover:ring-2 hover:ring-orange">
                  <div className="flex items-start">
                    <div className="w-full">
                      <div className="text-5xl mb-4">{method.icon}</div>
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {method.title}
                      </h3>
                      <p className="text-muted text-sm mb-4">{method.description}</p>
                      <p className="text-orange font-semibold group-hover:text-white transition text-base">
                        {method.action}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <h2 className="text-4xl font-display font-bold text-white mb-2 text-center">
              Send us a Message
            </h2>
            <p className="text-cream text-center mb-10">
              We typically respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  placeholder="Your name"
                  {...register("name", { required: "Name is required" })}
                  error={errors.name?.message}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email", { required: "Email is required" })}
                  error={errors.email?.message}
                />
              </div>

              <Input
                label="Subject"
                placeholder="What's this about?"
                {...register("subject")}
              />

              <div>
                <label className="block text-sm font-semibold text-cream mb-3">Message *</label>
                <textarea
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 rounded-card bg-space border-2 border-orange text-cream placeholder-muted font-body focus:outline-none focus:border-white transition"
                  rows={6}
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="text-orange text-sm mt-2">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-8">
                Send Message
              </Button>

              <p className="text-muted text-sm text-center border-t border-orange pt-4">
                ✓ We respect your privacy. We'll never share your information.
              </p>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};
