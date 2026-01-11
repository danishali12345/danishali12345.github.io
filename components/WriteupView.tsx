
import React from 'react';
import { HTBMachine, WriteupSection } from '../types';

interface WriteupViewProps {
  machine: HTBMachine;
  onClose: () => void;
}

const WriteupView: React.FC<WriteupViewProps> = ({ machine, onClose }) => {
  const renderSection = (title: string, sections: WriteupSection[] | undefined, accentColor: string) => {
    if (!sections || sections.length === 0) return null;

    return (
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className={accentColor}>#</span> {title}
        </h2>
        <div className="space-y-12">
          {sections.map((step, i) => (
            <div key={i} className="group">
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {step.content}
              </p>
              
              <div className="space-y-6">
                {step.imageUrls && step.imageUrls.length > 0 && (
                  <div className="flex flex-col gap-6">
                    {step.imageUrls.map((url, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-800 bg-[#0b0e14]">
                        <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-gray-400 font-mono border border-white/10">
                          SCREENSHOT_{idx + 1}
                        </div>
                        <img 
                          src={url} 
                          alt={`${step.title} Screenshot ${idx + 1}`} 
                          className="w-full h-auto object-cover max-h-[600px] hover:scale-[1.01] transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {step.code && (
                  <div className={`bg-[#0b0e14] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-hidden ${accentColor === 'text-[#9fef00]' ? 'text-[#9fef00]' : accentColor === 'text-blue-400' ? 'text-blue-400' : 'text-red-400'}`}>
                    <div className="flex items-center justify-between mb-2 border-b border-gray-800 pb-2">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Console Output</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                      </div>
                    </div>
                    <pre className="overflow-x-auto py-2"><code>{step.code}</code></pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0b0e14] overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 z-50 bg-[#0b0e14]/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to machines
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#9fef00] font-mono text-sm">{machine.name.toUpperCase()}</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-xs font-mono">{machine.ipAddress}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-12 border border-gray-800">
          <img src={machine.avatarUrl} alt={machine.name} className="w-full h-full object-cover brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tighter">{machine.name}</h1>
            <p className="text-[#9fef00] font-mono uppercase tracking-widest text-sm">
              Hack The Box Writeup • {machine.difficulty} • {machine.os}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'IP Address', value: machine.ipAddress },
            { label: 'OS', value: machine.os },
            { label: 'Difficulty', value: machine.difficulty },
            { label: 'Points', value: `${machine.points} pts` },
          ].map((item, i) => (
            <div key={i} className="bg-[#111927] border border-gray-800 p-4 rounded-xl">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-white font-bold text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-[#9fef00]">#</span> Introduction
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {machine.description || `An detailed overview of the exploitation process for ${machine.name}. This machine covers various concepts including network enumeration, initial access vulnerabilities, and local privilege escalation to root/administrator.`}
            </p>
          </section>

          {renderSection('Enumeration', machine.enumeration, 'text-[#9fef00]')}
          {renderSection('Foothold', machine.foothold, 'text-blue-400')}
          {renderSection('Privilege Escalation', machine.privEsc, 'text-red-400')}

          <section className="bg-htb-green/5 border border-htb-green/20 p-10 rounded-2xl text-center">
            <div className="inline-block p-3 rounded-full bg-htb-green/10 mb-4">
              <svg className="w-8 h-8 text-htb-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-htb-green mb-2">Pwned!</h2>
            <p className="text-gray-400 mb-8">User and Root flags captured successfully. Target system fully compromised.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
               <div className="bg-[#111927] border border-gray-800 px-6 py-3 rounded-xl flex items-center gap-3">
                 <span className="text-gray-500 text-xs font-mono">user.txt</span>
                 <span className="text-htb-green font-mono font-bold tracking-widest">a87...f32</span>
               </div>
               <div className="bg-[#111927] border border-gray-800 px-6 py-3 rounded-xl flex items-center gap-3">
                 <span className="text-gray-500 text-xs font-mono">root.txt</span>
                 <span className="text-htb-green font-mono font-bold tracking-widest">8b1...e09</span>
               </div>
            </div>
          </section>
        </div>
      </div>
      
      <footer className="py-20 border-t border-gray-800 mt-20 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1 h-1 rounded-full bg-gray-800"></div>
          <div className="w-1 h-1 rounded-full bg-gray-800"></div>
          <div className="w-1 h-1 rounded-full bg-gray-800"></div>
        </div>
        <p className="text-gray-600 text-sm font-mono tracking-widest uppercase">END OF TRANSMISSION // 2024</p>
      </footer>
    </div>
  );
};

export default WriteupView;
