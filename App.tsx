
import React, { useEffect, useState } from 'react';
import { fetchProjects, fetchContributions } from './services/githubService';
import { GitHubRepo, GitHubContribution, TimelineItem } from './types';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Expertise } from './components/Expertise';
import { AntiGravityText } from './components/AntiGravityText';

const App: React.FC = () => {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const linkedinUrl = "https://www.linkedin.com/in/aditya-pawar-557a56332/";

  const timeline: TimelineItem[] = [
    { year: "2019", title: "The Spark", desc: "Started journey from Madhya Pradesh, following my brother's footsteps into the digital world." },
    { year: "2020", title: "Technical Exploration", desc: "Mastered web basics and started experimenting with Python and mobile frameworks." },
    { year: "2023", title: "Engineering Era", desc: "Started professional engineering, diving deep into Java and systems architecture." },
    { year: "Current", title: "Learning & Building", desc: "Building scalable distributed backends and native Android experiences." }
  ];

  useEffect(() => {
    const loadData = async () => {
      const [projData, contData] = await Promise.all([
        fetchProjects('AdityaByte'),
        fetchContributions('AdityaByte')
      ]);
      setProjects(projData);
      setContributions(contData);
      setLoading(false);
    };
    loadData();
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle('light');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-700`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-[100] border-b ${isLightMode ? 'border-black/5 bg-white/70' : 'border-white/5 bg-black/70'} backdrop-blur-2xl transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className={`font-black tracking-tighter text-2xl z-[110] ${isLightMode ? 'text-black' : 'text-white'}`} onClick={(e) => scrollToSection(e, 'home')}>AP.</a>

          <div className="flex items-center gap-4 md:gap-10">
            <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`${isLightMode ? 'text-zinc-500 hover:text-black' : 'text-zinc-500 hover:text-white'} transition-colors`}>About</a>
              <a href="#expertise" onClick={(e) => scrollToSection(e, 'expertise')} className={`${isLightMode ? 'text-zinc-500 hover:text-black' : 'text-zinc-500 hover:text-white'} transition-colors`}>Expertise</a>
              <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className={`${isLightMode ? 'text-zinc-500 hover:text-black' : 'text-zinc-500 hover:text-white'} transition-colors`}>Projects</a>
              <a href="#oss" onClick={(e) => scrollToSection(e, 'oss')} className={`${isLightMode ? 'text-zinc-500 hover:text-black' : 'text-zinc-500 hover:text-white'} transition-colors`}>Open Source</a>
            </div>

            <div className="flex items-center gap-3">
              <a href="mailto:adityabyte@gmail.com" className={`px-6 py-2.5 rounded-full border transition-all text-xs font-black uppercase tracking-wider shadow-sm ${isLightMode ? 'border-black bg-black text-white hover:bg-zinc-800' : 'border-white bg-white text-black hover:bg-zinc-200'}`}>Hire Me</a>
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all outline-none ${isLightMode ? 'border-black/10 text-black hover:bg-black/5' : 'border-white/10 text-white hover:bg-white/5'}`}
                aria-label="Toggle Theme"
              >
                {isLightMode ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                )}
              </button>
            </div>

            <button className="lg:hidden z-[110] p-2" aria-label="Toggle Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className={`w-6 h-0.5 transition-all duration-300 ${isLightMode ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-1' : 'mb-1.5'}`}></div>
              <div className={`w-6 h-0.5 transition-all duration-300 ${isLightMode ? 'bg-black' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
            </button>
          </div>

          <div className={`fixed inset-0 transition-all duration-700 flex flex-col items-center justify-center gap-8 text-3xl font-black tracking-tighter lg:hidden z-[105] ${isLightMode ? 'bg-white text-black' : 'bg-black text-white'} ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
            <a href="#expertise" onClick={(e) => scrollToSection(e, 'expertise')}>Expertise</a>
            <a href="#work" onClick={(e) => scrollToSection(e, 'work')}>Projects</a>
            <a href="#oss" onClick={(e) => scrollToSection(e, 'oss')}>Open Source</a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">LinkedIn</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <Hero isLightMode={isLightMode} />
        <About isLightMode={isLightMode} timeline={timeline} />
        <Expertise isLightMode={isLightMode} />

        {/* Work Section */}
        <section id="work" className={`py-24 md:py-40 scroll-mt-24 border-t ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-4">Portfolio</h2>
              <h3 className={`text-4xl md:text-6xl font-black tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>Open Source.</h3>
            </div>
            <a href="https://github.com/AdityaByte" target="_blank" rel="noopener noreferrer" className={`text-sm font-black uppercase tracking-[0.2em] border-b-2 pb-2 transition-all group inline-flex items-center gap-3 ${isLightMode ? 'border-zinc-300 text-zinc-500 hover:border-black hover:text-black' : 'border-zinc-800 text-white hover:border-white'}`}>
              Explore GitHub <svg className="group-hover:translate-x-1.5 transition-transform duration-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7l7 7-7 7" /></svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {loading ? [1, 2, 3].map(i => <div key={i} className={`h-80 rounded-[2.5rem] md:rounded-[3rem] animate-pulse border ${isLightMode ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'}`}></div>) :
              projects.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className={`glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] group flex flex-col justify-between hover:scale-[1.03] transition-all border ${isLightMode ? 'border-black/5' : 'border-white/5 shadow-xl shadow-black/20'}`}>
                  <div>
                    <div className="flex justify-between items-start mb-8 md:mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl">📦</div>
                      <span className="text-[10px] font-black font-mono text-zinc-500 flex items-center gap-1 bg-zinc-500/5 px-3 py-1 rounded-full">⭐ {repo.stargazers_count}</span>
                    </div>
                    <h4 className={`text-xl md:text-2xl font-black mb-4 group-hover:text-blue-500 transition-colors leading-tight ${isLightMode ? 'text-black' : 'text-white'}`}>{repo.name}</h4>
                    <p className="text-zinc-500 text-xs md:text-sm font-medium leading-relaxed line-clamp-3">{repo.description}</p>
                  </div>
                  <div className={`mt-8 md:mt-10 flex justify-between items-center pt-6 md:pt-8 border-t ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em]">{repo.language || 'Code'}</span>
                    <svg className={`group-hover:rotate-45 transition-transform duration-500 ${isLightMode ? 'text-black' : 'text-white'}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17l10-10M7 7h10v10" /></svg>
                  </div>
                </a>
              ))
            }
          </div>
        </section>

        {/* Activity Feed */}
        <section id="oss" className={`py-24 md:py-40 scroll-mt-24 border-t ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 mb-16 text-center">Live Activity Feed</h2>
          <div className={`glass-card rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border shadow-2xl ${isLightMode ? 'border-black/5' : 'border-white/5 shadow-black/40'}`}>
            <div className={`p-8 md:p-14 border-b bg-gradient-to-r from-blue-500/5 to-transparent ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
              <h4 className={`text-2xl md:text-3xl font-black mb-3 ${isLightMode ? 'text-black' : 'text-white'}`}>Active Development</h4>
              <p className="text-zinc-500 text-sm md:text-base font-medium">Real-time sync with global GitHub events API.</p>
            </div>
            <div className={`divide-y ${isLightMode ? 'divide-black/5' : 'divide-white/5'}`}>
              {loading ? <div className="p-20 text-center text-zinc-500 font-bold tracking-widest uppercase text-xs">Fetching latest data...</div> :
                contributions.map(item => (
                  <div key={item.id} className="p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className={`px-3 py-1 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest ${item.type.includes('Push') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        {item.type}
                      </span>
                      <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className={`text-lg md:text-xl font-bold transition-all ${isLightMode ? 'text-black hover:text-blue-500' : 'text-white hover:text-blue-400'}`}>{item.repo}</a>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-12">
                      <span className="text-zinc-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{item.action}</span>
                      <span className="text-zinc-400 font-black font-mono text-xs">{item.date}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className="py-40 md:py-64 text-center scroll-mt-24">
          <h2 className={`text-4xl md:text-9xl font-black tracking-tighter mb-10 md:mb-12 leading-[0.8] ${isLightMode ? 'text-black' : 'text-white'}`}>Let's architect <br /> the next big thing.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <a href="mailto:adityabyte@gmail.com" className={`inline-block px-10 md:px-14 py-5 md:py-6 rounded-full font-black text-base md:text-lg transition-all active:scale-95 shadow-2xl ${isLightMode ? 'bg-black text-white hover:bg-zinc-800 shadow-black/20' : 'bg-white text-black hover:bg-zinc-200 shadow-white/10'}`}>
              INITIATE CHAT
            </a>
            <a href={linkedinUrl} target="_blank" className={`inline-block px-10 md:px-14 py-5 md:py-6 rounded-full font-black text-base md:text-lg border transition-all ${isLightMode ? 'bg-white text-black border-black/10 hover:bg-zinc-50' : 'bg-zinc-900 text-white border-white/5 hover:bg-zinc-800 shadow-xl shadow-black/40'}`}>
              LINKEDIN
            </a>
          </div>
        </section>
      </main>

      <footer className={`pt-24 md:pt-32 pb-6 border-t transition-colors ${isLightMode ? 'border-black/5 bg-zinc-50' : 'border-white/5 bg-black'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16 md:mb-20">
            <div className={`text-4xl font-[900] tracking-tighter cursor-pointer ${isLightMode ? 'text-black' : 'text-white'}`} onClick={(e) => scrollToSection(e as any, 'home')}>AP.</div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">
              <a href="https://github.com/AdityaByte" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div id="footer-gravity-wrapper" className="w-full pointer-events-none mt-auto">
          <AntiGravityText isLight={isLightMode} />
        </div>
      </footer>
    </div>
  );
};

export default App;
