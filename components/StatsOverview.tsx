
import React from 'react';
import { UserStats } from '../types';

interface StatsOverviewProps {
  stats: UserStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
      {[
        { label: 'Rank', value: stats.rank, color: 'text-[#9fef00]' },
        { label: 'Points', value: stats.points, color: 'text-white' },
        { label: 'Machines', value: stats.machinesSolved, color: 'text-white' },
        { label: 'Challenges', value: stats.challengesSolved, color: 'text-white' },
        { label: 'Pakistan Rank', value: `#${stats.pakistanRanking}`, color: 'text-white' },
      ].map((stat, i) => (
        <div key={i} className="bg-[#111927] border border-gray-800 p-4 rounded-xl text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
          <p className={`text-xl font-bold mono ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
