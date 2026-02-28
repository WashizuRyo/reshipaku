import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Hello from exspo server" });
});

app.post("/ask", async (c) => {
  const { url } = await c.req.json<{ url: string }>();

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: url,
  });

  return c.json({ message: text });
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});
