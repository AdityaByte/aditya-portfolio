
import React from 'react';

interface HeroProps {
  isLightMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLightMode }) => {
  return (
    <section id="home" className="pt-32 md:pt-60 pb-20 md:pb-40">
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm ${isLightMode ? 'bg-zinc-100 border-zinc-200 text-zinc-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        Engineering resilient architectures
      </div>
      <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-[900] tracking-tighter mb-8 text-gradient leading-[0.8]">
        Aditya <br /> Pawar
      </h1>
      <p className={`max-w-4xl text-xl md:text-4xl font-light leading-snug ${isLightMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
        Architecting <span className={isLightMode ? 'text-black font-medium underline decoration-zinc-300 underline-offset-8' : 'text-white underline decoration-zinc-700 underline-offset-8'}>high-stakes digital experiences</span> with precision and performance.
      </p>
    </section>
  );
};
