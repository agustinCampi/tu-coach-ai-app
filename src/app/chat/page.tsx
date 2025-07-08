"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessage } from '@/components/chat-message';
import { ChatInput } from '@/components/chat-input';
import { QuickReplyButtons } from '@/components/quick-reply-buttons';
import { DateSeparator } from '@/components/date-separator';
import { TypingIndicator } from '@/components/typing-indicator';
import type { ChatItem, Message } from '@/lib/types';
import { smartExerciseSuggestion } from '@/ai/flows/smart-exercise-suggestion';
import { useAuth } from '@/context/AuthContext';

const initialMessages: ChatItem[] = [
  { id: 'date-1', type: 'date', date: 'Hoy' },
  {
    id: 'msg-1',
    type: 'ai',
    text: '¡Hola! Soy Tu Coach AI, tu entrenador personal inteligente. ¿En qué te puedo ayudar hoy?',
    timestamp: '09:00 AM',
  },
];

export default function ChatPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatItem[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (value: string) => {
    if (!value.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      text: value,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .filter((item): item is Message => item.type === 'user' || item.type === 'ai')
        .map(item => `${item.type}: ${item.text}`)
        .join('\n');
      
      const aiResponse = await smartExerciseSuggestion({ userInput: `${conversationHistory}\nuser: ${value}` });
      
      let responseText = '';
      if (aiResponse.exerciseSuggestions && aiResponse.exerciseSuggestions.length > 0) {
        responseText += `Te sugiero estas rutinas: ${aiResponse.exerciseSuggestions.join(', ')}.`;
      }
      if (aiResponse.reasoning) {
        responseText += ` ${aiResponse.reasoning}`;
      }

      const aiMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          type: 'ai',
          text: responseText || "No estoy seguro de cómo responder a eso. ¿Puedes intentar reformular tu pregunta?",
          timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
        console.error("Error calling AI:", error);
        const errorMessage: Message = {
            id: `err-${Date.now()}`,
            type: 'ai',
            text: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde.",
            timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(inputValue);
    setInputValue('');
  };

  const handleQuickReply = (reply: string) => {
    setInputValue('');
    handleSubmit(reply);
  };

  // Show loading indicator while checking auth state
  if (loading || !currentUser) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex-shrink-0 bg-background border-b border-border p-4">
        <h1 className="text-xl font-semibold text-center text-white">Tu Coach AI</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((item) =>
          item.type === 'date' ? (
            <DateSeparator key={item.id} date={item.date} />
          ) : (
            <ChatMessage key={item.id} message={item as Message} />
          )
        )}
        {isLoading && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>

      <div className="flex-shrink-0 mt-auto bg-background">
        {!isLoading && <QuickReplyButtons onQuickReply={handleQuickReply} isLoading={isLoading} />}
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
