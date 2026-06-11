'use client';

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const pawPrints = [
  { top: 80, left: 80, rotate: -20 },
  { top: 50, left: 140, rotate: 15 },
  { top: 85, left: 200, rotate: -15 },
  { top: 55, left: 260, rotate: 20 },
  { top: 105, left: 320, rotate: -15 },
  { top: 70, left: 380, rotate: 15 },
  { top: 130, left: 440, rotate: -20 },
  { top: 95, left: 500, rotate: 20 },
  { top: 160, left: 560, rotate: -15 },
  { top: 125, left: 620, rotate: 15 },
  { top: 195, left: 680, rotate: -20 },
  { top: 160, left: 740, rotate: 20 },
  { top: 235, left: 800, rotate: -15 },
  { top: 200, left: 830, rotate: 15 },
];

export default function About() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [visiblePaws, setVisiblePaws] = useState(0);
  const [showWalkCat, setShowWalkCat] = useState(false);
  const [showSitCat, setShowSitCat] = useState(false);

  const startAnimation = () => {
    setVisiblePaws(0);
    setShowWalkCat(false);
    setShowSitCat(false);

    let pawCount = 0;
    const pawTimer = setInterval(() => {
      pawCount++;
      setVisiblePaws(pawCount);

      if (pawCount >= pawPrints.length) {
        clearInterval(pawTimer);
        setTimeout(() => {
          setShowWalkCat(true);
          setTimeout(() => {
            setShowWalkCat(false);
            setShowSitCat(true);
          }, 4000);
        }, 1000);
      }
    }, 400);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    startAnimation();
  }, [started]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: "relative",
        background: "#f5f2eb",
        color: "#111",
        padding: "120px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* JEJAK KAKI */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          width: "100%",
          height: 260,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {pawPrints.slice(0, visiblePaws).map((paw, index) => (
          <Image
            key={index}
            src="/assets/paw.png"
            alt=""
            width={20}
            height={20}
            className="paw"
            style={{
              position: "absolute",
              top: paw.top,
              left: paw.left,
              transform: `rotate(${paw.rotate}deg)`,
              animationDelay: `${index * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* TEXT */}
      <div>
        <p style={{ color: "#ff5c8d", letterSpacing: "0.2em", marginBottom: 16, fontSize: "0.8rem" }}>
          ABOUT ME
        </p>

        <h2 style={{
          fontSize: "3rem",
          fontFamily: "'Cormorant Garamond', serif",
          marginBottom: 24,
          lineHeight: 1.1,
        }}>
          Profile
        </h2>

        <blockquote style={{
          borderLeft: "2px solid #ff5c8d",
          paddingLeft: 20,
          color: "#555",
          fontStyle: "italic",
          marginBottom: 32,
        }}>
          "Designing life like debugging code."
        </blockquote>

        <p style={{ color: "#555", lineHeight: 2, maxWidth: 600 }}>
          Seseorang yang berpikir positif, terbuka terhadap ide-ide baru, dan
          senang bekerja dalam tim. Memiliki rasa ingin tahu yang besar dan
          tidak ragu mencoba hal-hal baru, terutama dalam proyek kolaboratif
          yang menantang. Terbiasa mendengarkan, memberi masukan, dan
          beradaptasi dengan berbagai gaya kerja rekan satu tim.
        </p>
      </div>

      {/* FOTO */}
      <div style={{ position: "relative" }}>
        <Image
          src="/assets/foto.png"
          alt="Senia Nur Hasanah"
          width={600}
          height={500}
          style={{ width: "100%", height: 500, objectFit: "cover", objectPosition: "top", display: "block" }}
        />

        <div style={{
          position: "absolute",
          bottom: -16,
          right: -16,
          width: "100%",
          height: "100%",
          border: "2px solid #ff5c8d",
          zIndex: -1,
        }} />
      </div>

      {/* KUCING BERJALAN */}
      {showWalkCat && (
        <Image
          src="/assets/catwalk.png"
          alt=""
          width={110}
          height={110}
          className={`cat-walk ${showWalkCat ? "active" : ""}`}
        />
      )}
      {showSitCat && (
        <Image
          src="/assets/catsit.png"
          alt="Cat"
          width={110}
          height={110}
          className="cat-sit"
          onClick={startAnimation}
          style={{ cursor: "pointer" }}
        />
      )}
    </section>
  );
}
