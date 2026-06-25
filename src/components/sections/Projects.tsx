"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project, ProjectDetail } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProjectWithDetail = Project & {
  detail: ProjectDetail | null;
};

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

export function Projects({ projects }: { projects: ProjectWithDetail[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-20 gap-4">
          <Badge
            variant="outline"
            className="border-white/10 bg-white/5 text-gray-300 rounded-full px-4 py-1"
          >
            My Projects
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Selected <span className="text-primary">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            A showcase of full-stack applications demonstrating expertise in
            modern web technologies.
          </p>
        </div>

        <div className="flex flex-col gap-32 mb-16">
          {projects.map((project: any, idx: number) => {
            const tags = project.tags
              ? project.tags.split(",").map((t: string) => t.trim())
              : [];
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={cn(
                  "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                )}
              >
                {/* Image Side */}
                <div
                  className={cn(
                    "relative w-full aspect-[4/3] lg:aspect-square xl:aspect-[4/3] rounded-2xl overflow-hidden bg-[#111] border border-white/5 group",
                    !isEven && "lg:order-2",
                  )}
                >
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 font-bold text-4xl uppercase tracking-widest">
                      {project.title}
                    </div>
                  )}
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Content Side */}
                <div className={cn("flex flex-col", !isEven && "lg:order-1")}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-primary"></div>
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
                      {project.featured ? "Selected Project" : "Project"}
                    </span>
                  </div>

                  <h3 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12">
                    {tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.2em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-auto">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center bg-white text-black font-bold text-xs uppercase tracking-widest py-4 px-8 hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-transparent border border-white/20 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 hover:bg-white/5 transition-colors"
                      >
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
