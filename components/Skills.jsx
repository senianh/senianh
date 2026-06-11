'use client';

const skills = {
  Programming: ["Python", "Java", "JavaScript", "C++"],
  "AI / ML": ["TensorFlow", "Keras", "Scikit-Learn", "XGBoost", "LSTM"],
  Data: ["Pandas", "NumPy", "Power BI", "SQL"],
  Web: ["React", "Tailwind", "Node.js", "Supabase"],
};

export default function Skills() {
  return (
    <section id="skills" style={{ background: "#0c0c0c", padding: "120px 80px" }}>
      <p style={{ color: "#ff5c8d", letterSpacing: "0.2em", marginBottom: 16, fontSize: "0.8rem" }}>
        SKILLS
      </p>

      <h2 style={{
        fontSize: "3rem",
        fontFamily: "'Cormorant Garamond', serif",
        color: "white",
        marginBottom: 60,
      }}>
        What I Work With
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 40,
      }}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 style={{ color: "#ff5c8d", marginBottom: 16, fontSize: "0.85rem", letterSpacing: "0.1em" }}>
              {category.toUpperCase()}
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {items.map((item) => (
                <span
                  key={item}
                  style={{
                    border: "1px solid #333",
                    padding: "6px 14px",
                    fontSize: "0.85rem",
                    color: "#bbb",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.borderColor = "#ff5c8d")}
                  onMouseLeave={(e) => (e.target.style.borderColor = "#333")}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
