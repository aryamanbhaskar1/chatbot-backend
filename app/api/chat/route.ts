import { getContext } from "@/lib/context";
import { callModel } from "@/lib/together";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Missing or invalid message" },
        { status: 400 }
      );
    }

    const context = await getContext(message);
    const output = await callModel({ message, context });

    return Response.json({ output });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}