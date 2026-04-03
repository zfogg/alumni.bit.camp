import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import type { SupportFormData } from "../types";
import { submitSupportForm } from "../lib/api";

type Status = "idle" | "loading" | "success" | "error";

const testimonials = [
  {
    quote:
      "Bitcamp changed my life. Supporting the next generation feels like the right thing to do.",
    author: "Sarah Chen",
    role: "Hacker '18, now at Google",
  },
  {
    quote: "Sponsoring a prize was my way of saying thanks to the organizers who believed in me.",
    author: "Marcus Williams",
    role: "Sponsor '21",
  },
  {
    quote: "100% going to Bitcamp means your impact is real and immediate.",
    author: "Alex Rodriguez",
    role: "Donor since 2022",
  },
];

export const Give: React.FC = () => {
  const [type, setType] = useState<"donate" | "sponsor">("donate");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData & { company_name?: string }>({
    defaultValues: { type: "donate" },
  });

  const onSubmit = async (data: SupportFormData & { company_name?: string }) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitSupportForm({ ...data, type });
      setStatus("success");
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const handleTypeChange = (newType: "donate" | "sponsor") => {
    setType(newType);
    setStatus("idle");
    setErrorMsg("");
  };

  if (status === "success") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#010218",
          color: "#FFF7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
        }}
      >
        <div style={{ maxWidth: "600px", textAlign: "center" }}>
          <div style={{ fontSize: "72px", marginBottom: "24px" }}>
            {type === "donate" ? "💰" : "🏆"}
          </div>
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
            {type === "donate" ? "Thank you!" : "Amazing!"}
          </h1>
          <p
            style={{ fontSize: "18px", color: "#FFF7EB", marginBottom: "40px", lineHeight: "1.6" }}
          >
            {type === "donate"
              ? "We've received your donation interest. We'll be in touch within 48 hours with next steps."
              : "Your prize sponsorship interest has been submitted. We'll reach out within 48 hours to get the details sorted."}
          </p>
          <Button onClick={() => setStatus("idle")} variant="secondary" size="lg">
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#010218", color: "#FFF7EB" }}>
      {/* Hero */}
      <section style={{ paddingTop: "120px", paddingBottom: "16px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            paddingLeft: "24px",
            paddingRight: "24px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontFamily: "Aleo, serif",
              fontWeight: "bold",
              color: "white",
              margin: 0,
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
          >
            You got something from Bitcamp.
            <br />
            Give something back.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#FFF7EB",
              maxWidth: "800px",
              margin: "0 auto 32px",
              lineHeight: "1.6",
            }}
          >
            Keeping Bitcamp free and growing. Every contribution funds prizes, food, and the next
            generation of builders.
          </p>
          <div
            style={{
              backgroundColor: "#1A2E33",
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "600px",
              margin: "0 auto 32px",
              border: "1px solid rgba(255, 111, 63, 0.2)",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                color: "#FF6F3F",
                fontFamily: "Aleo, serif",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              100% of donations go directly to Bitcamp.
            </p>
          </div>
          <div style={{ height: "1px", backgroundColor: "rgba(255, 111, 63, 0.3)" }}></div>
        </div>
      </section>

      {/* Donate Section */}
      <section style={{ padding: "32px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#1A2E33",
              borderRadius: "16px",
              padding: "32px",
              border: `2px solid ${type === "donate" ? "#FF6F3F" : "rgba(255, 111, 63, 0.2)"}`,
              cursor: "pointer",
              transition: "all 0.3s",
              transform: type === "donate" ? "scale(1.02)" : "scale(1)",
              opacity: type === "donate" ? 1 : 0.7,
            }}
            onClick={() => handleTypeChange("donate")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#FF6F3F";
            }}
            onMouseLeave={(e) => {
              if (type !== "donate") {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 111, 63, 0.2)";
              }
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontFamily: "Aleo, serif",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                Donate
              </h2>
              <span style={{ fontSize: "32px" }}>💰</span>
            </div>
            <p style={{ fontSize: "16px", color: "#FFF7EB", marginBottom: "16px", margin: 0 }}>
              Give any amount to support Bitcamp
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {["One-time or recurring", "100% goes to Bitcamp", "Direct impact on hackers"].map(
                (item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                      color: "white",
                      gap: "12px",
                    }}
                  >
                    <span style={{ color: "#FF6F3F", fontSize: "18px" }}>✓</span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section
        style={{
          padding: "32px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "80px",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#1A2E33",
              borderRadius: "16px",
              padding: "32px",
              border: `2px solid ${type === "sponsor" ? "#FF6F3F" : "rgba(255, 111, 63, 0.2)"}`,
              cursor: "pointer",
              transition: "all 0.3s",
              transform: type === "sponsor" ? "scale(1.02)" : "scale(1)",
              opacity: type === "sponsor" ? 1 : 0.7,
            }}
            onClick={() => handleTypeChange("sponsor")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#FF6F3F";
            }}
            onMouseLeave={(e) => {
              if (type !== "sponsor") {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 111, 63, 0.2)";
              }
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontFamily: "Aleo, serif",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                Sponsor a Prize
              </h2>
              <span style={{ fontSize: "32px" }}>🏆</span>
            </div>
            <p style={{ fontSize: "16px", color: "#FFF7EB", marginBottom: "16px", margin: 0 }}>
              Put your name on a prize at the next Bitcamp
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {[
                "Your criteria, your impact",
                "Winners remember you forever",
                "Build your legacy",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    color: "white",
                    gap: "12px",
                  }}
                >
                  <span style={{ color: "#FF6F3F", fontSize: "18px" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          padding: "32px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "80px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "20px",
              fontFamily: "Aleo, serif",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            Why alumni are giving back
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#1A2E33",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid rgba(255, 111, 63, 0.2)",
                }}
              >
                <p
                  style={{
                    color: "#FFF7EB",
                    marginBottom: "16px",
                    fontStyle: "italic",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  "{t.quote}"
                </p>
                <p
                  style={{
                    color: "#FF6F3F",
                    fontFamily: "Aleo, serif",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "4px",
                    margin: 0,
                  }}
                >
                  {t.author}
                </p>
                <p style={{ color: "#A7A7A7", fontSize: "14px", margin: 0 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        style={{
          padding: "32px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "128px",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#1A2E33",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255, 111, 63, 0.2)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontFamily: "Aleo, serif",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginBottom: "32px",
                margin: 0,
              }}
            >
              {type === "donate" ? "Start Your Donation" : "Become a Prize Sponsor"}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
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

              {type === "donate" && (
                <>
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
                      Donation Range
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        backgroundColor: "#010218",
                        border: "2px solid #FF6F3F",
                        color: "#FFF7EB",
                        fontFamily: "inherit",
                      }}
                      {...register("donation_range")}
                    >
                      <option value="unsure">Not sure yet</option>
                      <option value="<50">Less than $50</option>
                      <option value="50-200">$50–$200</option>
                      <option value="200-500">$200–$500</option>
                      <option value="500+">$500+</option>
                    </select>
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
                      Message (optional)
                    </label>
                    <textarea
                      placeholder="Anything you'd like to say to the Bitcamp team?"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        backgroundColor: "#010218",
                        border: "2px solid #FF6F3F",
                        color: "#FFF7EB",
                        fontFamily: "inherit",
                        minHeight: "100px",
                        resize: "vertical",
                      }}
                      rows={4}
                      {...register("message")}
                    />
                  </div>
                </>
              )}

              {type === "sponsor" && (
                <>
                  <Input
                    label="Prize Name *"
                    placeholder="e.g. The Zach Fogg Award for Most Creative Use of AI"
                    {...register("prize_name", {
                      required: type === "sponsor" ? "Prize name is required" : false,
                    })}
                    error={errors.prize_name?.message}
                  />
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
                      What will winners receive? *
                    </label>
                    <textarea
                      placeholder="Describe the prize: cash amount, merchandise, experience, mentorship, etc."
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        backgroundColor: "#010218",
                        border: "2px solid #FF6F3F",
                        color: "#FFF7EB",
                        fontFamily: "inherit",
                        minHeight: "100px",
                        resize: "vertical",
                      }}
                      rows={4}
                      {...register("prize_description", {
                        required:
                          type === "sponsor" ? "Please describe what winners will receive" : false,
                      })}
                    />
                    {errors.prize_description && (
                      <p style={{ color: "#FF6F3F", fontSize: "12px", marginTop: "8px" }}>
                        {errors.prize_description.message}
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
                      Prize criteria *
                    </label>
                    <textarea
                      placeholder="What kind of hack or achievement should win? (e.g., 'Most creative use of open-source libraries')"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        backgroundColor: "#010218",
                        border: "2px solid #FF6F3F",
                        color: "#FFF7EB",
                        fontFamily: "inherit",
                        minHeight: "100px",
                        resize: "vertical",
                      }}
                      rows={4}
                      {...register("prize_criteria", {
                        required:
                          type === "sponsor"
                            ? "Please describe what kind of hack should win"
                            : false,
                      })}
                    />
                    {errors.prize_criteria && (
                      <p style={{ color: "#FF6F3F", fontSize: "12px", marginTop: "8px" }}>
                        {errors.prize_criteria.message}
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
                      Preferred year
                    </label>
                    <select
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        backgroundColor: "#010218",
                        border: "2px solid #FF6F3F",
                        color: "#FFF7EB",
                        fontFamily: "inherit",
                      }}
                      {...register("preferred_year")}
                    >
                      <option value="unsure">Not sure yet</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                    </select>
                  </div>
                </>
              )}

              {status === "error" && (
                <div
                  style={{
                    backgroundColor: "#1A2E33",
                    border: "1px solid #FF6F3F",
                    borderRadius: "12px",
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
                className="w-full mt-8"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "Submitting…"
                  : type === "donate"
                    ? "Express Donation Interest"
                    : "Sponsor a Prize"}
              </Button>

              <p
                style={{
                  color: "#A7A7A7",
                  fontSize: "12px",
                  textAlign: "center",
                  borderTop: "1px solid #FF6F3F",
                  paddingTop: "16px",
                  margin: 0,
                }}
              >
                ✓ This form expresses interest only — no payment is collected here.
                <br />
                We'll be in touch within 48 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
