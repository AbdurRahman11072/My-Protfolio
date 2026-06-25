import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Card } from "@/components/ui/card";

async function saveObjective(formData: FormData) {
  "use server";
  
  const badge = formData.get("badge") as string;
  const titlePrefix = formData.get("titlePrefix") as string;
  const titleHighlight = formData.get("titleHighlight") as string;
  const subtitle = formData.get("subtitle") as string;
  const paragraph = formData.get("paragraph") as string;

  // Build the stats array from the formData (4 stats)
  const stats = [
    {
      icon: formData.get("stat0_icon") as string,
      title: formData.get("stat0_title") as string,
      subtitle: formData.get("stat0_subtitle") as string,
    },
    {
      icon: formData.get("stat1_icon") as string,
      title: formData.get("stat1_title") as string,
      subtitle: formData.get("stat1_subtitle") as string,
    },
    {
      icon: formData.get("stat2_icon") as string,
      title: formData.get("stat2_title") as string,
      subtitle: formData.get("stat2_subtitle") as string,
    },
    {
      icon: formData.get("stat3_icon") as string,
      title: formData.get("stat3_title") as string,
      subtitle: formData.get("stat3_subtitle") as string,
    }
  ];

  const existing = await prisma.careerObjective.findFirst();

  if (existing) {
    await prisma.careerObjective.update({
      where: { id: existing.id },
      data: { badge, titlePrefix, titleHighlight, subtitle, paragraph, stats: JSON.stringify(stats) }
    });
  } else {
    await prisma.careerObjective.create({
      data: { badge, titlePrefix, titleHighlight, subtitle, paragraph, stats: JSON.stringify(stats) }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/objective");
}

export default async function ObjectiveAdminPage() {
  const objective = await prisma.careerObjective.findFirst();
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
    } catch (e) {
      // fallback
    }
  }

  return (
    <div className="text-white max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Manage Career Objective</h1>
      
      <Card className="bg-[#111111] border-white/5 p-8 rounded-2xl">
        <form action={saveObjective} className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-white/10 pb-2">Header Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Badge Text</label>
                <input required defaultValue={objective?.badge || "About Me"} type="text" name="badge" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title Prefix</label>
                <input required defaultValue={objective?.titlePrefix || "Career"} type="text" name="titlePrefix" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title Highlight</label>
                <input required defaultValue={objective?.titleHighlight || "Objective"} type="text" name="titleHighlight" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Subtitle</label>
              <input required defaultValue={objective?.subtitle || "Computer Science Graduate focused on building scalable, secure, and high-performance web applications."} type="text" name="subtitle" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-white/10 pb-2 flex justify-between items-center">
              Main Paragraph
              <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-1 rounded">Wrap text in *asterisks* to highlight it!</span>
            </h3>
            <div>
              <textarea 
                required 
                defaultValue={objective?.paragraph || "Computer Science Graduate with hands-on experience as a *Junior Full Stack Engineer* through academic and personal projects. Proficient in building scalable, secure, and high-performance web applications using *React.js, Next.js, Node.js, MongoDB, and PostgreSQL*. Skilled in *RESTful APIs, payment integrations (Stripe, SSLCommerz)*, and modern web architecture. Ready to deliver *clean, testable code* and improve user workflows in an entry-level developer role."} 
                name="paragraph" 
                rows={6} 
                className="w-full bg-black border border-white/10 rounded-lg p-4 text-white outline-none focus:border-white/30 resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b border-white/10 pb-2">Statistics (4 Cards)</h3>
            <p className="text-xs text-gray-500 mb-4">Use Lucide React icon names exactly (e.g. GraduationCap, Code2, TrendingUp, Globe, Users, Target, Rocket)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="p-4 border border-white/10 rounded-xl bg-black space-y-3">
                  <h4 className="text-sm font-bold text-gray-300">Stat Card {idx + 1}</h4>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Icon Name</label>
                    <input required defaultValue={parsedStats[idx]?.icon} type="text" name={`stat${idx}_icon`} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                    <input required defaultValue={parsedStats[idx]?.title} type="text" name={`stat${idx}_title`} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Subtitle</label>
                    <input required defaultValue={parsedStats[idx]?.subtitle} type="text" name={`stat${idx}_subtitle`} className="w-full bg-[#111] border border-white/10 rounded p-2 text-white outline-none text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors cursor-pointer text-lg">
            Save Career Objective
          </button>
        </form>
      </Card>
    </div>
  );
}
