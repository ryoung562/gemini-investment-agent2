import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { Message } from './types';
import { sendMessageToGemini, initChat } from './services/gemini';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-1',
      text: "Hello! I'm the Apex Financial Assistant. I can help you understand different types of investment accounts, like IRAs, 401(k)s, and brokerage accounts. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize chat session on mount
    initChat();
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(text);
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newBotMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error while trying to process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-900">
      <Sidebar onSuggestionClick={handleSendMessage} disabled={isLoading} />
      <ChatArea messages={messages} isLoading={isLoading} onSendMessage={handleSendMessage} />
    </div>
  );
}
