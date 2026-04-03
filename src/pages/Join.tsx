import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
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
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#010218",
          color: "#FFF7EB",
          paddingTop: "120px",
          paddingBottom: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "80px", marginBottom: "24px" }}>🔥</div>
          <h1
            style={{
              fontSize: "48px",
              fontFamily: "Aleo, serif",
              fontWeight: "bold",
              color: "white",
              marginBottom: "24px",
              margin: 0,
            }}
          >
            You're in!
          </h1>
          <p
            style={{ fontSize: "18px", color: "#FFF7EB", marginBottom: "40px", lineHeight: "1.6" }}
          >
            Welcome to the Bitcamp alumni network. We'll review your profile and reach out soon.
          </p>
          <Button onClick={() => setStatus("idle")} size="lg">
            Submit another entry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#010218",
        color: "#FFF7EB",
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      {/* Hero */}
      <section style={{ paddingTop: 0, paddingBottom: "32px" }}>
        <div
          style={{
            maxWidth: "1280px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontFamily: "Aleo, serif",
              fontWeight: "bold",
              color: "white",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Join Bitcamp Alumni
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#FFF7EB",
              margin: 0,
              marginBottom: "32px",
              lineHeight: "1.5",
            }}
          >
            Add yourself to our community. Help us keep the Bitcamp spirit alive.
          </p>
          <div style={{ height: "1px", backgroundColor: "rgba(255, 111, 63, 0.3)" }}></div>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "16px", paddingBottom: "64px" }}>
        <div
          style={{
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#1A2E33",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255, 111, 63, 0.2)",
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Honeypot — hidden from real users, bots fill it in */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: "none" }}
                {...register("website_url")}
              />

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "8px",
                  }}
                >
                  Full Name
                </label>
                <input
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#010218",
                    border: "2px solid #1a2e33",
                    color: "#FFF7EB",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6F3F";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1a2e33";
                  }}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p style={{ color: "#FF6F3F", fontSize: "12px", marginTop: "4px", margin: 0 }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "8px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#010218",
                    border: "2px solid #1a2e33",
                    color: "#FFF7EB",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6F3F";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1a2e33";
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p style={{ color: "#FF6F3F", fontSize: "12px", marginTop: "4px", margin: 0 }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "12px",
                  }}
                >
                  Year(s) Attended *
                </label>
                <div
                  style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}
                >
                  {[2014, 2016, 2018, 2019, 2020, 2022, 2024, 2025].map((y) => (
                    <label
                      key={y}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#FFF7EB",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={y}
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          accentColor: "#FF6F3F",
                        }}
                        {...register("year", {
                          validate: (value) =>
                            (value && value.length > 0) || "Select at least one year",
                        })}
                      />
                      {y}
                    </label>
                  ))}
                </div>
                {errors.year && (
                  <p style={{ color: "#FF6F3F", fontSize: "12px", marginTop: "8px", margin: 0 }}>
                    {errors.year.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "8px",
                  }}
                >
                  Role
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#010218",
                    border: "2px solid #1a2e33",
                    color: "#FFF7EB",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6F3F";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1a2e33";
                  }}
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="">Select a role</option>
                  <option value="Hacker">Hacker</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Sponsor">Sponsor</option>
                  <option value="Staff">Staff</option>
                  <option value="Other">Other</option>
                </select>
                {errors.role && (
                  <p style={{ color: "#FF6F3F", fontSize: "12px", marginTop: "4px", margin: 0 }}>
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "8px",
                  }}
                >
                  School / Organization (optional)
                </label>
                <input
                  placeholder="University of Maryland"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#010218",
                    border: "2px solid #1a2e33",
                    color: "#FFF7EB",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6F3F";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1a2e33";
                  }}
                  {...register("school")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "8px",
                  }}
                >
                  What did you build? (optional)
                </label>
                <input
                  placeholder="Tell us about your project or role"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#010218",
                    border: "2px solid #1a2e33",
                    color: "#FFF7EB",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6F3F";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1a2e33";
                  }}
                  {...register("what_i_did")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "8px",
                  }}
                >
                  LinkedIn (optional)
                </label>
                <input
                  placeholder="https://linkedin.com/in/..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#010218",
                    border: "2px solid #1a2e33",
                    color: "#FFF7EB",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6F3F";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1a2e33";
                  }}
                  {...register("linkedin")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFF7EB",
                    marginBottom: "8px",
                  }}
                >
                  GitHub (optional)
                </label>
                <input
                  placeholder="https://github.com/..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#010218",
                    border: "2px solid #1a2e33",
                    color: "#FFF7EB",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF6F3F";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#1a2e33";
                  }}
                  {...register("github")}
                />
              </div>

              {status === "error" && (
                <div
                  style={{
                    backgroundColor: "#1A2E33",
                    border: "2px solid #FF6F3F",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    color: "#FF6F3F",
                    fontSize: "14px",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                style={{ width: "100%" }}
              >
                {status === "loading" ? "Submitting…" : "Join the Alumni"}
              </Button>

              <p style={{ color: "#A7A7A7", fontSize: "12px", textAlign: "center", margin: 0 }}>
                Your info is saved to a private spreadsheet. We'll never share it without
                permission.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
