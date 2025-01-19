import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import "dotenv/config";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  const { subject, questions, answers } = await req.json();
  if (!subject) return new Response("subject is required", { status: 400 });

  const { text } = await generateText({
    temperature: 0.9,
    model: groq("gemma2-9b-it", { structuredOutputs: true }),
    maxSteps: 10,
    prompt: `
      Create a multi-choice quiz for ${subject} with ${questions} questions.
      Each question should have ${answers} answer options, and mark the correct answer,
      return only the JSON and nothing else. Format the output as JSON:

      [
        {
          "question": "What is the capital of France?",
          "options": ["Paris", "London", "Berlin", "Madrid"],
          "answer": "Paris"
        },
        {
          "question": "What is 2 + 2?",
          "options": ["3", "4", "5", "6"],
          "answer": "4"
        },
        {
          "question": "Which planet is known as the Red Planet?",
          "options": ["Earth", "Mars", "Venus", "Jupiter"],
          "answer": "Mars"
        }
      ]
    `,
  });

  return new Response(text);
}
