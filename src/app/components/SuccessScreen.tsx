import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SuccessScreenProps {
  onContinue: () => void;
}

export function SuccessScreen({ onContinue }: SuccessScreenProps) {
  return (
    <div className="fixed inset-0 bg-green-950/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full bg-gradient-to-br from-green-900/90 to-emerald-950/90 rounded-2xl border-2 border-green-500/50 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-green-900/50 p-6 border-b border-green-500/30">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-green-200 tracking-wider">
            إجابة صحيحة!
          </h2>
          <p className="text-center text-green-300 mt-2 text-lg">اختيار ممتاز! لقد تجنبت التهديد بنجاح</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Success Message */}
          <div className="bg-green-950/50 rounded-lg p-6 border border-green-500/30 mb-6 text-center">
            <div className="text-green-400 text-sm mb-3 font-semibold tracking-wider">
              ✓ تم تأمين النظام
            </div>
            <p className="text-green-200 text-lg leading-relaxed">
              لقد أظهرت وعيًا سيبرانيًا ممتازًا من خلال التعرف على علامات التحذير وتجنب فخ التصيد الاحتيالي.
            </p>
          </div>

          {/* Security Tip */}
          <div className="bg-blue-950/50 rounded-lg p-5 border border-blue-500/30 mb-6">
            <div className="text-blue-400 text-sm mb-2 font-bold">💡 نصيحة أمنية</div>
            <p className="text-blue-200 text-sm leading-relaxed">
              استمر في الحذر! المجرمون الإلكترونيون يحدّثون تكتيكاتهم باستمرار. كن دائمًا ��تيقظًا.
            </p>
          </div>

          {/* Next Level Button */}
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-3 text-lg shadow-lg"
          >
            <span>انتقل للمستوى التالي</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer */}
        <div className="bg-green-950/30 p-4 border-t border-green-500/20 text-center">
          <p className="text-green-400/70 text-sm">
            🛡️ مهمة تونس للأمن السيبراني قيد التنفيذ
          </p>
        </div>
      </div>
    </div>
  );
}