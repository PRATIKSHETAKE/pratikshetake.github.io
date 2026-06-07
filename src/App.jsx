import { useEffect, useState } from "react";
import portfolio from "./data/portfolio.json";
import {
    FaGithub,
    FaLinkedin,
    FaWhatsapp,
    FaPhone,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "./assets/logo.png";

const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    whatsapp: FaWhatsapp,
    phone: FaPhone,
    mail: MdEmail,
};

export default function App() {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    const [hovering, setHovering] = useState(false);
    const [timelineProgress, setTimelineProgress] = useState(0);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById("experience-container");
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const scrollDistance = rect.height + windowHeight * 0.2;
            const scrolled = windowHeight * 0.7 - rect.top;
            const progress = (scrolled / scrollDistance) * 100;
            
            setTimelineProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener("scroll", handleScroll);
        // Run once initially to set correct state
        setTimeout(handleScroll, 100);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen text-white overflow-x-hidden">
            {/* Custom Cursor */}
            <div
                className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-all duration-200 ease-out ${
                    hovering
                        ? "w-10 h-10 rounded-[14px] border border-cyan-400/90 shadow-[0_0_20px_rgba(34,211,238,0.45)]"
                        : "w-3 h-3 rounded-full bg-cyan-400"
                }`}
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
                }}
            />

            {/* Premium Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
                {/* Base Mesh Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_35%)]" />

                {/* Floating Glow 1 */}
                <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-cyan-500/20 blur-[140px] animate-float-slow" />

                {/* Floating Glow 2 */}
                <div className="absolute top-[30%] right-[-10%] w-[800px] h-[800px] rounded-full bg-violet-500/20 blur-[160px] animate-float-medium" />

                {/* Floating Glow 3 */}
                <div className="absolute bottom-[-20%] left-[30%] w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-[150px] animate-float-fast" />

                {/* Center Glow */}
                <div className="absolute top-[35%] left-[35%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px]" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:90px_90px]" />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.025] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-white/10 px-8 md:px-16 py-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img
                        src={logo}
                        alt="PS Logo"
                        className="w-12 h-12 rounded-2xl object-cover"
                    />

                    <h1 className="text-xl font-black tracking-[0.25em]">
                        {portfolio.site?.name}
                    </h1>
                </div>

                <div className="hidden md:flex gap-10 text-sm text-zinc-300">
                    {portfolio.navigation?.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                            className="hover:text-cyan-400 transition"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Hero */}
            <section
                id="hero"
                className="min-h-screen flex items-center px-8 md:px-20 relative"
            >
                <div className="max-w-6xl">
                    <p className="uppercase tracking-[0.45em] text-cyan-400 text-sm mb-6">
                        {portfolio.hero?.kicker}
                    </p>

                    <h1 className="text-6xl md:text-[8rem] font-black leading-[0.9] tracking-tight">
                        {portfolio.hero?.headline}
                    </h1>

                    <p className="mt-10 text-zinc-400 text-xl max-w-3xl leading-relaxed">
                        {portfolio.hero?.intro}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-5 mt-12">
                        {portfolio.hero?.ctaButtons?.map((button, index) => (
                            <a
                                key={index}
                                href={button.href}
                                target={button.external ? "_blank" : "_self"}
                                rel="noreferrer"
                                onMouseEnter={() => setHovering(true)}
                                onMouseLeave={() => setHovering(false)}
                                className={`group px-8 py-4 rounded-2xl transition-all duration-300 ${
                                    button.variant === "primary"
                                        ? "bg-white text-black hover:scale-105 hover:shadow-[0_0_60px_rgba(34,211,238,0.45)]"
                                        : "bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10"
                                }`}
                            >
                                {button.label}
                            </a>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="flex gap-5 mt-14">
                        {portfolio.socialLinks?.map((social) => {
                            const Icon = iconMap[social.iconKey];

                            return (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                    className="group w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-2xl hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all duration-300"
                                >
                                    {Icon && <Icon />}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About */}
            <section
                id="about"
                className="px-8 md:px-20 py-28 border-t border-white/10"
            >
                <div className="grid md:grid-cols-2 gap-20">
                    <div>
                        <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-6">
                            About
                        </p>

                        <h2 className="text-5xl md:text-6xl font-black leading-tight">
                            {portfolio.about?.title}
                        </h2>
                    </div>

                    <div>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            {portfolio.about?.copy}
                        </p>

                        <div className="mt-12 space-y-6">
                            {portfolio.about?.principles?.map((principle, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                    className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-cyan-400/40 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500"
                                >
                                    <h3 className="text-2xl font-bold">
                                        {principle.title}
                                    </h3>

                                    <p className="text-zinc-400 mt-4 leading-relaxed">
                                        {principle.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stack */}
            <section
                id="stack"
                className="px-8 md:px-20 py-28 border-t border-white/10"
            >
                <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-6">
                    Stack
                </p>

                <h2 className="text-5xl md:text-6xl font-black mb-8">
                    {portfolio.stack?.title}
                </h2>

                <p className="text-zinc-400 text-lg max-w-4xl mb-20">
                    {portfolio.stack?.copy}
                </p>

                <div className="space-y-16">
                    {portfolio.stack?.sections?.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-3xl font-bold mb-3">
                                {section.category}
                            </h3>

                            <p className="text-zinc-500 mb-8">
                                {section.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {section.items?.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        onMouseEnter={() => setHovering(true)}
                                        onMouseLeave={() => setHovering(false)}
                                        className="group px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-300"
                                    >
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience / Timeline */}
            <section
                id="experience"
                className="px-8 md:px-20 py-28 border-t border-white/10"
            >
                <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-6">
                    Experience
                </p>

                <h2 className="text-5xl md:text-6xl font-black mb-8">
                    {portfolio.experienceSection?.title}
                </h2>

                <p className="text-zinc-400 text-lg max-w-4xl mb-20">
                    {portfolio.experienceSection?.copy}
                </p>

                <div id="experience-container" className="relative pl-12 md:pl-16 space-y-12">
                    {/* Vertical Line Track */}
                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-800">
                        {/* Active Progress Line */}
                        <div 
                            className="w-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.7)] transition-all duration-300 ease-out origin-top"
                            style={{ height: `${timelineProgress}%` }}
                        />
                        {/* Glowing Bead at the tip */}
                        <div 
                            className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.8)] transition-all duration-300 ease-out z-20 pointer-events-none -translate-y-1/2"
                            style={{ top: `${timelineProgress}%` }}
                        />
                    </div>

                    {portfolio.experiences?.map((exp, index) => {
                        const badgeColorMap = {
                            Professional: "text-violet-400 bg-violet-400/10 border-violet-400/20",
                            Education: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
                            Leadership: "text-amber-400 bg-amber-400/10 border-amber-400/20",
                        };
                        const badgeClass = badgeColorMap[exp.type] || "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
                        const isReached = timelineProgress >= (index / (portfolio.experiences.length - 1)) * 95;

                        return (
                            <div
                                key={index}
                                className="relative group"
                            >
                                {/* Glowing Dot */}
                                <div className={`absolute left-[-48px] md:-left-[64px] top-2 w-8 h-8 rounded-full border-2 transition-all duration-700 ease-out z-10 flex items-center justify-center ${
                                    isReached
                                        ? "bg-zinc-950 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-pulse-glow"
                                        : "bg-zinc-900 border-zinc-700"
                                }`}>
                                    {/* Pulse Ping Wave */}
                                    {isReached && (
                                        <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '2.5s' }} />
                                    )}
                                    {/* Core Dot */}
                                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                        isReached ? "bg-cyan-400 scale-110" : "bg-zinc-600"
                                    }`} />
                                </div>

                                {/* Timeline Line Segment Glow effect on Hover */}
                                <div className="absolute left-[-48px] md:-left-[64px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                                {/* Card */}
                                <div
                                    onMouseEnter={() => isReached && setHovering(true)}
                                    onMouseLeave={() => isReached && setHovering(false)}
                                    className={`relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] p-8 transition-all duration-700 ease-out ${
                                        isReached
                                            ? "opacity-100 translate-y-0 hover:border-cyan-400/40 hover:-translate-y-1.5 hover:shadow-[0_0_60px_rgba(34,211,238,0.15)] cursor-pointer"
                                            : "opacity-25 translate-y-4 pointer-events-none"
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                        <div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass} mb-3`}>
                                                {exp.type}
                                            </span>
                                            <h3 className="text-3xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300">
                                                {exp.title}
                                            </h3>
                                            <p className="text-zinc-400 font-medium text-lg mt-1">
                                                {exp.role}
                                            </p>
                                        </div>
                                        <div className="text-zinc-500 font-semibold text-lg md:text-right shrink-0 pt-1">
                                            {exp.period}
                                        </div>
                                    </div>

                                    <p className="text-zinc-400 leading-relaxed text-lg mb-6">
                                        {exp.summary}
                                    </p>

                                    {exp.focus && exp.focus.length > 0 && (
                                        <div className="flex flex-wrap gap-2.5">
                                            {exp.focus.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/5 text-sm text-zinc-300 font-medium group-hover:border-cyan-400/20 group-hover:bg-cyan-400/5 transition-all duration-500"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Certifications */}
            <section
                id="certifications"
                className="px-8 md:px-20 py-28 border-t border-white/10"
            >
                <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-6">
                    Certifications
                </p>

                <h2 className="text-5xl md:text-6xl font-black mb-8">
                    {portfolio.certificationsSection?.title}
                </h2>

                <p className="text-zinc-400 text-lg max-w-4xl mb-20">
                    {portfolio.certificationsSection?.copy}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {portfolio.certifications?.map((cert, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                            className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-cyan-400/40 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(34,211,238,0.15)] transition-all duration-500"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {cert.title}
                                    </h3>

                                    <p className="text-cyan-400 mt-2">
                                        {cert.issuer}
                                    </p>
                                </div>

                                <p className="text-zinc-500">
                                    {cert.year}
                                </p>
                            </div>

                            <p className="text-zinc-400 mt-6 leading-relaxed">
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section
                id="projects"
                className="px-8 md:px-20 py-28 border-t border-white/10"
            >
                <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-6">
                    Projects
                </p>

                <h2 className="text-5xl md:text-6xl font-black mb-8">
                    {portfolio.projectsSection?.title}
                </h2>

                <p className="text-zinc-400 text-lg max-w-4xl mb-20">
                    {portfolio.projectsSection?.copy}
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {portfolio.projects?.map((project, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                            className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] overflow-hidden hover:border-cyan-400/40 hover:-translate-y-3 hover:shadow-[0_0_80px_rgba(34,211,238,0.12)] transition-all duration-500"
                        >
                            <div className="h-72 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-7xl font-black text-white/10">
                                0{index + 1}
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <p className="text-cyan-400 text-sm">
                                            {project.category}
                                        </p>

                                        <h3 className="text-3xl font-black mt-2">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-zinc-500">
                                        {project.year}
                                    </p>
                                </div>

                                <p className="text-zinc-400 mt-6 leading-relaxed">
                                    {project.summary}
                                </p>

                                <div className="flex flex-wrap gap-3 mt-8">
                                    {project.stack?.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-4 py-2 rounded-full bg-white/10 text-sm"
                                        >
                      {tech}
                    </span>
                                    ))}
                                </div>

                                <div className="flex gap-6 mt-8">
                                    {project.githubRepo && (
                                        <a
                                            href={project.githubRepo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-cyan-400 hover:text-cyan-300"
                                        >
                                            GitHub →
                                        </a>
                                    )}

                                    {project.liveDemo && (
                                        <a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-violet-400 hover:text-violet-300"
                                        >
                                            Live Demo →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="px-8 md:px-20 py-32 border-t border-white/10"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <p className="uppercase tracking-[0.35em] text-cyan-400 text-sm mb-6">
                        Contact
                    </p>

                    <h2 className="text-5xl md:text-7xl font-black leading-tight">
                        {portfolio.contact?.title}
                    </h2>

                    <p className="text-zinc-400 text-lg mt-10 leading-relaxed">
                        {portfolio.contact?.copy}
                    </p>

                    <div className="flex justify-center gap-6 flex-wrap mt-16">
                        {portfolio.contact?.contactItems?.map((item, index) => {
                            const Icon = iconMap[item.iconKey];

                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                    className="group w-20 h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-3xl hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(34,211,238,0.2)] transition-all duration-300"
                                >
                                    {Icon && <Icon />}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}