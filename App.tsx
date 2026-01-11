
import React, { useState, useMemo, useEffect } from 'react';
import { HTB_MACHINES, USER_STATS } from './constants';
import { HTBMachine, OS } from './types';
import Terminal from './components/Terminal';
import MachineCard from './components/MachineCard';
import MachineList from './components/MachineList';
import StatsOverview from './components/StatsOverview';
import WriteupView from './components/WriteupView';

const App: React.FC = () => {
  const [selectedMachine, setSelectedMachine] = useState<HTBMachine | null>(null);
  const [search, setSearch] = useState('');
  const [filterOS, setFilterOS] = useState<OS | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMachines = useMemo(() => {
    return HTB_MACHINES.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesOS = filterOS === 'All' || m.os === filterOS;
      return matchesSearch && matchesOS;
    });
  }, [search, filterOS]);

  const handleViewWriteup = (machine: HTBMachine) => {
    setSelectedMachine(machine);
  };

  // Prevent background scroll when writeup is open
  useEffect(() => {
    if (selectedMachine) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedMachine]);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-300 pb-24">
      {/* Header */}
      <nav className="border-b border-gray-800 bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-htb-green rounded flex items-center justify-center">
              <span className="text-black font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-white tracking-tighter text-xl">Danish Ali</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-semibold">
            <a href="#" className="text-htb-green">Dashboard</a>
            <a href="#htb" className="hover:text-white transition-colors">Machines</a>
            <a href="#" className="hover:text-white transition-colors">Writeups</a>
            <a href="#" className="hover:text-white transition-colors">Connect</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Security <span className="text-htb-green">Researcher</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-lg">
                Specializing in Application and Network Penetration Testing. 
                Actively ranking in the top 50 on Hack The Box Pakistan.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-htb-green text-black font-bold rounded-lg hover:brightness-110 transition-all">
                Download CV
              </button>
            </div>
          </div>
          
          <Terminal />
        </div>

        {/* HTB Section */}
        <section id="htb">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">Hack The Box</h2>
            <div className="h-px flex-1 bg-gray-800"></div>
          </div>

          <StatsOverview stats={USER_STATS} />

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search machines..." 
                className="w-full bg-[#111927] border border-gray-800 rounded-lg px-10 py-3 focus:border-htb-green outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex gap-4">
              {/* OS Filters */}
              <div className="flex gap-1 bg-[#111927] p-1 rounded-lg border border-gray-800">
                {(['All', OS.LINUX, OS.WINDOWS] as const).map(os => (
                  <button
                    key={os}
                    onClick={() => setFilterOS(os)}
                    className={`px-3 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-widest transition-all ${
                      filterOS === os 
                      ? 'bg-htb-green text-black' 
                      : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {os}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-[#111927] p-1 rounded-lg border border-gray-800">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-700 text-htb-green' : 'text-gray-500 hover:text-white'}`}
                  title="Grid View"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-700 text-htb-green' : 'text-gray-500 hover:text-white'}`}
                  title="List View"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Machine Content */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMachines.map(machine => (
                <MachineCard 
                  key={machine.id} 
                  machine={machine} 
                  onViewWriteup={handleViewWriteup}
                />
              ))}
            </div>
          ) : (
            <MachineList 
              machines={filteredMachines} 
              onViewWriteup={handleViewWriteup} 
            />
          )}
          
          {filteredMachines.length === 0 && (
            <div className="text-center py-20 bg-[#111927] rounded-xl border border-dashed border-gray-800">
              <p className="text-gray-500 italic">No machines found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>

      {/* Full Screen Writeup Overlay */}
      {selectedMachine && (
        <WriteupView 
          machine={selectedMachine} 
          onClose={() => setSelectedMachine(null)} 
        />
      )}

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold mb-2 uppercase tracking-tighter">HTB_Portfolio</h4>
            <p className="text-gray-500 text-sm">Built with React, Tailwind, and JetBrains Mono.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-htb-green transition-colors">GitHub</a>
            <a href="#" className="text-gray-500 hover:text-htb-green transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-htb-green transition-colors">HackTheBox</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
