import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { JoinFormData } from "../types";
import { submitJoinForm } from "../lib/api";

type Status = "idle" | "loading" | "success" | "error";

export const Join: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JoinFormData & { website_url?: string }>();

  const onSubmit = async (data: JoinFormData & { website_url?: string }) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitJoinForm(data);
      setStatus("success");
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-space text-cream pt-20 pb-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-7xl mb-6">🔥</div>
          <h1 className="text-5xl font-display font-bold text-white mb-6">You're in!</h1>
          <p className="text-xl text-cream mb-10 leading-relaxed">
            Welcome to the Bitcamp alumni network. We'll review your profile and reach out soon.
          </p>
          <Button onClick={() => setStatus("idle")} variant="secondary" size="lg">
            Submit another entry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">
          Join Bitcamp Alumni
        </h1>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot — hidden from real users, bots fill it in */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website_url")}
            />

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
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
              })}
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
              {errors.year && <p className="text-orange text-sm mt-1">{errors.year.message}</p>}
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
              {errors.role && <p className="text-orange text-sm mt-1">{errors.role.message}</p>}
            </div>

            <Input
              label="School / Organization (optional)"
              placeholder="University of Maryland"
              {...register("school")}
            />

            <Input
              label="What did you build? (optional)"
              placeholder="Tell us about your project or role"
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

            {status === "error" && (
              <div className="bg-teal border border-orange rounded-card px-4 py-3 text-orange text-sm">
                {errorMsg}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Submitting…" : "Join the Alumni"}
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
