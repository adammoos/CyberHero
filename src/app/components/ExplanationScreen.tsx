import React from 'react';
import { Shield, AlertTriangle, Info } from 'lucide-react';

interface ExplanationScreenProps {
  title: string;
  description: string;
  redFlags: string[];
  tip: string;
  onRespawn: () => void;
}

export function ExplanationScreen({
  title,
  description,
  redFlags,
  tip,
  onRespawn
}: ExplanationScreenProps) {
  return (
    <div className="fixed inset-0 bg-red-950/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full bg-gradient-to-br from-red-900/90 to-red-950/90 rounded-2xl border-2 border-red-500/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-900/50 p-6 border-b border-red-500/30">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-red-200 tracking-wider">
            {title}
          </h2>
          <p className="text-center text-red-300 mt-2 text-lg">{description}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-red-950/50 rounded-lg p-5 border border-red-500/30">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-xl font-bold text-red-200">تحليل: علامات التحذير</h3>
            </div>
            <ul className="space-y-3" dir="rtl">
              {redFlags.map((flag, index) => {
                const [title, ...descParts] = flag.split(' - ');
                const description = descParts.join(' - ');
                return (
                  <li key={index} className="flex gap-3">
                    <span className="text-red-400 font-bold shrink-0">{index + 1}.</span>
                    <div className="text-right">
                      <span className="text-red-300 font-semibold">{title}</span>
                      {description && (
                        <span className="text-red-400/80"> - {description}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Cyber Safety Tip */}
          <div className="bg-blue-950/50 rounded-lg p-5 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-cyan-200">نصيحة الأمن السيبراني</h3>
            </div>
            <p className="text-blue-200 leading-relaxed text-right" dir="rtl">{tip}</p>
          </div>
        </div>

        {/* Respawn Button */}
        <div className="p-6 pt-0">
          <button
            onClick={onRespawn}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            أعد المحاولة
          </button>
        </div>
      </div>
    </div>
  );
}