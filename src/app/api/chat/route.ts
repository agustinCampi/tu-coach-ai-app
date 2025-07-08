import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Asegúrate de que tu .env.local tenga NEXT_PUBLIC_GEMINI_API_KEY
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Configura el modelo (puedes ajustar el modelo si lo necesitas, como 'gemini-pro')
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(request: Request) {
  try {
    const { messages, userProfile } = await request.json();

    // Construye el contexto de la conversación
    // Aquí es donde usaremos la información del manual que tienes en tu Gem.
    // Por ahora, enviaremos los mensajes directamente y luego construiremos el historial
    // y el perfil del usuario para el contexto.

    // Mapea los mensajes al formato que Gemini espera
    const formattedMessages = messages.map(
      (msg: { text: string; sender: string }) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })
    );

    const chat = model.startChat({
      history: formattedMessages,
      // Puedes añadir un sistema de instrucciones aquí para tu Gem
      // Por ejemplo: system_instruction: "Eres Mentor Fitness, un entrenador personal experto..."
    });

    const result = await chat.sendMessage(messages[messages.length - 1].text);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI Coach." },
      { status: 500 }
    );
  }
}
