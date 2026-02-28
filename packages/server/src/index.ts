import { Hono } from "hono";
import { cors } from "hono/cors";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Hello from reshipaku server" });
});

app.post("/ask", async (c) => {
  const { url } = await c.req.json<{ url: string }>();

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: url,
  });

  return c.json({ message: text });
});

export default {
  port: 3000,
  fetch: app.fetch,
};
