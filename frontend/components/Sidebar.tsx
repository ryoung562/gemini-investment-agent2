import React from 'react';
import { Building2, MessageSquare, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  onSuggestionClick: (text: string) => void;
  disabled: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSuggestionClick, disabled }) => {
  const suggestions = [
    "What's the difference between a Roth and Traditional IRA?",
    "How does a 401(k) work?",
    "What is a standard brokerage account?",
    "Can you explain 529 college savings plans?"
  ];

  return (
    <div className="w-80 bg-slate-900 text-white p-6 flex-col hidden md:flex shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
          <Building2 size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-tight">Apex Financial</h1>
          <p className="text-xs text-slate-400 font-medium">Wealth Management</p>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Suggested Topics</h2>
        <div className="space-y-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSuggestionClick(suggestion)}
              disabled={disabled}
              className="w-full text-left p-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all text-sm flex items-start gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageSquare size={16} className="text-blue-400 mt-0.5 shrink-0 group-hover:text-blue-300 transition-colors" />
              <span className="leading-snug text-slate-200 group-hover:text-white transition-colors">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-800/50">
          <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
          <p className="text-xs leading-tight">Secure, confidential, and powered by advanced AI.</p>
        </div>
      </div>
    </div>
  );
};
