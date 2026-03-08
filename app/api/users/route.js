import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const me = await currentUser();
    if (!me) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clerkClient();
    const response = await client.users.getUserList({ limit: 100 });
    const users = response.data.map((u) => ({
      id: u.id,
      name:
        u.fullName ||
        `${u.firstName || ""} ${u.lastName || ""}`.trim() ||
        u.emailAddresses?.[0]?.emailAddress ||
        "Unknown User",
      imageUrl: u.imageUrl,
    }));

    const others = users.filter((u) => u.id !== me.id);
    return Response.json({ users: others });
  } catch (error) {
    console.error("Users API error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
