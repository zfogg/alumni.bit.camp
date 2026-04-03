import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "120px",
          fontFamily: "Aleo, serif",
          fontWeight: "bold",
          color: "#FF6F3F",
          marginBottom: "16px",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: "48px",
          fontFamily: "Aleo, serif",
          fontWeight: "bold",
          color: "white",
          marginBottom: "16px",
        }}
      >
        Page Not Found
      </h1>
      <p style={{ fontSize: "18px", color: "#FFF7EB", marginBottom: "32px", lineHeight: "1.6" }}>
        Looks like this hack doesn't exist. Let's get you back on track.
      </p>
      <Button size="lg" as={Link} to="/">
        Return Home
      </Button>
    </div>
  );
};
