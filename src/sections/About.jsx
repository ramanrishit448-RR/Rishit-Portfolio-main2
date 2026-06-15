import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react/dist/iconify.js";

const About = () => {
  const text = `Software Engineering student passionate about
    building scalable backend systems and AI-powered
    applications from ground-up.`;
  const aboutText = `Hi I am Rishit Raman 
  I build production-grade solutions spanning backend systems, AI applications, and modern web development. From engineering a C++17 vector database with HNSW indexing and O(log N) search to deploying full-stack RAG pipelines, I'm committed to creating systems that scale.

  Experienced with Next.js, tRPC, Prisma, and LLM APIs (OpenAI, Gemini). Currently exploring the intersection of databases, machine learning, and real-time systems.
  
  When I'm not coding:`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Building systems that scale, AI that learns"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-1 sm:px-1 md:px-3 lg:px-6 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60 ultra-small-screen">
        <div className="flex flex-col items-center gap-6">
          <img
            ref={imgRef}
            src="images/pfp.png"
            alt="Rishit Raman"
            className="w-140 h-140 rounded-3xl object-cover"
          />
          <a
            href="/resume.pdf"
            download="Rishit_Raman_Resume"
            className="px-8 py-3 text-sm font-light uppercase tracking-widest text-white border border-white/30 rounded-lg hover:border-white/80 hover:bg-white/5 transition-all duration-300"
          >
            Download Resume
          </a>
        </div>
        <div className="w-full">
          <AnimatedTextLines text={aboutText} className={"w-full"} />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3">
              <Icon icon="lucide:database" className="text-white/80" />
              <span>
                Building distributed systems and database architectures
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:brain" className="text-white/80" />
              <span>Experimenting with AI/ML and LLM applications</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:code-2" className="text-white/80" />
              <span>Optimizing performance at scale</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon="lucide:zap" className="text-white/80" />
              <span>either Playing Games</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
