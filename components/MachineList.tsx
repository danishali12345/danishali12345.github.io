
import React from 'react';
import { HTBMachine, OS, Difficulty } from '../types';

interface MachineListProps {
  machines: HTBMachine[];
  onViewWriteup: (machine: HTBMachine) => void;
}

const MachineList: React.FC<MachineListProps> = ({ machines, onViewWriteup }) => {
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.EASY: return 'text-green-400';
      case Difficulty.MEDIUM: return 'text-yellow-400';
      case Difficulty.HARD: return 'text-orange-500';
      case Difficulty.INSANE: return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#111927] border border-gray-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#1c2533]">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Machine</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">OS</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Difficulty</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Points</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {machines.map((machine) => (
              <tr key={machine.id} className="hover:bg-gray-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={machine.avatarUrl} alt="" className="w-8 h-8 rounded-md object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <span className="font-bold text-white group-hover:text-[#9fef00] transition-colors">{machine.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-mono text-gray-400">{machine.os}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold uppercase tracking-tighter ${getDifficultyColor(machine.difficulty)}`}>
                    {machine.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-gray-500">{machine.points}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewWriteup(machine)}
                    className="text-[10px] font-bold uppercase tracking-widest text-htb-green hover:underline"
                  >
                    View Writeup
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachineList;
