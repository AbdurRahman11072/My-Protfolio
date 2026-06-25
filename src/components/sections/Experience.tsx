"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Tech Solutions Inc.",
    date: "Jan 2024 - Present",
    current: true,
    responsibilities: [
      "Architect and develop scalable full-stack web applications using Next.js and Nest.js.",
      "Lead backend performance optimization, reducing database query times by 35%.",
      "Mentor junior developers and establish CI/CD best practices.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Creative Digital Agency",
    date: "Jun 2022 - Dec 2023",
    current: false,
    responsibilities: [
      "Built interactive user interfaces with React and Tailwind CSS.",
      "Developed robust REST APIs using Node.js and Express.",
      "Integrated third-party services including Stripe and Google Calendar API.",
    ],
  },
  {
    title: "Jr. Software Engineer",
    company: "StartUp Innovators",
    date: "Jan 2021 - May 2022",
    current: false,
    responsibilities: [
      "Collaborated with the design team to implement pixel-perfect frontends.",
      "Assisted in database schema design and data migration scripts.",
      "Wrote comprehensive unit and integration tests.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <Badge variant="outline" className="border-white/10 bg-white/5 text-gray-300 rounded-full px-4 py-1">
            My Journey
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            A detailed log of my professional journey and contributions to software engineering.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
          {experiences.map((exp: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-3 md:-left-3.5 top-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-black border-2 border-primary flex items-center justify-center glow-border">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <Card className="bg-[#111111] border-white/5 p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-primary font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    {exp.current && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        Present
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-black/50 px-3 py-1.5 rounded-full border border-white/5">
                      <Calendar className="w-4 h-4" />
                      {exp.date}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.responsibilities.map((task: string, i: number) => (
                    <div key={i} className="flex gap-3 text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{task}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
