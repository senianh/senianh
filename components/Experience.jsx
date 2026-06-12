"use client";

import { useRef, useCallback, useEffect, useState } from "react";
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
    certificate: "/certificate/ifest2025.jpg",
    description:
      "Contributed to the design of TEDxUniversitasPadjadjaran's digital platform by creating intuitive user interfaces and improving user experience. Worked closely with team members to transform ideas into accessible and visually engaging web experiences.",
  },
  {
    title: "Department External Relations Staff at HIMATIF",
    organization: "HIMATIF UNPAD",
    year: "2024-2025",
    image: "/journey/himatif.png",
    certificate: "/certificate/himatif.png",
    description:
      "Established and maintained relationships with external organizations, communities, and partners to support departmental programs. Contributed to collaboration initiatives, networking opportunities, and partnership development for student activities.",
  },
  {
    title: "Facilitator Staff - PRABU Universitas Padjadjaran",
    organization: "Adaptive Scheduling for Medical Students",
    year: "2024",
    image: "/journey/prabu.png",
    certificate: "/certificate/prabu.png",
    description:
      "Assisted new students throughout the university orientation program by providing guidance, facilitating group activities, and fostering an inclusive and supportive learning environment during the transition to university life.",
  },
  {
    title: "Head of Public Relation Division - IFest 2024",
    organization: "IFest UNPAD",
    year: "2024",
    image: "/journey/ifest1.jpg",
    certificate: "/certificate/ifest24.png",
    description:
      "Led the Public Relations Division in managing external communications, partnerships, and promotional strategies. Coordinated team members, built relationships with sponsors and media partners, and ensured effective dissemination of information to support the success of the event.",
  },
  {
    title: "Vice Head of Public Relation Division - IFest 2025",
    organization: "IFest UNPAD",
    year: "2025",
    image: "/journey/ifest2.jpg",
    certificate: "/certificate/ifest2025.jpg",
    description:
      "Led the Public Relations Division in managing external communications, partnerships, and promotional strategies. Coordinated team members, built relationships with sponsors and media partners, and ensured effective dissemination of information to support the success of the event.",
  },
  {
    title: "Head of Comparative Study Committee yg UI 2025",
    organization: "HIMATIF UNPAD",
    year: "2025",
    image: "/journey/pacil.jpg",
    certificate: "/certificate/ifest2025.jpg",
    description:
      "Led the planning and execution of a comparative study program, coordinating communication with partner institutions and managing committee operations to ensure a productive and meaningful exchange of knowledge and organizational practices.",
  },
  {
    title: "Head of Comparative Study Committee 2025",
    organization: "HIMATIF UNPAD",
    year: "2025",
    image: "/journey/hmsi.jpg",
    certificate: "/certificate/ifest2025.jpg",
    description:
      "Led the planning and execution of a comparative study program, coordinating communication with partner institutions and managing committee operations to ensure a productive and meaningful exchange of knowledge and organizational practices.",
  },
  {
    title: "Decoration Staff - Bandros Gamaban Bandung 2025",
    organization: "Bandros Gamaban Bandung",
    year: "2025",
    image: "/journey/bandros.png",
    certificate: "/certificate/bandros.png",
    description:
      "Designed and prepared event decorations that aligned with the event theme and atmosphere. Collaborated with team members to create engaging visual environments and enhance participant experiences.",
  },
  {
    title: "Disciplinary Committee — Character Building Season HIMATIF 2024",
    organization: "HIMATIF UNPAD",
    year: "2024",
    image: "/journey/cbs.png",
    certificate: "/certificate/cbs.png",
    description:
      "Maintained event discipline and ensured participants complied with program guidelines and schedules. Assisted in creating a structured and conducive environment that supported the objectives of the character development program.",
  },
  {
    title: "Decoration Staff — IFFD HIMATIF 2024",
    organization: "HIMATIF UNPAD",
    year: "2024",
    image: "/journey/dekor.png",
    certificate: "/certificate/ifest2025.jpg",
    description:
      "Designed and prepared event decorations that aligned with the event theme and atmosphere. Collaborated with team members to create engaging visual environments and enhance participant experiences.",
  },
  {
    title: "Fundraising Staff Instagram",
    organization: "HIMATIF UNPAD",
    year: "2024",
    image: "/journey/fundra.png",
    certificate: "/certificate/ifest2025.jpg",
    description:
      "Assisted in planning and executing fundraising initiatives to support event objectives. Coordinated fundraising activities, engaged with potential contributors, and contributed to achieving funding targets through effective communication and teamwork.",
  },
  {
    title: "Event Division Staff — Logyter",
    organization: "HIMATIF UNPAD",
    year: "2024",
    image: "/journey/logyter.png",
    certificate: "/certificate/ifest2025.jpg",
    description:
      "Served as the Master of Ceremony (MC) for community service activities, facilitating event proceedings, engaging participants, and ensuring smooth communication throughout the program. Contributed to creating an interactive and welcoming atmosphere while maintaining the flow of the event.",
  },
];

export default function Experience() {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const directionRef = useRef(null);
  const intervalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const startSliding = useCallback((direction) => {
    if (directionRef.current === direction) return;

    directionRef.current = direction;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!swiperRef.current) return;

      if (direction === "right") {
        swiperRef.current.slideNext(500);
      } else {
        swiperRef.current.slidePrev(500);
      }
    }, 600);
  }, []);

  const stopSliding = useCallback(() => {
    directionRef.current = null;
    clearInterval(intervalRef.current);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;

      const { left, width } =
        containerRef.current.getBoundingClientRect();

      const x = e.clientX - left;
      const ratio = x / width;

      const deadZone = 0.2;

      if (ratio < 0.5 - deadZone) {
        startSliding("left");
      } else if (ratio > 0.5 + deadZone) {
        startSliding("right");
      } else {
        stopSliding();
      }
    },
    [startSliding, stopSliding]
  );

  const handleMouseLeave = useCallback(() => {
    stopSliding();
  }, [stopSliding]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView="auto"
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
                <div
                  className="image-container"
                  onMouseEnter={() => {
                    if (activeIndex === index) {
                      setHoveredCard(exp.title);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                  }}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className={`experience-image main-image ${
                      hoveredCard === exp.title &&
                      activeIndex === index
                        ? "hide"
                        : ""
                    }`}
                  />

                  {exp.certificate && (
                    <img
                      src={exp.certificate}
                      alt={`${exp.title} Certificate`}
                      className={`experience-image cert-image ${
                        hoveredCard === exp.title &&
                        activeIndex === index
                          ? "show"
                          : ""
                      }`}
                    />
                  )}
                </div>

                <div className="experience-content">
                  <h3>{exp.title}</h3>

                  <p className="experience-org">
                    {exp.organization}
                  </p>

                  <p className="experience-desc">
                    {exp.description}
                  </p>

                  <div className="experience-year">
                    {exp.year}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}