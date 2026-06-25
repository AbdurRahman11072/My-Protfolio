import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ImageUploader } from "@/components/ui/image-uploader";

async function addProject(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const frontendGithubUrl = formData.get("frontendGithubUrl") as string;
  const backendGithubUrl = formData.get("backendGithubUrl") as string;
  const tags = formData.get("tags") as string;
  const featured = formData.get("featured") === "true";
  const order = parseInt(formData.get("order") as string) || 0;

  // detail fields
  const coreFeatures = formData.get("coreFeatures") as string;
  const role = formData.get("role") as string;
  const duration = formData.get("duration") as string;
  const teamSize = formData.get("teamSize") as string;
  const vision = formData.get("vision") as string;
  const breakthroughs = formData.get("breakthroughs") as string;
  const roadmap = formData.get("roadmap") as string;
  const youtubeUrl = formData.get("youtubeUrl") as string;

  if (!title || !slug || !description || !tags) return;

  const project = await prisma.project.create({
    data: {
      title,
      slug,
      description,
      imageUrl,
      liveUrl,
      frontendGithubUrl,
      backendGithubUrl,
      tags,
      featured,
      order,
    }
  });

  if (coreFeatures || role || duration || teamSize || vision || breakthroughs || roadmap || youtubeUrl) {
    await prisma.projectDetail.create({
      data: {
        projectId: project.id,
        coreFeatures: coreFeatures || "",
        role: role || "",
        duration: duration || "",
        teamSize: teamSize || "",
        vision: vision || "",
        breakthroughs: breakthroughs || "",
        roadmap: roadmap || "",
        youtubeUrl: youtubeUrl || "",
      }
    });
  }

  revalidatePath("/admin/projects");
}

async function deleteProject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

async function toggleFeatured(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const featured = formData.get("featured") === "true";
  await prisma.project.update({
    where: { id },
    data: { featured: !featured }
  });
  revalidatePath("/admin/projects");
}

