import { Hono } from "hono";
import { cors } from "hono/cors";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

type Bindings = {
  GOOGLE_GENERATIVE_AI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Hello from reshipaku server" });
});

app.post("/ask", async (c) => {
  const { url } = await c.req.json<{ url: string }>();

  const google = createGoogleGenerativeAI({
    apiKey: c.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: url,
  });

  return c.json({ message: text });
});

export default app;
