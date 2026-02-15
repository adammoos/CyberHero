import React from 'react';
import { Shield, Award, Share2 } from 'lucide-react';

interface VictoryScreenProps {
  attemptsBlocked: number;
  totalLevels: number;
  onReplay: () => void;
}

export function VictoryScreen({ attemptsBlocked, totalLevels, onReplay }: VictoryScreenProps) {
  const securityScore = Math.round((totalLevels / (totalLevels + attemptsBlocked)) * 100);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-cyan-950/95 to-blue-950/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-2xl border-2 border-cyan-500/50 shadow-2xl overflow-hidden backdrop-blur-md" dir="rtl">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-8 border-b border-cyan-500/30">
          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-cyan-500/30 flex items-center justify-center animate-pulse">
              <Shield className="w-16 h-16 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 tracking-wider mb-2">
            أنت بطل سيبراني!
          </h1>
          <p className="text-center text-cyan-300 text-lg tracking-wide">
            تم تأمين مهمة تونس
          </p>
        </div>

        {/* Stats */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-cyan-950/50 rounded-lg p-6 border border-cyan-500/30 text-center">
              <div className="text-cyan-400 text-sm mb-2 font-semibold tracking-wider">
                المستويات المكتملة
              </div>
              <div className="text-5xl font-bold text-cyan-300">{totalLevels}</div>
              <div className="text-cyan-400/70 text-xs mt-1">/ {totalLevels}</div>
            </div>

            <div className="bg-blue-950/50 rounded-lg p-6 border border-blue-500/30 text-center">
              <div className="text-blue-400 text-sm mb-2 font-semibold tracking-wider">
                المحاولات المحجوبة
              </div>
              <div className="text-5xl font-bold text-blue-300">{attemptsBlocked}</div>
              <div className="text-blue-400/70 text-xs mt-1">أمان 100%</div>
            </div>
          </div>

          {/* Security Score */}
          <div className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 rounded-lg p-6 border border-purple-500/30 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-400" />
                <span className="text-purple-300 font-semibold">نقاط الأمان</span>
              </div>
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {securityScore}%
              </span>
            </div>
            <div className="w-full bg-purple-950/50 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                style={{ width: `${securityScore}%` }}
              />
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="bg-gradient-to-br from-yellow-950/30 to-orange-950/30 rounded-lg p-6 border border-yellow-500/30 mb-6 text-center">
            <div className="text-yellow-400 text-sm mb-2 font-semibold tracking-wider">
              🏆 تم فتح الإنجاز
            </div>
            <div className="text-2xl font-bold text-yellow-300">حامي من التصيد الاحتيالي</div>
            <div className="text-yellow-400/70 text-sm mt-1">
              لقد أتقنت فن اكتشاف التهديدات السيبرانية!
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onReplay}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              أعد المهمة
            </button>

            <button className="px-6 bg-purple-500/20 hover:bg-purple-500/30 border-2 border-purple-500/50 text-purple-300 font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              مشاركة
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-cyan-950/30 p-4 border-t border-cyan-500/20 text-center">
          <p className="text-cyan-400/70 text-sm">
            ابق متيقظًا! التهديدات السيبرانية تتطور باستمرار.
          </p>
        </div>
      </div>
    </div>
  );
}