"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Code2, Globe, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

import * as LucideIcons from "lucide-react";

export function CareerObjective({ objective }: { objective: any }) {

  let parsedStats = [
    { icon: "GraduationCap", title: "CS Graduate", subtitle: "B.Sc. CSIT 2022–2025" },
    { icon: "Code2", title: "Next.js + Node.js", subtitle: "Core Stack" },
    { icon: "TrendingUp", title: "3 Projects", subtitle: "Full-Stack Built" },
    { icon: "Globe", title: "Remote & Onsite", subtitle: "Work Preference" },
  ];

  if (objective?.stats) {
    try {
      const dbStats = JSON.parse(objective.stats as string);
      if (Array.isArray(dbStats) && dbStats.length === 4) {
        parsedStats = dbStats;
      }
    } catch (e) {}
  }

  const highlightText = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part: string, i: number) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return <span key={i} className="text-primary font-medium">{part.slice(1, -1)}</span>;
      }
      return part;
    });
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <Badge variant="outline" className="border-white/10 bg-white/5 text-gray-300 rounded-full px-4 py-1">
            {objective?.badge || "About Me"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {objective?.titlePrefix || "Career"} <span className="text-primary">{objective?.titleHighlight || "Objective"}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            {objective?.subtitle || "Computer Science Graduate focused on building scalable, secure, and high-performance web applications."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {parsedStats.map((stat: any, i: number) => {
            // @ts-ignore
            const Icon = LucideIcons[stat.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-[#151515] border-white/5 flex flex-col items-center text-center p-8 glow-border rounded-2xl hover:bg-[#1a1a1a] transition-colors h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{stat.title}</h3>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-[#111111] border-white/5 p-8 md:p-12 rounded-2xl glow-border">
            <div className="flex gap-4 mb-12">
              <div className="w-1 bg-primary rounded-full" />
              <p className="text-gray-300 leading-relaxed text-lg">
                {highlightText(objective?.paragraph || "Computer Science Graduate with hands-on experience as a *Junior Full Stack Engineer* through academic and personal projects. Proficient in building scalable, secure, and high-performance web applications using *React.js, Next.js, Node.js, MongoDB, and PostgreSQL*. Skilled in *RESTful APIs, payment integrations (Stripe, SSLCommerz)*, and modern web architecture. Ready to deliver *clean, testable code* and improve user workflows in an entry-level developer role.")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Education</h3>
                <Card className="bg-black/50 border-white/5 p-6 rounded-xl flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">B.Sc. in Computer Science & IT</h4>
                    <p className="text-primary text-sm mb-2">University of Global Village, Barishal</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>2022 – 2025</span>
                      <span>Barishal, Bangladesh</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Currently Learning</h3>
                <div className="flex flex-col gap-4">
                  {["Docker", "Go Lang"].map((tech: string) => (
                    <Card key={tech} className="bg-black/50 border-white/5 p-5 rounded-xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
                        <span className="text-primary text-lg font-bold">{tech[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{tech}</h4>
                        <p className="text-gray-400 text-sm">In Progress</p>
                      </div>
                      <span className="ml-auto px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">Learning</span>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
