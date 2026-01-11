
import React from 'react';
import { HTBMachine, OS, Difficulty } from '../types';

interface MachineCardProps {
  machine: HTBMachine;
  onViewWriteup: (machine: HTBMachine) => void;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine, onViewWriteup }) => {
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.EASY: return 'text-green-400 bg-green-400/10';
      case Difficulty.MEDIUM: return 'text-yellow-400 bg-yellow-400/10';
      case Difficulty.HARD: return 'text-orange-500 bg-orange-500/10';
      case Difficulty.INSANE: return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getOSIcon = (os: OS) => {
    switch (os) {
      case OS.LINUX:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.15 2c-.17 0-.34.01-.5.03C8.6 2.45 6.46 5.54 6.46 9.21c0 2.22.78 4.22 2.06 5.76-1.55 1.05-3.03 2.1-4.14 2.82l-.4.26c-.45.28-.58.87-.29 1.32.28.45.87.58 1.32.29l.4-.26c1.11-.72 2.6-1.78 4.14-2.82 1.32.93 2.91 1.48 4.63 1.48s3.31-.55 4.63-1.48c1.55 1.05 3.03 2.1 4.14 2.82l.4.26c.45.28 1.04.16 1.32-.29s.16-1.04-.29-1.32l-.4-.26c-1.11-.72-2.6-1.78-4.14-2.82 1.28-1.54 2.06-3.54 2.06-5.76 0-3.67-2.14-6.76-5.19-7.18-.16-.02-.33-.03-.5-.03h-.01zM10.15 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
          </svg>
        );
      case OS.WINDOWS:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1V11.7H0V3.449zm0 17.102L9.75 21.9V12.3H0v8.251zM10.5 2L24 0v11.7H10.5V2zm0 19.999L24 24v-11.7H10.5v9.699z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group bg-[#111927] border border-gray-800 hover:border-[#9fef00] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={machine.avatarUrl} 
          alt={machine.name} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute top-4 right-4 bg-[#0b0e14]/80 backdrop-blur-sm p-2 rounded-lg text-[#9fef00]">
          {getOSIcon(machine.os)}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${getDifficultyColor(machine.difficulty)}`}>
            {machine.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-[#9fef00] transition-colors">{machine.name}</h3>
          <span className="text-gray-500 font-mono text-sm">{machine.points} pts</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {machine.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>

        <button 
          onClick={() => onViewWriteup(machine)}
          className="w-full py-2 bg-gray-800 hover:bg-[#9fef00] hover:text-black text-gray-300 font-bold text-xs uppercase tracking-widest rounded-lg transition-all"
        >
          View Writeup
        </button>
      </div>
    </div>
  );
};

export default MachineCard;
