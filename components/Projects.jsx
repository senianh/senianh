import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" style={{ background: "#0c0c0c", padding: "120px 80px" }}>
      <p style={{ color: "#ff5c8d", letterSpacing: "0.2em", marginBottom: 16, fontSize: "0.8rem" }}>
        MY PROJECT
      </p>

      <h2 style={{
        fontSize: "3rem",
        fontFamily: "'Cormorant Garamond', serif",
        color: "white",
        marginBottom: 60,
      }}>
        Featured Projects
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
      }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
