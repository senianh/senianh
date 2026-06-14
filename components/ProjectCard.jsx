'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const images = project.images?.length ? project.images : [];
  const hasMultiple = images.length > 1;

  const nextImage = () => setImgIndex((i) => (i + 1) % images.length);
  const prevImage = () => setImgIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight" && hasMultiple) nextImage();
      if (e.key === "ArrowLeft" && hasMultiple) prevImage();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open, hasMultiple]);

  useEffect(() => {
    if (open) setImgIndex(0);
  }, [open]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", height: 340 }}
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
          height: 340,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
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

        <p
          style={{
            color: "#888",
            lineHeight: 1.7,
            marginBottom: 20,
            fontSize: "0.9rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
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
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          opacity: hovered ? 1 : 0,
          visibility: hovered ? "visible" : "hidden",
          transform: hovered ? "scale(1)" : "scale(0.97)",
          transition: "all 0.25s ease",
          zIndex: 5,
          boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 150,
            borderRadius: 6,
            overflow: "hidden",
            background: "#0c0c0c",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {images.length > 0 ? (
            <Image
              src={images[0]}
              alt={project.title}
              fill
              style={{
                objectFit: "cover",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.4s ease",
              }}
              sizes="400px"
            />
          ) : (
            <span style={{ fontSize: "2.5rem" }}>{project.icon}</span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: 6,
            color: "white",
            flexShrink: 0,
            flex: 1,
          }}
        >
          {project.title}
        </h3>

        {/* Detail - hidden on hover, only visible in modal popup */}
        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 10,
            maxHeight: 56,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid #333",
                padding: "3px 8px",
                fontSize: "0.7rem",
                color: "#bbb",
                borderRadius: 4,
                whiteSpace: "nowrap",
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
              flexShrink: 0,
              whiteSpace: "nowrap",
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
            padding: "20px",
            overflow: "hidden",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #2a2a2a",
              borderRadius: 16,
              width: "min(700px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              overflowX: "hidden",
              position: "relative",
              animation: "scaleIn 0.25s ease",
              boxSizing: "border-box",
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

            {/* Image slider */}
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
              {images.length > 0 ? (
                <Image
                  src={images[imgIndex]}
                  alt={`${project.title} - ${imgIndex + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="700px"
                />
              ) : (
                <span style={{ fontSize: "4rem" }}>{project.icon}</span>
              )}

              {hasMultiple && (
                <>
                  {/* Prev button */}
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: "1px solid #333",
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                    ‹
                  </button>

                  {/* Next button */}
                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: "1px solid #333",
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                    ›
                  </button>

                  {/* Dots */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 6,
                    }}
                  >
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          background: i === imgIndex ? "#ff5c8d" : "rgba(255,255,255,0.4)",
                          transition: "background 0.2s",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "28px 36px 40px" }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.9rem",
                  fontWeight: 600,
                  marginBottom: project.role ? 8 : 14,
                  color: "white",
                }}
              >
                {project.title}
              </h3>

              {project.role && (
                <p
                  style={{
                    color: "#ff5c8d",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    marginBottom: 14,
                  }}
                >
                  {project.role}
                </p>
              )}

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