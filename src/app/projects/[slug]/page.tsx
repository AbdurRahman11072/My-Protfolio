import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, Code2, Rocket, ExternalLink, CheckCircle2, AlertCircle, Circle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoModal } from "@/components/ui/video-modal";

const Github = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path>
  </svg>
);

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
    include: { detail: true }
  });

  if (!project) return notFound();

  const detail = project.detail;

  // Helpers to parse markdown-like lists (one per line)
  const parseList = (text?: string | null) => {
    if (!text) return [];
    return text.split("\n").map(t => t.trim().replace(/^-\s*/, "")).filter(t => t.length > 0);
  };

  const features = parseList(detail?.coreFeatures);
  const breakthroughs = parseList(detail?.breakthroughs);
  const roadmap = parseList(detail?.roadmap);
  const tags = project.tags ? project.tags.split(",").map(t => t.trim()) : [];

  const getYoutubeEmbedUrl = (url?: string | null) => {
    if (!url) return null;
    if (url.includes("<iframe") && url.includes("src=")) {
      const match = url.match(/src="([^"]+)"/);
      if (match && match[1]) return match[1];
    }
    if (url.includes("watch?v=")) {
      const urlObj = new URL(url);
      const v = urlObj.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const parsedYoutubeUrl = getYoutubeEmbedUrl(detail?.youtubeUrl);

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-32 font-sans selection:bg-primary/30 selection:text-white">
      {/* Top Navigation */}
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <Link href="/#projects" className="inline-flex items-center text-primary text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
          
          {/* Main Left Content */}
          <div className="space-y-16">
            
            {/* Header section specifically for mobile (desktop shows this too, but we arrange it) */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
                  {detail?.role || "Full Stack"}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]">
                {project.title}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Mobile Hero Image / Video */}
            <div className="lg:hidden rounded-2xl border border-white/10 bg-[#111] overflow-hidden aspect-video relative">
               {parsedYoutubeUrl ? (
                 <VideoModal youtubeEmbedUrl={parsedYoutubeUrl} thumbnailUrl={project.imageUrl} projectTitle={project.title} />
               ) : project.imageUrl ? (
                 <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-white/20 font-bold uppercase tracking-widest text-2xl">No Media</div>
               )}
            </div>

            {/* Project Vision */}
            {detail?.vision && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Project Vision</h2>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
                  {detail.vision}
                </p>
              </div>
            )}

            {/* Architectural Features */}
            {features.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Architectural Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300 leading-relaxed font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Critical Breakthroughs */}
            {breakthroughs.length > 0 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Critical Break-throughs</h2>
                <div className="space-y-4">
                  {breakthroughs.map((bt, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-5 rounded-xl border border-orange-500/10 bg-orange-500/5">
                      <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300 leading-relaxed font-medium">{bt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evolution & Roadmap */}
            {roadmap.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl font-bold tracking-tight">Evolution & Roadmap</h2>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>
                <div className="space-y-3">
                  {roadmap.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-blue-500/10 bg-blue-500/5">
                      <Circle className="w-3 h-3 text-blue-500 fill-blue-500 shrink-0" />
                      <span className="text-sm text-gray-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-[#111] flex flex-col gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Duration</span>
                <span className="text-sm font-bold text-white">{detail?.duration || "N/A"}</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#111] flex flex-col gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Team</span>
                <span className="text-sm font-bold text-white">{detail?.teamSize || "Solo"}</span>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#111] flex flex-col gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Stack</span>
                <span className="text-sm font-bold text-white">{tags.length} Core Tech</span>
              </div>
            </div>

            {/* Desktop Hero Image / Video */}
            <div className="hidden lg:block rounded-2xl border border-white/10 bg-[#111] overflow-hidden aspect-[4/3] relative shadow-2xl">
               {parsedYoutubeUrl ? (
                 <VideoModal youtubeEmbedUrl={parsedYoutubeUrl} thumbnailUrl={project.imageUrl} projectTitle={project.title} />
               ) : project.imageUrl ? (
                 <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-white/20 font-bold uppercase tracking-widest text-2xl">No Media</div>
               )}
            </div>

            {/* Deployments */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#111] space-y-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Deployments</h3>
              <div className="space-y-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-primary text-black font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:bg-primary/90 transition-colors gap-2">
                    <Rocket className="w-4 h-4" /> Launch Production
                  </a>
                )}
                {project.frontendGithubUrl && (
                  <a href={project.frontendGithubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full border border-white/10 bg-transparent text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:bg-white/5 transition-colors gap-2">
                    <Github className="w-4 h-4" /> Frontend Source
                  </a>
                )}
                {project.backendGithubUrl && (
                  <a href={project.backendGithubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full border border-white/10 bg-transparent text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl hover:bg-white/5 transition-colors gap-2">
                    <Github className="w-4 h-4" /> Backend Source
                  </a>
                )}
              </div>
            </div>

            {/* Ecosystem (Tags) */}
            {tags.length > 0 && (
              <div className="p-6 rounded-2xl border border-white/5 bg-[#111] space-y-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ecosystem</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-md border border-white/10 bg-black text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#111] space-y-4">
              <p className="text-xs text-gray-400 font-medium">Impressed by this architecture? Share it with your network.</p>
              <button 
                className="w-full border border-white/10 bg-transparent text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" /> Copy URL
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
