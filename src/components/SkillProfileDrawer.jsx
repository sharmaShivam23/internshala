'use client';

import { useState } from 'react';

const POPULAR_SKILLS = [
  'React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Express.js', 'MongoDB', 
  'SQL', 'Python', 'Django', 'Machine Learning', 'Data Analytics', 'Git',
  'Flutter', 'React Native', 'Java', 'C++', 'Figma', 'UI/UX Design', 
  'Content Writing', 'SEO', 'Digital Marketing', 'MS-Excel', 'Sales', 
  'HR Operations', 'Communication Skills'
];

export default function SkillProfileDrawer({ isOpen, onClose, skills = [], onSaveSkills }) {
  const [newSkill, setNewSkill] = useState('');

  if (!isOpen) return null;

  const handleAddSkill = (skillName) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    
    // Check for duplicates case-insensitively
    if (skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setNewSkill('');
      return;
    }

    const updated = [...skills, trimmed];
    onSaveSkills(updated);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter(s => s !== skillToRemove);
    onSaveSkills(updated);
  };

  const handleReset = () => {
    const defaults = ['React', 'JavaScript', 'HTML', 'CSS'];
    onSaveSkills(defaults);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/[0.06] bg-[#090911]/95 p-6 shadow-2xl backdrop-blur-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>⚡</span> My Skills Profile
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Add your skills to compute real-time job match scores
            </p>
          </div>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 pr-1 custom-scrollbar space-y-6">
          {/* Add custom skill input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Add Custom Skill
            </label>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSkill(newSkill);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="e.g. Next.js, Python, Figma..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-indigo-500/40 focus:bg-white/[0.05]"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 active:scale-95 transition-all"
              >
                Add
              </button>
            </form>
          </div>

          {/* Current Skills list */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Your Active Skills ({skills.length})
              </label>
              {skills.length > 0 && (
                <button 
                  onClick={handleReset}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Reset Defaults
                </button>
              )}
            </div>
            {skills.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] p-6 text-center">
                <p className="text-xs text-slate-400">No skills added yet.</p>
                <p className="mt-1 text-[11px] text-slate-500">Add custom skills or tap the popular skills below.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 text-xs font-medium text-indigo-300 transition-all hover:bg-indigo-500/15"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="rounded hover:bg-indigo-500/25 p-0.5 text-indigo-400 hover:text-indigo-200 transition-colors"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Popular skills select */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Popular Skills
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SKILLS.map((popSkill) => {
                const isSelected = skills.some(s => s.toLowerCase() === popSkill.toLowerCase());
                return (
                  <button
                    key={popSkill}
                    onClick={() => isSelected ? handleRemoveSkill(skills.find(s => s.toLowerCase() === popSkill.toLowerCase())) : handleAddSkill(popSkill)}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-indigo-500/30 bg-indigo-500/15 text-indigo-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400'
                        : 'border-white/[0.04] bg-white/[0.01] text-slate-400 hover:border-white/10 hover:bg-white/[0.03] hover:text-slate-300'
                    }`}
                  >
                    {isSelected ? `✓ ${popSkill}` : `+ ${popSkill}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] pt-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] py-2.5 text-sm font-semibold text-slate-200 hover:text-white transition-all active:scale-[0.98]"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
