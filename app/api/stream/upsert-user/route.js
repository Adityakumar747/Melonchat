import { StreamChat } from "stream-chat";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const me = await currentUser();
    if (!me) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return Response.json({ error: "Missing Target User ID" }, { status: 400 });
    }

    const serverClient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      process.env.STREAM_SECRET_KEY
    );

    
    const client = await clerkClient();
    const targetUser = await client.users.getUser(targetUserId);

    if (!targetUser) {
      return Response.json({ error: "User not found in Clerk" }, { status: 404 });
    }

    
    await serverClient.upsertUser({
      id: targetUser.id,
      name:
        targetUser.fullName ||
        `${targetUser.firstName || ""} ${targetUser.lastName || ""}`.trim() ||
        "User",
      image: targetUser.imageUrl,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Upsert user error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
