import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  const skillCount = await prisma.skill.count();
  const expCount = await prisma.experience.count();
  const messageCount = await prisma.contactMessage.count({ where: { read: false } });

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl">
          <h3 className="text-gray-400 font-medium mb-2">Total Projects</h3>
          <p className="text-4xl font-bold text-white">{projectCount}</p>
        </Card>
        
        <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl">
          <h3 className="text-gray-400 font-medium mb-2">Total Skills</h3>
          <p className="text-4xl font-bold text-white">{skillCount}</p>
        </Card>
        
        <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl">
          <h3 className="text-gray-400 font-medium mb-2">Experience Entries</h3>
          <p className="text-4xl font-bold text-white">{expCount}</p>
        </Card>
        
        <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl">
          <h3 className="text-gray-400 font-medium mb-2">Unread Messages</h3>
          <p className="text-4xl font-bold text-primary">{messageCount}</p>
        </Card>
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <Card className="bg-[#111111] border-white/5 p-8 rounded-2xl text-center text-gray-500">
          No recent activity to show. Connect your components to start seeing updates here.
        </Card>
      </div>
    </div>
  );
}
