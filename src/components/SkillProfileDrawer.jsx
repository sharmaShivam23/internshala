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
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border-theme bg-panel p-6 shadow-2xl animate-slide-in-right transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-theme pb-4">
          <div>
            <h2 className="text-lg font-bold text-text-main flex items-center gap-2 select-none">
              <span className="text-accent">⚡</span> My Skills Profile
            </h2>
            <p className="mt-1 text-xs text-text-sub">
              Add your skills to compute real-time job match scores
            </p>
          </div>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-theme bg-card text-text-sub hover:bg-bg-page hover:text-text-main transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 pr-1 custom-scrollbar space-y-6">
          {/* Add custom skill input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
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
                className="flex-1 rounded-xl border border-border-theme bg-input px-3.5 py-2 text-xs text-text-main placeholder-text-muted outline-none transition-all focus:border-accent/40 focus:bg-bg-page focus:ring-1 focus:ring-accent/10"
              />
              <button
                type="submit"
                className="rounded-xl bg-accent hover:bg-accent-hover px-4 py-2 text-xs font-bold text-white shadow-lg shadow-accent/15 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>

          {/* Current Skills list */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Your Active Skills ({skills.length})
              </label>
              {skills.length > 0 && (
                <button 
                  onClick={handleReset}
                  className="text-xs font-bold text-accent hover:text-accent-hover transition-colors cursor-pointer"
                >
                  Reset Defaults
                </button>
              )}
            </div>
            {skills.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border-theme bg-bg-page/40 p-6 text-center">
                <p className="text-xs text-text-sub">No skills added yet.</p>
                <p className="mt-1 text-[11px] text-text-muted font-semibold">Add custom skills or tap the popular skills below.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent-bg border border-accent-border px-2.5 py-1 text-xs font-semibold text-accent transition-all"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="rounded hover:bg-accent/15 p-0.5 text-accent hover:text-accent-hover transition-colors cursor-pointer"
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
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              Popular Skills
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SKILLS.map((popSkill) => {
                const isSelected = skills.some(s => s.toLowerCase() === popSkill.toLowerCase());
                return (
                  <button
                    key={popSkill}
                    onClick={() => isSelected ? handleRemoveSkill(skills.find(s => s.toLowerCase() === popSkill.toLowerCase())) : handleAddSkill(popSkill)}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-accent-bg text-accent hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-500'
                        : 'border-border-theme bg-card text-text-sub hover:border-accent-border hover:bg-accent-bg hover:text-accent'
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
        <div className="border-t border-border-theme pt-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-bg-page border border-border-theme py-2.5 text-xs font-bold text-text-sub hover:text-text-main transition-all active:scale-[0.98] cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