async function updateProject(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const frontendGithubUrl = formData.get("frontendGithubUrl") as string;
  const backendGithubUrl = formData.get("backendGithubUrl") as string;
  const tags = formData.get("tags") as string;
  const featured = formData.get("featured") === "true";
  const order = parseInt(formData.get("order") as string) || 0;

  // detail fields
  const coreFeatures = formData.get("coreFeatures") as string;
  const role = formData.get("role") as string;
  const duration = formData.get("duration") as string;
  const teamSize = formData.get("teamSize") as string;
  const vision = formData.get("vision") as string;
  const breakthroughs = formData.get("breakthroughs") as string;
  const roadmap = formData.get("roadmap") as string;
  const youtubeUrl = formData.get("youtubeUrl") as string;

  if (!id || !title || !slug || !description || !tags) return;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      imageUrl,
      liveUrl,
      frontendGithubUrl,
      backendGithubUrl,
      tags,
      featured,
      order,
    }
  });

  const existingDetail = await prisma.projectDetail.findUnique({ where: { projectId: id } });

  if (coreFeatures || role || duration || teamSize || vision || breakthroughs || roadmap || youtubeUrl) {
    const detailData = {
      coreFeatures: coreFeatures || "",
      role: role || "",
      duration: duration || "",
      teamSize: teamSize || "",
      vision: vision || "",
      breakthroughs: breakthroughs || "",
      roadmap: roadmap || "",
      youtubeUrl: youtubeUrl || "",
    };

    if (existingDetail) {
      await prisma.projectDetail.update({
        where: { projectId: id },
        data: detailData
      });
    } else {
      await prisma.projectDetail.create({
        data: {
          projectId: id,
          ...detailData
        }
      });
    }
  }

  revalidatePath("/admin/projects");
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const resolvedParams = await searchParams;
  const editId = resolvedParams?.edit;
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
    include: { detail: true }
  });

  const projectToEdit = editId ? projects.find(p => p.id === editId) : null;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="p-8 text-center bg-[#111111] rounded-2xl border border-white/5 text-gray-500">
                No projects found.
              </div>
            ) : (
              projects.map(proj => (
                <Card key={proj.id} className="bg-[#111111] border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {proj.title} 
                        {proj.featured && <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">Featured</span>}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">/{proj.slug} | Order: {proj.order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/projects?edit=${proj.id}`}>
                        <button className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1 rounded transition-colors cursor-pointer">
                          Edit
                        </button>
                      </Link>
                      <form action={toggleFeatured}>
                        <input type="hidden" name="id" value={proj.id} />
                        <input type="hidden" name="featured" value={proj.featured.toString()} />
                        <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors cursor-pointer">
                          {proj.featured ? "Unfeature" : "Feature"}
                        </button>
                      </form>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={proj.id} />
                        <button className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1 rounded transition-colors cursor-pointer">
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {proj.tags.split(',').map(tag => (
                      <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded">{tag.trim()}</span>
                    ))}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          <Card className="bg-[#111111] border-white/5 p-6 rounded-2xl sticky top-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{projectToEdit ? "Edit Project" : "Add New Project"}</h2>
              {projectToEdit && (
                <Link href="/admin/projects" className="text-xs text-gray-400 hover:text-white">
                  Cancel Edit
                </Link>
              )}
            </div>
            <form key={projectToEdit?.id || 'new'} action={projectToEdit ? updateProject : addProject} className="space-y-4">
              {projectToEdit && <input type="hidden" name="id" value={projectToEdit.id} />}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input required defaultValue={projectToEdit?.title} type="text" name="title" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                  <input required defaultValue={projectToEdit?.slug} type="text" name="slug" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30" placeholder="e.g. my-project" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea required defaultValue={projectToEdit?.description} name="description" rows={3} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 resize-none"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Main Image</label>
                  <ImageUploader name="imageUrl" defaultValue={projectToEdit?.imageUrl} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Tags (comma separated)</label>
                  <input required defaultValue={projectToEdit?.tags} type="text" name="tags" placeholder="React, Next.js, Tailwind" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Live URL</label>
                  <input type="text" defaultValue={projectToEdit?.liveUrl || ""} name="liveUrl" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Frontend GitHub</label>
                  <input type="text" defaultValue={projectToEdit?.frontendGithubUrl || ""} name="frontendGithubUrl" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Backend GitHub</label>
                  <input type="text" defaultValue={projectToEdit?.backendGithubUrl || ""} name="backendGithubUrl" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" />
                </div>
              </div>

              <div className="flex items-center gap-4 py-2 border-y border-white/5">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={projectToEdit?.featured} name="featured" value="true" id="featured" className="rounded bg-black border-white/10" />
                  <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">Featured Project</label>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <label className="text-sm text-gray-300">Order:</label>
                  <input type="number" defaultValue={projectToEdit?.order || 0} name="order" className="w-16 bg-black border border-white/10 rounded p-1 text-white outline-none text-sm" />
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-bold text-white mb-3">Project Details Page Data</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Role</label>
                      <input type="text" defaultValue={projectToEdit?.detail?.role || ""} name="role" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" placeholder="e.g. Lead Developer" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Duration</label>
                      <input type="text" defaultValue={projectToEdit?.detail?.duration || ""} name="duration" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" placeholder="e.g. 4 months" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Team Size</label>
                      <input type="text" defaultValue={projectToEdit?.detail?.teamSize || ""} name="teamSize" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" placeholder="e.g. Solo Project" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Project Vision</label>
                    <textarea defaultValue={projectToEdit?.detail?.vision || ""} name="vision" rows={3} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 resize-none text-sm"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Architectural Features (One per line)</label>
                    <textarea defaultValue={projectToEdit?.detail?.coreFeatures || ""} name="coreFeatures" rows={3} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 resize-none text-sm"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Critical Break-throughs (One per line)</label>
                    <textarea defaultValue={projectToEdit?.detail?.breakthroughs || ""} name="breakthroughs" rows={3} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 resize-none text-sm"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Evolution & Roadmap (One per line)</label>
                    <textarea defaultValue={projectToEdit?.detail?.roadmap || ""} name="roadmap" rows={3} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 resize-none text-sm"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">YouTube Video URL</label>
                    <input type="text" defaultValue={projectToEdit?.detail?.youtubeUrl || ""} name="youtubeUrl" className="w-full bg-black border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 text-sm" placeholder="https://youtube.com/watch?v=..." />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4 cursor-pointer">
                {projectToEdit ? "Update Project" : "Create Project"}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
