import React from 'react';
import { Message } from '../types';
import { User, Bot, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-start gap-4 max-w-4xl w-full ${isBot ? '' : 'flex-row-reverse self-end ml-auto'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
        isBot ? 'bg-blue-600' : 'bg-slate-800'
      }`}>
        {isBot ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
      </div>

      {/* Message Bubble */}
      <div className={`relative flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-[85%] md:max-w-[75%]`}>
        <div className={`px-5 py-4 rounded-2xl shadow-sm ${
          isBot
            ? message.isError
              ? 'bg-red-50 border border-red-100 text-red-800 rounded-tl-none'
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-tr-none'
        }`}>
          {message.isError && <AlertCircle size={16} className="inline mr-2 mb-1" />}
          
          <div className={`text-sm leading-relaxed ${isBot ? 'text-slate-700' : 'text-white'}`}>
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1.5" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1.5" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                strong: ({node, ...props}) => <strong className={`font-semibold ${isBot ? 'text-slate-900' : 'text-white'}`} {...props} />,
                h1: ({node, ...props}) => <h1 className={`text-lg font-bold mb-2 mt-4 ${isBot ? 'text-slate-900' : 'text-white'}`} {...props} />,
                h2: ({node, ...props}) => <h2 className={`text-base font-bold mb-2 mt-3 ${isBot ? 'text-slate-900' : 'text-white'}`} {...props} />,
                h3: ({node, ...props}) => <h3 className={`text-sm font-bold mb-1 mt-2 ${isBot ? 'text-slate-900' : 'text-white'}`} {...props} />,
                a: ({node, ...props}) => <a className="underline underline-offset-2 hover:text-blue-500 transition-colors" {...props} />,
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 mt-1.5 px-1 font-medium">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
