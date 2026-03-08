import { StreamChat } from "stream-chat";

let clientInstance = null;

export function getStreamClient() {
  if (!clientInstance) {
    clientInstance = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY
    );
  }
  return clientInstance;
}