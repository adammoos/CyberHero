import React from 'react';
import { GameLevel } from '../game-data';
import { MessageSquare } from 'lucide-react';

interface GameHUDProps {
  currentLevel: number;
  totalLevels: number;
  level: GameLevel;
}

export function GameHUD({ currentLevel, totalLevels, level }: GameHUDProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-4 pointer-events-none" dir="rtl">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-3">
        {/* Tunisia GPS Indicator */}
        <div className="bg-gradient-to-r from-purple-950/90 to-pink-950/90 backdrop-blur-md px-4 py-2 rounded-lg border border-purple-500/30 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-purple-300 text-xs font-bold">موقع تونس</span>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Level Indicator */}
        <div className="bg-gradient-to-r from-cyan-950/90 to-blue-950/90 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/30 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-cyan-300">
              {currentLevel}/{totalLevels}
            </span>
            <span className="text-cyan-400 text-xs font-bold">المستوى</span>
          </div>
        </div>
      </div>

      {/* Compact Scenario Display */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-cyan-950/85 to-blue-950/85 backdrop-blur-md p-3 rounded-lg border border-cyan-500/30 shadow-xl pointer-events-auto">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0 text-right">
              <div className="text-cyan-400 text-[10px] font-bold mb-1 tracking-wider">
                تنبيه تصيد احتيالي
              </div>
              <p className="text-cyan-100 text-sm leading-tight">{level.scenario}</p>
            </div>
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Compact Door Options */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="bg-pink-500/10 border border-pink-500/30 rounded px-2 py-1.5">
              <div className="text-pink-400 text-base font-bold text-center">A</div>
              <p className="text-pink-200 text-[10px] text-center leading-tight mt-0.5">
                {level.doorA}
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded px-2 py-1.5">
              <div className="text-green-400 text-base font-bold text-center">B</div>
              <p className="text-green-200 text-[10px] text-center leading-tight mt-0.5">
                {level.doorB}
              </p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded px-2 py-1.5">
              <div className="text-purple-400 text-base font-bold text-center">C</div>
              <p className="text-purple-200 text-[10px] text-center leading-tight mt-0.5">
                {level.doorC}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Hint */}
      <div className="max-w-6xl mx-auto mt-2 flex justify-center">
        <div className="bg-cyan-950/70 backdrop-blur-sm px-3 py-1 rounded border border-cyan-500/20 pointer-events-auto">
          <p className="text-cyan-400 text-[10px]">
            <span className="hidden md:inline">WASD للتحرك • امش نحو الباب للاختيار</span>
            <span className="md:hidden">استخدم عصا التحكم للتحرك • امش نحو الباب</span>
          </p>
        </div>
      </div>
    </div>
  );
}