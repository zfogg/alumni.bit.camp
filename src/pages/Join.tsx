import { useForm } from "react-hook-form";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { JoinFormData } from "../types";

export const Join: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormData>();

  const onSubmit = (data: JoinFormData) => {
    console.log("Join form data:", data);
    alert("Form submitted! (Mock)");
  };

  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">
          Join Bitcamp Alumni
        </h1>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
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

            <div>
              <label className="block text-sm font-semibold text-cream mb-2">
                Year(s) Attended
              </label>
              <input
                type="number"
                placeholder="2020"
                className="w-full px-4 py-2 rounded-card bg-space border-2 border-teal text-cream placeholder-muted focus:outline-none focus:border-orange"
                {...register("year", { required: "Year is required" })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cream mb-2">Role</label>
              <select
                className="w-full px-4 py-2 rounded-card bg-space border-2 border-teal text-cream focus:outline-none focus:border-orange"
                {...register("role", { required: "Role is required" })}
              >
                <option value="">Select a role</option>
                <option value="Hacker">Hacker</option>
                <option value="Organizer">Organizer</option>
                <option value="Sponsor">Sponsor</option>
                <option value="Staff">Staff</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Input
              label="School / Organization (optional)"
              placeholder="University of Maryland"
              {...register("school")}
            />

            <Input
              label="What did you build? (optional)"
              placeholder="Tell us about your project"
              {...register("what_i_did")}
            />

            <Input
              label="LinkedIn (optional)"
              placeholder="https://linkedin.com/in/..."
              {...register("linkedin")}
            />

            <Input
              label="GitHub (optional)"
              placeholder="https://github.com/..."
              {...register("github")}
            />

            <Button type="submit" size="lg" className="w-full">
              Join the Alumni
            </Button>

            <p className="text-muted text-sm text-center">
              Your info is saved to a private spreadsheet. We'll never share it without permission.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};
