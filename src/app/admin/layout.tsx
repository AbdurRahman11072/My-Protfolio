import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, LogOut, Settings, FolderKanban, Code2, Briefcase, MessageSquare, User } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <span className="text-white font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" /> Messages
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <FolderKanban className="w-5 h-5" /> Projects
          </Link>
          <Link href="/admin/skills" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Code2 className="w-5 h-5" /> Skills
          </Link>
          <Link href="/admin/experience" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Briefcase className="w-5 h-5" /> Experience
          </Link>
          <Link href="/admin/hero" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <User className="w-5 h-5" /> Hero Section
          </Link>
          <Link href="/admin/objective" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <User className="w-5 h-5" /> Career Objective
          </Link>
        </nav>
        <div className="p-4 border-t border-white/5">
           <Link href="/api/auth/logout" className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-[#0a0a0a] border-b border-white/5 flex items-center px-4">
          <span className="text-white font-bold">Admin Panel</span>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#050505]">
          {children}
        </div>
      </main>
    </div>
  );
}

