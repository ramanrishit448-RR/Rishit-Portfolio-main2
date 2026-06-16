import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("BlPszstrVbm6lhR9y"); // Replace with your public key
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const templateParams = {
        to_email: "ramanrishit448@gmail.com", // Your email
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      const response = await emailjs.send(
        "service_lbodbfj", // Replace with your service ID
        "template_xqiut59", // Replace with your template ID
        templateParams,
      );

      if (response.status === 200) {
        setStatusMessage({
          type: "success",
          text: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
        // Clear success message after 5 seconds
        setTimeout(() => setStatusMessage({ type: "", text: "" }), 5000);
      }
    } catch (error) {
      console.error("Email send failed:", error);
      setStatusMessage({
        type: "error",
        text: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
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

        {/* Get In Touch Form Section */}
        <div className="flex px-1 sm:px-1 md:px-3 lg:px-6 mt-20 mb-20">
          <div className="w-full max-w-2xl">
            {/* Heading */}
            <div className="mb-16">
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
                Get In Touch
              </h3>
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                Have a project in mind? I build production-grade solutions
                backend systems, AI applications, and modern web development.
                Let's create something remarkable together.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-white text-lg placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300 font-light"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-white text-lg placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300 font-light"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-white text-lg placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300 resize-none font-light"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 text-sm font-light uppercase tracking-widest text-white border border-white/30 rounded-lg hover:border-white/80 hover:bg-white/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>

              {/* Status Message */}
              {statusMessage.text && (
                <div
                  className={`pt-4 text-sm font-light ${
                    statusMessage.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
