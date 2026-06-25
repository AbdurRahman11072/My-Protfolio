import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Card } from "@/components/ui/card";
import Link from "next/link";

async function addExperience(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const current = formData.get("current") === "true";
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string) || 0;

  if (!title || !company || !startDate || !description) return;

  await prisma.experience.create({
    data: {
      title,
      company,
      startDate,
      endDate: current ? null : endDate,
      current,
      description,
      order
    }
  });

  revalidatePath("/admin/experience");
}

async function deleteExperience(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/admin/experience");
}

async function updateExperience(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const current = formData.get("current") === "true";
  const description = formData.get("description") as string;
  const order = parseInt(formData.get("order") as string) || 0;

  if (!id || !title || !company || !startDate || !description) return;

  await prisma.experience.update({
    where: { id },
    data: {
      title,
      company,
      startDate,
      endDate: current ? null : endDate,
      current,
      description,
      order
    }
  });

  revalidatePath("/admin/experience");
}

export default async function ExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const resolvedParams = await searchParams;
  const editId = resolvedParams?.edit;
  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });

  const experienceToEdit = editId ? experiences.find((e: any) => e.id === editId) : null;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Manage Experience</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {experiences.length === 0 ? (
              <div className="p-8 text-center bg-[#111111] rounded-2xl border border-white/5 text-gray-500">
                No experience entries found.
              </div>
            ) : (
              experiences.map(exp => (
                <Card key={exp.id} className="bg-[#111111] border-white/5 p-6 rounded-2xl flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate} | Order: {exp.order}
                    </p>
                    <p className="text-gray-300 mt-4 whitespace-pre-line text-sm max-w-2xl">
                      {exp.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/experience?edit=${exp.id}`}>
                      <button className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1 rounded transition-colors cursor-pointer">
                        Edit
                      </button>
                    </Link>
                    <form action={deleteExperience}>
                      <input type="hidden" name="id" value={exp.id} />
                      <button className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1 rounded transition-colors cursor-pointer">
                        Delete
                      </button>
                    </form>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl sticky top-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{experienceToEdit ? "Edit Experience" : "Add New Experience"}</h2>
              {experienceToEdit && (
                <Link href="/admin/experience" className="text-xs text-gray-400 hover:text-white">
                  Cancel Edit
                </Link>
              )}
            </div>
            <form action={experienceToEdit ? updateExperience : addExperience} className="space-y-4">
              {experienceToEdit && <input type="hidden" name="id" value={experienceToEdit.id} />}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
                <input required defaultValue={experienceToEdit?.title} type="text" name="title" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                <input required defaultValue={experienceToEdit?.company} type="text" name="company" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                  <input required defaultValue={experienceToEdit?.startDate} type="text" name="startDate" placeholder="e.g. Jan 2023" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                  <input type="text" defaultValue={experienceToEdit?.endDate || ""} name="endDate" placeholder="e.g. Dec 2024" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={experienceToEdit?.current} name="current" value="true" id="current" className="rounded bg-black border-white/10" />
                <label htmlFor="current" className="text-sm text-gray-300 cursor-pointer">I currently work here</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea required defaultValue={experienceToEdit?.description} name="description" rows={4} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 resize-none text-sm"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Order (lower comes first)</label>
                <input type="number" defaultValue={experienceToEdit?.order || 0} name="order" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
              </div>
              <button type="submit" className="w-full bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                {experienceToEdit ? "Update Experience" : "Add Experience"}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
