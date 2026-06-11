'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activeName, setActiveName] = useState("senia");

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "70% 30%",
        position: "relative",
        overflow: "hidden",
        maxHeight: "100vh",
        background: "#0c0c0c",
      }}
    >
      {/* Background watermark text */}
      <div style={{
        position: "absolute",
        bottom: -40,
        left: 0,
        fontSize: "22vw",
        fontWeight: 700,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,0.04)",
        fontFamily: "'Cormorant Garamond', serif",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}>
        SNH
      </div>

      {/* LEFT — Teks */}
      <div
        className={`fade ${mounted ? "show" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 5rem",
          zIndex: 1,
        }}
      >
        <div style={{ width: 80, height: 1, background: "#ff5c8d", marginBottom: 32 }} />

        <p style={{
          color: "#ff5c8d",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 16,
          fontSize: "0.85rem",
        }}>
          Web Development • Front-End • UI/UX • AI Enthusiast
        </p>

        <h1
          style={{
            fontSize: "clamp(3.5rem, 7vw, 6rem)",
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          <span
            onMouseEnter={() => setActiveName("senia")}
            style={{
              color:
                activeName === "senia"
                  ? "white"
                  : "rgba(255,255,255,0.35)",
              transition: "0.3s",
              cursor: "pointer",
            }}
          >
            Senia
          </span>{" "}

          <span
            onMouseEnter={() => setActiveName("nur")}
            style={{
              color:
                activeName === "nur"
                  ? "white"
                  : "rgba(255,255,255,0.35)",
              transition: "0.3s",
              cursor: "pointer",
            }}
          >
            Nur
          </span>{" "}

          <span
            onMouseEnter={() => setActiveName("hasanah")}
            style={{
              color:
                activeName === "hasanah"
                  ? "white"
                  : "rgba(255,255,255,0.35)",
              transition: "0.3s",
              cursor: "pointer",
            }}
          >
            Hasanah
          </span>
        </h1>

        <p style={{ color: "#666", letterSpacing: "0.1em", marginBottom: 24 }}>
          140810230021
        </p>

        <p style={{ color: "#888", lineHeight: 1.8, maxWidth: 500, marginBottom: 40 }}>
          Mahasiswa Informatika Universitas Padjadjaran dengan minat pada
          Artificial Intelligence, Machine Learning, dan Web Development.
        </p>

        <div style={{ display: "flex", gap: 16 }}>
          <a
            href="#projects"
            style={{
              padding: "14px 32px",
              background: "white",
              color: "black",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#ff5c8d";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "black";
            }}
          >
            View Projects
          </a>

          <a
            href="#about"
            style={{
              padding: "14px 32px",
              border: "1px solid #333",
              color: "white",
              textDecoration: "none",
              fontSize: "0.9rem",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = "#ff5c8d")}
            onMouseLeave={(e) => (e.target.style.borderColor = "#333")}
          >
            About Me
          </a>
        </div>
      </div>

      {/* RIGHT — Foto */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(255,92,141,0.4), transparent)",
          zIndex: 2,
        }} />

        <Image
          src="/assets/foto.png"
          alt="Senia Nur Hasanah"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />

        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to top, #0c0c0c, transparent)",
          zIndex: 1,
        }} />
      </div>
    </section>
  );
}
