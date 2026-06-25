import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/ui/image-uploader";

async function saveHeroSection(formData: FormData) {
  "use server";
  const greeting = formData.get("greeting") as string;
  const name = formData.get("name") as string;
  const title = formData.get("title") as string;
  const bio = formData.get("bio") as string;
  const resumeUrl = formData.get("resumeUrl") as string;
  const profileImage = formData.get("profileImage") as string;

  if (!greeting || !name || !title || !bio) return;

  const existingHero = await prisma.heroSection.findFirst();

  if (existingHero) {
    await prisma.heroSection.update({
      where: { id: existingHero.id },
      data: { greeting, name, title, bio, resumeUrl, profileImage }
    });
  } else {
    await prisma.heroSection.create({
      data: { greeting, name, title, bio, resumeUrl, profileImage }
    });
  }

  revalidatePath("/admin/hero");
  revalidatePath("/");
}

export default async function HeroPage() {
  const hero = await prisma.heroSection.findFirst();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Manage Hero Section</h1>
      
      <div className="max-w-2xl">
        <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl">
          <form action={saveHeroSection} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Greeting</label>
              <input required defaultValue={hero?.greeting} type="text" name="greeting" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="e.g. Hello, I'm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input required defaultValue={hero?.name} type="text" name="name" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input required defaultValue={hero?.title} type="text" name="title" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="e.g. Full Stack Developer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
              <textarea required defaultValue={hero?.bio} name="bio" rows={4} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="Brief description about yourself..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Resume URL (optional)</label>
              <input defaultValue={hero?.resumeUrl || ''} type="text" name="resumeUrl" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="Link to your resume/CV" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Profile Image</label>
              <ImageUploader name="profileImage" defaultValue={hero?.profileImage} />
            </div>
            <button type="submit" className="w-full bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer mt-4">
              Save Changes
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
