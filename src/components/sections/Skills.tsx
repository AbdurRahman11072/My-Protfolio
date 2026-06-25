"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code2, Server, Database, Settings2, Wrench, Shield, Braces, Terminal } from "lucide-react";

type SkillItem = {
  id: string;
  name: string;
  icon?: string | null;
};

type SkillCategoryData = {
  id: string;
  name: string;
  skills: SkillItem[];
};

export function Skills({ categories }: { categories: SkillCategoryData[] }) {
  if (!categories || categories.length === 0) return null;

  // We can map category names to specific icons, or just use a default one
  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("language") || lowerName.includes("frontend")) return Code2;
    if (lowerName.includes("backend")) return Server;
    if (lowerName.includes("data")) return Database;
    if (lowerName.includes("secur")) return Shield;
    if (lowerName.includes("tool")) return Wrench;
    return Settings2;
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <Badge variant="outline" className="border-white/10 bg-white/5 text-gray-300 rounded-full px-4 py-1">
            My Skills
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skill <span className="text-primary">Highlights</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Technologies and tools I use to build scalable, secure, and performant web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const Icon = getCategoryIcon(category.name);
            return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl relative overflow-hidden group h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.skills.length} technologies</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="px-3 py-1.5 rounded-md bg-black/40 border border-white/5 text-sm text-gray-300 hover:border-primary/30 hover:text-white transition-colors"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
