
import React, { useState, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "whoami\ndanish ali\n./start_portfolio.sh\nInitializing HTB systems...\nAccess Granted.\nWelcome back, Operator.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111927] border border-gray-800 rounded-lg overflow-hidden shadow-2xl mono text-sm h-48 md:h-64 mb-12">
      <div className="bg-[#1c2533] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        <span className="text-gray-500 ml-2 text-xs">zsh — 80x24</span>
      </div>
      <div className="p-4 text-[#9fef00] leading-relaxed">
        <pre className="whitespace-pre-wrap">
          <span className="text-blue-400">➜ </span>
          {text}
          <span className="animate-pulse">_</span>
        </pre>
      </div>
    </div>
  );
};

export default Terminal;
