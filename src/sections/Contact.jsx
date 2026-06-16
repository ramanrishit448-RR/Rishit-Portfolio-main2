import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { Icon } from "@iconify/react";

const Contact = () => {
  const text = `Got a question, how or project Idea?
    WE’D love to hear from you and discus further!`;
  const items = [
    "Say Hello",
    "Start A Project",
    "Open For Work",
    "Let's Chat",
    "Get In Touch",
  ];
  const getSocialIcon = (socialName) => {
    const iconMap = {
      Instagram: "mdi:instagram",
      LinkedIn: "mdi:linkedin",
      GitHub: "mdi:github",
    };
    return iconMap[socialName] || "mdi:link";
  };

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex px-1 sm:px-1 md:px-3 lg:px-6 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10 ultra-small-screen">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="https://mail.google.com/mail/?to=ramanrishit448@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-200"
              >
                ramanrishit448@gmail.com
              </a>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a
                href="tel:+918092273454"
                className="text-xl lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-200"
              >
                +91 8092273454
              </a>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-6">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-4xl hover:text-white/80 transition-colors duration-200 hover:scale-110 transform"
                    title={social.name}
                  >
                    <Icon icon={getSocialIcon(social.name)} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
