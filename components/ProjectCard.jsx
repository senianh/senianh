'use client';

export default function ProjectCard({ project }) {
  return (
    <div
      style={{
        background: "#111",
        padding: "2rem",
        border: "1px solid #222",
        transition: "all 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "#ff5c8d";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#222";
      }}
    >
      <div style={{ fontSize: "2rem", marginBottom: 16 }}>{project.icon}</div>

      <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 12, color: "white" }}>
        {project.title}
      </h3>

      <p style={{ color: "#888", lineHeight: 1.7, marginBottom: 20, fontSize: "0.9rem" }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: "1px solid #333",
              padding: "4px 10px",
              fontSize: "0.75rem",
              color: "#bbb",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
