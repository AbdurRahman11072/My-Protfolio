import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deleteMessage(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

async function toggleReadStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const currentStatus = formData.get("status") === "true";
  await prisma.contactMessage.update({
    where: { id },
    data: { read: !currentStatus }
  });
  revalidatePath("/admin/messages");
}

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <div className="bg-[#111111] rounded-2xl border border-white/5 overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-[#1a1a1a] border-b border-white/5">
            <tr>
              <th className="p-4 font-medium text-gray-400">Date</th>
              <th className="p-4 font-medium text-gray-400">Name</th>
              <th className="p-4 font-medium text-gray-400">Email</th>
              <th className="p-4 font-medium text-gray-400">Subject</th>
              <th className="p-4 font-medium text-gray-400">Message</th>
              <th className="p-4 font-medium text-gray-400">Status</th>
              <th className="p-4 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {messages.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">No messages found.</td>
              </tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-sm text-gray-300">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-sm text-gray-300">{msg.name}</td>
                  <td className="p-4 text-sm text-gray-300">{msg.email}</td>
                  <td className="p-4 text-sm text-gray-300">{msg.subject}</td>
                  <td className="p-4 text-sm text-gray-400 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${msg.read ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {msg.read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <form action={toggleReadStatus}>
                      <input type="hidden" name="id" value={msg.id} />
                      <input type="hidden" name="status" value={msg.read.toString()} />
                      <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors cursor-pointer">
                        Mark {msg.read ? "Unread" : "Read"}
                      </button>
                    </form>
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={msg.id} />
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
  );
}
