import { StreamChat } from "stream-chat";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const serverClient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      process.env.STREAM_SECRET_KEY
    );

    const userId = user.id;

    await serverClient.upsertUser({
      id: userId,
      name:
        user.fullName ||
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        "User",
      image: user.imageUrl,
    });

    const topics = [
      "python",
      "javascript",
      "ai-machine-learning",
      "web-development",
      "cyber-security",
      "devops",
    ];

    await Promise.all(
      topics.map((topicId) => {
        const channel = serverClient.channel("livestream", `forum-${topicId}`, {
          name: topicId.charAt(0).toUpperCase() + topicId.slice(1),
          created_by_id: userId,
        });
        return channel.create();
      })
    );

    const token = serverClient.createToken(userId);

    return Response.json({ token });
  } catch (error) {
    console.error("Stream token error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}