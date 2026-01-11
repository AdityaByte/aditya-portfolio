
import React from 'react';

interface ExpertiseProps {
  isLightMode: boolean;
}

export const Expertise: React.FC<ExpertiseProps> = ({ isLightMode }) => {
  return (
    <section id="expertise" className="py-24 md:py-40 scroll-mt-24">
      <div className="mb-16 md:mb-20">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-4">The Stack</h2>
        <h3 className={`text-4xl md:text-7xl font-black tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>Technical Toolkit.</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className={`md:col-span-4 glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden group border ${isLightMode ? 'shadow-2xl shadow-black/5' : ''}`}>
          <div className="absolute -right-12 -bottom-12 text-[10rem] md:text-[12rem] opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 rotate-12 pointer-events-none">⚙️</div>
          <div className="relative z-10">
            <div className="text-blue-500 text-xs font-black uppercase tracking-widest mb-4">Core Systems</div>
            <h4 className={`text-2xl md:text-3xl font-black mb-6 md:mb-8 ${isLightMode ? 'text-black' : 'text-white'}`}>Architecture</h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {["Java", "Python", "Spring Boot", "Redis", "Kafka", "PostgreSQL", "API Design", "Microservices", "Golang"].map(t => (
                <span key={t} className={`px-4 md:px-5 py-2 md:py-2.5 border rounded-2xl text-[10px] md:text-xs font-black tracking-wider uppercase transition-all duration-300 ${isLightMode ? 'bg-white border-black/5 text-zinc-700 hover:border-black hover:text-black hover:shadow-lg' : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white hover:text-white'}`}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={`md:col-span-2 md:row-span-2 glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] relative group overflow-hidden border ${isLightMode ? 'bg-zinc-50 border-black/5' : 'bg-gradient-to-b from-zinc-900 to-black border-white/5'}`}>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-[8rem] md:text-[10rem] opacity-[0.03] rotate-[30deg] pointer-events-none">⚡</div>
          <h4 className={`text-2xl md:text-3xl font-black mb-10 md:mb-12 ${isLightMode ? 'text-black' : 'text-white'}`}>Languages</h4>
          <ul className="space-y-6 md:space-y-8">
            {[
              { name: "Java", level: "Expert" },
              { name: "Python", level: "Advanced" },
              { name: "TypeScript", level: "Intermediate" },
              { name: "Golang", level: "Intermediate" },
              { name: "Elixir", level: "Explorer" }
            ].map(l => (
              <li key={l.name} className={`flex justify-between items-end border-b pb-3 ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
                <span className={`text-lg md:text-xl font-bold ${isLightMode ? 'text-zinc-800' : 'text-zinc-200'}`}>{l.name}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`md:col-span-2 glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] relative group border ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
          <div className="text-emerald-500 text-xs font-black uppercase tracking-widest mb-4">Mobile</div>
          <h4 className={`text-xl md:text-2xl font-black mb-4 md:mb-6 ${isLightMode ? 'text-black' : 'text-white'}`}>Native Android</h4>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8 font-medium">Deep expertise in XML layouts and high-performance native implementations.</p>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider">STABLE</span>
            <span className={`px-3 py-1 border rounded-xl text-[10px] font-black uppercase tracking-wider ${isLightMode ? 'bg-zinc-100 border-black/5 text-zinc-500' : 'bg-white/5 border-white/10 text-zinc-500'}`}>JAVA-XML</span>
          </div>
        </div>

        <div className={`md:col-span-2 glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] relative group border ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
          <div className="text-orange-500 text-xs font-black uppercase tracking-widest mb-4">Web</div>
          <h4 className={`text-xl md:text-2xl font-black mb-4 md:mb-6 ${isLightMode ? 'text-black' : 'text-white'}`}>Modern Interface</h4>
          <div className="flex flex-wrap gap-4">
            {["Next.js", "React", "Tailwind", "Motion"].map(f => (
              <span key={f} className="text-xs md:text-sm font-black text-zinc-500 hover:text-orange-500 transition-colors cursor-default tracking-wider">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
