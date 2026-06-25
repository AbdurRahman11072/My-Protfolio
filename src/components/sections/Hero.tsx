"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { HeroSection } from "@prisma/client";

const Github = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path></svg>);
const Linkedin = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>);

export function Hero({ data }: { data: HeroSection | null }) {
  if (!data) return null;

  console.log(data);


  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
            {data.greeting} <span className="text-primary border-b-4 border-primary">{data.name}</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl leading-relaxed whitespace-pre-wrap">
            {data.bio}
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>abdurrahman1072a@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>+880 1405011072</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Barishal, Bangladesh</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <Button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-black hover:bg-primary/90 rounded-full px-8 h-12 text-base font-medium"
            >
              View Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            {data.resumeUrl && (
              <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-8 h-12 text-base border-white/10 hover:bg-white/5 font-medium text-white">
                  View Resume <Eye className="ml-2 w-4 h-4" />
                </Button>
              </a>
            )}
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex justify-center items-center mt-12 lg:mt-0"
        >
          {/* Circular decorations */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[350px] h-[350px] rounded-full border border-white/10 absolute animate-[spin_60s_linear_infinite]" />
            <div className="w-[450px] h-[450px] rounded-full border border-primary/20 absolute border-dashed animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border border-primary/30 p-2 glow-border bg-black z-10">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-900 border border-white/5">
              {data.profileImage ? (
                <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                  <div className="flex items-center justify-center h-full text-zinc-700 font-medium text-lg">
                    {data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-10 right-0 md:-right-10 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white z-20 shadow-xl">
            {data.title}
          </div>
          <div className="absolute bottom-10 left-0 md:-left-10 px-4 py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white z-20 shadow-xl">
            React, Next.js, Node.js
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs tracking-widest uppercase">
        Scroll
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-[1px] h-4 bg-gray-500 mt-1" />
        </motion.div>
      </div>
    </section>
  );
}
