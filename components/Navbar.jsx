'use client';

export default function Navbar() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 48px",
        background: "rgba(12,12,12,0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ fontSize: "1rem", letterSpacing: "0.2em", fontWeight: 700 }}>
        SNH
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        {["home", "about", "skills", "projects", "experience"].map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(link);
            }}
            style={{
              color: "#aaa",
              textDecoration: "none",
              textTransform: "capitalize",
              transition: "color 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.color = "white")}
            onMouseLeave={(e) => (e.target.style.color = "#aaa")}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
