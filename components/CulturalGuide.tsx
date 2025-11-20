import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { getCulturalInsight, suggestEtiquette } from '../services/geminiService';

interface CulturalGuideProps {
  eventType: string;
  location: string;
}

export const CulturalGuide: React.FC<CulturalGuideProps> = ({ eventType, location }) => {
  const [insight, setInsight] = useState<string>('');
  const [tips, setTips] = useState<{title: string, tip: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [insightData, tipsData] = await Promise.all([
        getCulturalInsight(eventType, location),
        suggestEtiquette(eventType)
      ]);
      setInsight(insightData);
      setTips(tipsData);
      setLoading(false);
    };

    fetchData();
  }, [eventType, location]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 animate-pulse border border-indigo-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <div className="h-6 bg-indigo-200 rounded w-1/3"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-indigo-100 rounded w-full"></div>
          <div className="h-4 bg-indigo-100 rounded w-5/6"></div>
          <div className="h-4 bg-indigo-100 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Insight Card */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>
        
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-bold text-gray-900">Cultural Context AI</h3>
        </div>
        
        <p className="text-gray-700 leading-relaxed text-sm relative z-10">
          {insight}
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-4">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Essential Etiquette
        </h4>
        <div className="grid sm:grid-cols-1 gap-3">
          {tips.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-brand-200 transition-colors">
              <h5 className="font-semibold text-gray-800 text-sm mb-1 flex items-center gap-2">
                <span className="bg-brand-100 text-brand-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                {item.title}
              </h5>
              <p className="text-gray-600 text-sm pl-7">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
