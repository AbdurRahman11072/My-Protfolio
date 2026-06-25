import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CareerObjective } from "@/components/sections/CareerObjective";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const heroData = await prisma.heroSection.findFirst();
  const skillCategories = await prisma.skillCategory.findMany({
    include: { skills: true },
    orderBy: { name: 'asc' }
  });
  const projects = await prisma.project.findMany({
    include: { detail: true },
    orderBy: { order: 'asc' }
  });
  const objectiveData = await prisma.careerObjective.findFirst();

  return (
    <main className="min-h-screen bg-grid">
      <Navbar />
      <Hero data={heroData} />
      <CareerObjective objective={objectiveData} />
      <Skills categories={skillCategories} />
      <Projects projects={projects} />
      <Contact />
    </main>
  );
}
