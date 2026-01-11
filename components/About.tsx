
import React from 'react';
import { TimelineItem } from '../types';

interface AboutProps {
  isLightMode: boolean;
  timeline: TimelineItem[];
}

export const About: React.FC<AboutProps> = ({ isLightMode, timeline }) => {
  return (
    <section id="about" className={`py-24 md:py-32 scroll-mt-24 border-t ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-10">The Narrative</h2>
          <div className={`space-y-6 md:space-y-8 text-lg md:text-2xl leading-relaxed font-light ${isLightMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
            <p>
              My journey ignited in <span className={isLightMode ? 'text-black font-semibold' : 'text-white'}>2019</span>. What started as curiosity in Class 11th blossomed into a deep-seated passion for engineering elegant solutions to complex problems.
            </p>
            <p>
              From the early days of Python experimentation to entering engineering school in <span className={isLightMode ? 'text-black font-semibold' : 'text-white'}>2023</span>, I've evolved from a curious builder into a disciplined architect of scalable systems.
            </p>
            <p>
              Currently focused on <span className={isLightMode ? 'text-black font-semibold' : 'text-white'}>distributed backends</span> and <span className={isLightMode ? 'text-black font-semibold' : 'text-white'}>native performance</span>, I thrive where engineering meets impactful user experience.
            </p>
          </div>
        </div>
        <div className="relative pl-8 md:pl-10">
          <div className={`absolute left-0 top-2 bottom-2 w-px ${isLightMode ? 'bg-zinc-200' : 'bg-zinc-800'}`}></div>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-10 ml-6">Key Milestones</h2>
          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group ml-6">
                <div className={`absolute -left-[30px] top-2 w-3 h-3 rounded-full transition-all duration-500 ring-8 ${isLightMode ? 'bg-zinc-300 ring-white' : 'bg-zinc-800 ring-black'} group-hover:bg-blue-500 group-hover:scale-125 group-hover:ring-blue-500/20`}></div>
                <span className="text-blue-500 font-black font-mono text-sm block mb-2 tracking-widest">{item.year}</span>
                <h3 className={`font-black mb-1 text-xl ${isLightMode ? 'text-black' : 'text-white'}`}>{item.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
