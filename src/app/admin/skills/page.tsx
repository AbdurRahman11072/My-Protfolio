import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Card } from "@/components/ui/card";
import Link from "next/link";

async function addSkill(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;
  const categoryName = formData.get("categoryName") as string;

  if (!name || !categoryName) return;

  // Find or create category
  let category = await prisma.skillCategory.findUnique({
    where: { name: categoryName }
  });

  if (!category) {
    category = await prisma.skillCategory.create({
      data: { name: categoryName }
    });
  }

  await prisma.skill.create({
    data: {
      name,
      icon,
      categoryId: category.id
    }
  });

  revalidatePath("/admin/skills");
}

async function deleteSkill(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
}

async function updateSkill(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;
  const categoryName = formData.get("categoryName") as string;

  if (!id || !name || !categoryName) return;

  // Find or create category
  let category = await prisma.skillCategory.findUnique({
    where: { name: categoryName }
  });

  if (!category) {
    category = await prisma.skillCategory.create({
      data: { name: categoryName }
    });
  }

  await prisma.skill.update({
    where: { id },
    data: {
      name,
      icon,
      categoryId: category.id
    }
  });

  revalidatePath("/admin/skills");
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const resolvedParams = await searchParams;
  const editId = resolvedParams?.edit;
  const skills = await prisma.skill.findMany({
    include: { category: true },
    orderBy: { category: { name: 'asc' } }
  });
  const categories = await prisma.skillCategory.findMany();

  const skillToEdit = editId ? skills.find(s => s.id === editId) : null;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[#111111] rounded-2xl border border-white/5 overflow-hidden overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead className="bg-[#1a1a1a] border-b border-white/5">
                <tr>
                  <th className="p-4 font-medium text-gray-400">Name</th>
                  <th className="p-4 font-medium text-gray-400">Category</th>
                  <th className="p-4 font-medium text-gray-400">Icon</th>
                  <th className="p-4 font-medium text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {skills.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No skills found.</td>
                  </tr>
                ) : (
                  skills.map(skill => (
                    <tr key={skill.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-sm text-gray-300 font-medium">{skill.name}</td>
                      <td className="p-4 text-sm text-gray-400">{skill.category.name}</td>
                      <td className="p-4 text-sm text-gray-400">{skill.icon || "-"}</td>
                      <td className="p-4 flex justify-end gap-2">
                        <Link href={`/admin/skills?edit=${skill.id}`}>
                          <button className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1 rounded transition-colors cursor-pointer">
                            Edit
                          </button>
                        </Link>
                        <form action={deleteSkill}>
                          <input type="hidden" name="id" value={skill.id} />
                          <button className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1 rounded transition-colors cursor-pointer">
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl sticky top-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{skillToEdit ? "Edit Skill" : "Add New Skill"}</h2>
              {skillToEdit && (
                <Link href="/admin/skills" className="text-xs text-gray-400 hover:text-white">
                  Cancel Edit
                </Link>
              )}
            </div>
            <form action={skillToEdit ? updateSkill : addSkill} className="space-y-4">
              {skillToEdit && <input type="hidden" name="id" value={skillToEdit.id} />}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Skill Name</label>
                <input required defaultValue={skillToEdit?.name} type="text" name="name" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="e.g. React.js" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <input required defaultValue={skillToEdit?.category?.name} list="categories" type="text" name="categoryName" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="e.g. Frontend" />
                <datalist id="categories">
                  {categories.map(c => <option key={c.id} value={c.name} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Icon (optional)</label>
                <input type="text" defaultValue={skillToEdit?.icon || ""} name="icon" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="e.g. FaReact or URL" />
              </div>
              <button type="submit" className="w-full bg-white text-black font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                {skillToEdit ? "Update Skill" : "Add Skill"}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
