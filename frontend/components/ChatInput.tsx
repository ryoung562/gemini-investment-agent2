import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative flex items-end gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-400 transition-all"
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about investment accounts..."
        disabled={disabled}
        className="w-full max-h-[150px] min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 disabled:opacity-50 outline-none"
        rows={1}
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="shrink-0 h-11 w-11 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 transition-colors mb-0.5 mr-0.5 shadow-sm disabled:shadow-none"
        title="Send message"
      >
        <Send size={18} className={input.trim() && !disabled ? 'ml-0.5' : ''} />
      </button>
    </form>
  );
};
