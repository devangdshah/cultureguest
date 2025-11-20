import React, { useState } from 'react';
import { Wand2, Image as ImageIcon, Calendar } from 'lucide-react';
import { generateEventDescription } from '../services/geminiService';
import { EventCategory } from '../types';

export const HostEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>(EventCategory.WEDDING);
  const [highlights, setHighlights] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1);

  const handleAiGenerate = async () => {
    if (!title || !highlights) return;
    setIsGenerating(true);
    const generated = await generateEventDescription(title, category, highlights);
    setDescription(generated);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Event created! (In a real app, this would save to DB)");
    // Reset form or redirect
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="bg-brand-600 px-8 py-6 text-white">
            <h1 className="text-2xl font-bold">Host an Experience</h1>
            <p className="text-brand-100 mt-1">Share your culture and earn while celebrating.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
                <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-brand-600' : 'bg-gray-200'}`}></div>
                <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-brand-600' : 'bg-gray-200'}`}></div>
            </div>

            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="e.g., My Brother's Traditional Wedding"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value as EventCategory)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    >
                      {Object.values(EventCategory).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guest Capacity</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma separated)</label>
                  <input 
                    type="text" 
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="e.g., Food, Dance, Rituals"
                  />
                  <p className="text-xs text-gray-500 mt-1">Helps AI generate your description.</p>
                </div>

                 <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Next: Details
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <div className="relative">
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent h-40"
                      placeholder="Describe the atmosphere, what guests will do, etc..."
                    />
                    <button
                      type="button"
                      onClick={handleAiGenerate}
                      disabled={isGenerating || !title}
                      className="absolute bottom-3 right-3 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-indigo-100 transition-colors"
                    >
                      {isGenerating ? (
                        <span className="animate-pulse">Thinking...</span>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          AI Write
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per Guest ($)</label>
                         <input 
                            type="number" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                         <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                             <input 
                                type="date" 
                                className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            />
                         </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-400 transition-colors cursor-pointer bg-gray-50">
                        <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500 block">Click to upload photo</span>
                        <input type="file" className="hidden" />
                    </div>
                </div>

                <div className="flex gap-4">
                     <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                        Back
                    </button>
                    <button 
                        type="submit"
                        className="w-2/3 bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
                    >
                        Publish Listing
                    </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};
