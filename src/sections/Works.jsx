import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  useGSAP(() => {
    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;

    setHoveredIndex(index);
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;

    setHoveredIndex(null);
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.in",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || hoveredIndex === null) return;

    const el = overlayRefs.current[hoveredIndex];
    if (!el) return;

    gsap.to(el, {
      left: `${e.clientX + 5}px`,
      top: `${e.clientY + 5}px`,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="relative flex flex-col font-light">
        {projects.map((project, index) => (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0 no-underline"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onMouseMove={handleMouseMove}
          >
            {/* image overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="fixed hidden md:block pointer-events-none opacity-0 -z-10"
              style={{
                width: "500px",
                height: "300px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={project.image}
                alt={`${project.name}-hover`}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* title */}
            <div
              className={`flex justify-between px-1 sm:px-1 md:px-3 lg:px-6 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white ultra-small-screen ${hoveredIndex === index ? "text-white" : ""}`}
              style={
                hoveredIndex === index
                  ? {
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${project.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                    }
                  : {}
              }
            >
              <h2 className="lg:text-[32px] text-[26px] leading-none transition-all duration-300">
                {hoveredIndex === index ? project.description : project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
            </div>
            {/* divider */}
            <div className="w-full h-0.5 bg-black/80" />
            {/* framework */}
            <div className="flex px-1 sm:px-1 md:px-3 lg:px-6 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12 ultra-small-screen">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>
            {/* mobile preview image */}
            <div className="relative flex items-center justify-center px-1 sm:px-1 md:px-3 lg:px-6 md:hidden h-[400px] ultra-small-screen">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg-image`}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt={`${project.name}-image`}
                className="absolute bg-center px-14 rounded-xl"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;
