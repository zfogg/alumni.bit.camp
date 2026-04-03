export const About: React.FC = () => {
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
            About Bitcamp Alumni
          </h1>
          <p style={{ fontSize: "12px", color: "#FF6F3F", margin: 0, marginBottom: "32px" }}>
            Why we exist · What Bitcamp is · Why this community matters
          </p>
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(255, 111, 63, 0.3)",
              marginBottom: "32px",
            }}
          ></div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "16px", paddingBottom: "128px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "48px" }}>
            {/* Left Column - Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontFamily: "Aleo, serif",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  What is Bitcamp?
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#FFF7EB",
                    lineHeight: "1.6",
                    marginBottom: "12px",
                    margin: 0,
                  }}
                >
                  Bitcamp is the University of Maryland's premier hackathon, founded in 2014. Every
                  year, 1,400+ students gather for 36 hours of building, learning, and connecting —
                  making it one of the largest collegiate hackathons on the East Coast.
                </p>
                <p style={{ fontSize: "16px", color: "#FFF7EB", lineHeight: "1.6", margin: 0 }}>
                  The name combines two things every hacker loves: bits (the language of computers)
                  and camp (the spirit of community). A campfire where ideas catch fire.
                </p>
              </div>

              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontFamily: "Aleo, serif",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  Why does this alumni group exist?
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#FFF7EB",
                    lineHeight: "1.6",
                    marginBottom: "12px",
                    margin: 0,
                  }}
                >
                  Bitcamp has changed thousands of lives. Friendships formed over late-night
                  debugging sessions. Startups born from hackathon projects. Careers shaped by a
                  weekend of creative pressure and community support.
                </p>
                <p style={{ fontSize: "16px", color: "#FFF7EB", lineHeight: "1.6", margin: 0 }}>
                  This alumni network exists to keep those connections alive — and to give back to
                  the next generation of Bitcamp hackers through mentorship, prizes, and memory.
                </p>
              </div>

              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontFamily: "Aleo, serif",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  Who can join?
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#FFF7EB",
                    lineHeight: "1.6",
                    marginBottom: "12px",
                    margin: 0,
                  }}
                >
                  Anyone who has ever been part of Bitcamp is welcome:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { color: "#66BB6A", text: "Hacker — you built something here" },
                    { color: "#FF6F3F", text: "Organizer — you made it happen" },
                    { color: "#FF6F3F", text: "Sponsor — you made it possible" },
                    { color: "#9C27B0", text: "Event staff — you kept it running" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "16px",
                        color: "#FFF7EB",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: item.color,
                          display: "inline-block",
                        }}
                      ></span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { num: "11", label: "Years running" },
                { num: "1,400+", label: "Hackers per year" },
                { num: "36h", label: "Of building" },
                { num: "100s", label: "Of projects" },
                { num: "~15k", label: "Alumni total" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#1A2E33",
                    borderRadius: "12px",
                    padding: "24px",
                    border: "1px solid rgba(255, 111, 63, 0.2)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: "bold",
                      color: "#FF6F3F",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div style={{ fontSize: "14px", color: "#FFF7EB" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginTop: "80px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontFamily: "Aleo, serif",
                fontWeight: "bold",
                color: "white",
                marginBottom: "32px",
                margin: 0,
              }}
            >
              Bitcamp through the years
            </h2>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  height: "4px",
                  backgroundColor: "rgba(255, 111, 63, 0.2)",
                  position: "absolute",
                  top: "12px",
                  left: 0,
                  right: 0,
                }}
              ></div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "16px",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                {[
                  { year: 2014, label: "First camp" },
                  { year: 2016, label: "Growing" },
                  { year: 2018, label: "1k hackers" },
                  { year: 2019, label: "Frontier" },
                  { year: 2020, label: "Remote" },
                  { year: 2022, label: "Comeback" },
                  { year: 2024, label: "Journey" },
                  { year: 2026, label: "Unknown" },
                ].map((item) => (
                  <div key={item.year} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#FF6F3F",
                        borderRadius: "50%",
                        margin: "0 auto 12px",
                        border: "4px solid #010218",
                      }}
                    ></div>
                    <div style={{ fontSize: "14px", color: "#FFF7EB", fontWeight: "600" }}>
                      {item.year}
                    </div>
                    <div style={{ fontSize: "12px", color: "#A7A7A7" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
