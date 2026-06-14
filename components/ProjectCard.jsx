'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      {/* CARD */}
      <div
        style={{
          background: "#111",
          padding: "2rem",
          border: "1px solid #222",
          transition: "all 0.3s",
          cursor: "default",
          opacity: hovered ? 0 : 1,
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

      {/* HOVER POPUP (click untuk popup lebih besar) */}
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "absolute",
          inset: 0,
          background: "#161616",
          border: "1px solid #ff5c8d",
          borderRadius: 8,
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          opacity: hovered ? 1 : 0,
          visibility: hovered ? "visible" : "hidden",
          transform: hovered ? "scale(1)" : "scale(0.97)",
          transition: "all 0.25s ease",
          zIndex: 5,
          boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
          cursor: "pointer",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 140,
            borderRadius: 6,
            overflow: "hidden",
            background: "#0c0c0c",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="400px"
            />
          ) : (
            <span style={{ fontSize: "2.5rem" }}>{project.icon}</span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            marginBottom: 8,
            color: "white",
          }}
        >
          {project.title}
        </h3>

        {/* Detail */}
        <p
          style={{
            color: "#999",
            lineHeight: 1.6,
            marginBottom: 12,
            fontSize: "0.8rem",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid #333",
                padding: "3px 8px",
                fontSize: "0.7rem",
                color: "#bbb",
                borderRadius: 4,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              alignSelf: "flex-start",
              color: "#ff5c8d",
              border: "1px solid #ff5c8d",
              padding: "8px 18px",
              borderRadius: 6,
              fontSize: "0.8rem",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff5c8d";
              e.currentTarget.style.color = "#111";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#ff5c8d";
            }}
          >
            Lihat Project →
          </a>
        )}
      </div>

      {/* POPUP / MODAL BESAR */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "40px 20px",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #2a2a2a",
              borderRadius: 16,
              width: "min(700px, 95vw)",
              maxHeight: "85vh",
              overflowY: "auto",
              position: "relative",
              animation: "scaleIn 0.25s ease",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #333",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ff5c8d";
                e.currentTarget.style.color = "#ff5c8d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.color = "white";
              }}
            >
              ✕
            </button>

            {/* Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "min(320px, 45vh)",
                background: "#0c0c0c",
                borderRadius: "16px 16px 0 0",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="700px"
                />
              ) : (
                <span style={{ fontSize: "4rem" }}>{project.icon}</span>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "28px 36px 40px" }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.9rem",
                  fontWeight: 600,
                  marginBottom: 14,
                  color: "white",
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  color: "#aaa",
                  lineHeight: 1.8,
                  marginBottom: 24,
                  fontSize: "0.95rem",
                }}
              >
                {project.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: "1px solid #333",
                      padding: "6px 14px",
                      fontSize: "0.8rem",
                      color: "#bbb",
                      borderRadius: 6,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#ff5c8d",
                    border: "1px solid #ff5c8d",
                    padding: "12px 28px",
                    borderRadius: 6,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ff5c8d";
                    e.currentTarget.style.color = "#111";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#ff5c8d";
                  }}
                >
                  Lihat Project →
                </a>
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}