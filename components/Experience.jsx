"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

const experiences = [
  {
    title: "Associates of a website",
    organization: "TEDx Padjadjaran University - Website Division (UI/UX Designer)",
    year: "2026",
    image: "/journey/tedx.jpeg",
    description: "Contributed to the design of TEDxUniversitasPadjadjaran's digital platform by creating intuitive user interfaces and improving user experience. Worked closely with team members to transform ideas into accessible and visually engaging web experiences.",
  },
  {
    title: "Department External Relations Staff at HIMATIF",
    organization: "HIMATIF UNPAD",
    year: "2024-2025",
    image: "/journey/hubeks.jpeg",
    description: "Established and maintained relationships with external organizations, communities, and partners to support departmental programs. Contributed to collaboration initiatives, networking opportunities, and partnership development for student activities.",
  },
  {
    title: "Facilitator Staff - PRABU Universitas Padjadjaran",
    organization: "Adaptive Scheduling for Medical Students",
    year: "2024",
    image: "/journey/prbu.jpg",
    description: "Assisted new students throughout the university orientation program by providing guidance, facilitating group activities, and fostering an inclusive and supportive learning environment during the transition to university life.",
  },
  {
    title: "Head of Public Relation Division - IFest 2024",
    organization: "IFest UNPAD",
    year: "2024",
    image: "/journey/ifest.jpg",
    description: "Led the Public Relations Division in managing external communications, partnerships, and promotional strategies. Coordinated team members, built relationships with sponsors and media partners, and ensured effective dissemination of information to support the success of the event.",
  },
  {
    title: "Vice Head of Public Relation Division - IFest 2025",
    organization: "IFest UNPAD",
    year: "2025",
    image: "/journey/ifest.jpg",
    description: "Led the Public Relations Division in managing external communications, partnerships, and promotional strategies. Coordinated team members, built relationships with sponsors and media partners, and ensured effective dissemination of information to support the success of the event.",
  },
  {
    title: "Head of Comparative Study Committee yg UI 2025",
    organization: "HIMATIF UNPAD",
    year: "2025",
    image: "/journey/pacil.jpg",
    description: "Led the planning and execution of a comparative study program, coordinating communication with partner institutions and managing committee operations to ensure a productive and meaningful exchange of knowledge and organizational practices.",
  },
  {
    title: "Head of Comparative Study Committee 2025",
    organization: "HIMATIF UNPAD",
    year: "2025",
    image: "/journey/hmsi.jpg",
    description: "Led the planning and execution of a comparative study program, coordinating communication with partner institutions and managing committee operations to ensure a productive and meaningful exchange of knowledge and organizational practices.",
  },
  {
    title: "Decoration Staff - Bandros Gamaban Bandung 2025",
    organization: "Bandros Gamaban Bandung",
    year: "2025",
    image: "/journey/bandros.jpg",
    description: "Designed and prepared event decorations that aligned with the event theme and atmosphere. Collaborated with team members to create engaging visual environments and enhance participant experiences.",
  },
  {
    title: "Disciplinary Committee — Character Building Season HIMATIF 2024",
    organization: "HIMATIF UNPAD",
    year: "2024",
    image: "/journey/cbs.jpg",
    description: "Maintained event discipline and ensured participants complied with program guidelines and schedules. Assisted in creating a structured and conducive environment that supported the objectives of the character development program.",
  },
  {
    title: "Accommodation Division Staff — IFFD HIMATIF 2023",
    organization: "HIMATIF UNPAD",
    year: "2023",
    image: "/journey/akom.jpg",
    description: "Managed accommodation logistics and participant needs throughout the event. Coordinated lodging arrangements and ensured a comfortable and organized experience for guests and attendees.",
  },
  {
    title: "Fundraising Staff Instagram",
    organization: "HIMATIF UNPAD",
    year: "2024",
    image: "/journey/fundra.jpg",
    description: "Assisted in planning and executing fundraising initiatives to support event objectives. Coordinated fundraising activities, engaged with potential contributors, and contributed to achieving funding targets through effective communication and teamwork.",
  },
  {
    title: "Event Division Staff — Logyter",
    organization: "HIMATIF UNPAD",
    year: "2024",
    image: "/journey/logyter.jpg",
    description: "Served as the Master of Ceremony (MC) for community service activities, facilitating event proceedings, engaging participants, and ensuring smooth communication throughout the program. Contributed to creating an interactive and welcoming atmosphere while maintaining the flow of the event.",
  },
];

export default function Experience() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const containerRef = useRef(null);
  const directionRef = useRef(null); // "left" | "right" | null
  const intervalRef = useRef(null);

  // Jalankan interval sliding berdasarkan arah
  const startSliding = useCallback((direction) => {
    if (directionRef.current === direction) return; // sudah jalan ke arah ini
    directionRef.current = direction;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!swiperInstance) return;
      if (direction === "right") {
        swiperInstance.slideNext(500);
      } else {
        swiperInstance.slidePrev(500);
      }
    }, 600); // interval antar slide — sesuaikan selera
  }, [swiperInstance]);

  const stopSliding = useCallback(() => {
    directionRef.current = null;
    clearInterval(intervalRef.current);
  }, []);

  // Deteksi posisi cursor di dalam container
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const ratio = x / width; // 0 = ujung kiri, 1 = ujung kanan

    const deadZone = 0.2; // zona tengah 20% kiri dan kanan dari center = 60% tengah bebas

    if (ratio < 0.5 - deadZone) {
      startSliding("left");
    } else if (ratio > 0.5 + deadZone) {
      startSliding("right");
    } else {
      stopSliding();
    }
  }, [startSliding, stopSliding]);

  // Bersihkan interval saat cursor keluar
  const handleMouseLeave = useCallback(() => {
    stopSliding();
  }, [stopSliding]);

  // Cleanup saat unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section id="experience" className="experience-section">
      <p className="experience-label">EXPERIENCE</p>
      <h2 className="experience-title">My Journey</h2>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Swiper
          onSwiper={setSwiperInstance}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView={"auto"}
          grabCursor={true}
          loop={true}
          speed={500}
          spaceBetween={30}
          watchSlidesProgress={true}
          modules={[EffectCoverflow]}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 180,
            modifier: 1.5,
            scale: 0.9,
          }}
        >
          {experiences.map((exp, index) => (
            <SwiperSlide
              key={exp.title}
              style={{ width: "650px" }}
            >
              <div className="experience-card">
                <img src={exp.image} alt={exp.title} className="experience-image" />
                <div className="experience-content">
                  <h3>{exp.title}</h3>
                  <p className="experience-org">{exp.organization}</p>
                  <p className="experience-desc">{exp.description}</p>
                  <div className="experience-year">{exp.year}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}