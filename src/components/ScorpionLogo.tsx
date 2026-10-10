import React, { useState } from 'react';
import { LOGO_URL } from '../data/mockData';

interface ScorpionLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const ScorpionLogo: React.FC<ScorpionLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  }[size];

  const textClasses = {
    sm: { title: 'text-sm', sub: 'text-[9px]' },
    md: { title: 'text-lg', sub: 'text-[11px]' },
    lg: { title: 'text-2xl', sub: 'text-[12px]' },
    xl: { title: 'text-3xl', sub: 'text-[14px]' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${sizeClasses} flex-shrink-0 flex items-center justify-center`}>
        {!imageError ? (
          <img
            src={LOGO_URL}
            alt="Scorpion Performance Contractors Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(204,0,0,0.45)]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full rounded bg-gradient-to-br from-[#1F2229] to-[#0d0e11] border border-[#cc0000]/60 flex items-center justify-center p-1 shadow-lg shadow-[#cc0000]/20">
            {/* High-detail SVG metallic red scorpion emblem */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#cc0000]" fill="currentColor">
              {/* Scorpion silhouette with pincers and stinger */}
              <path d="M50 15 C45 25 40 35 44 48 C46 54 47 62 48 70 C49 76 50 82 55 86 C60 82 61 76 62 70 C63 62 64 54 66 48 C70 35 65 25 60 15 C56 12 54 12 50 15 Z" fill="#b30000" />
              {/* Segments */}
              <path d="M48 70 C48 80 44 88 38 92 C34 94 32 90 34 86 C38 80 43 72 45 65 Z" fill="#e60000" />
              <path d="M34 86 C28 88 22 84 22 78 C22 72 26 66 32 64 C36 63 38 66 37 70 C34 74 30 76 28 80 Z" fill="#ff4d4d" />
              {/* Claws Left */}
              <path d="M44 40 C34 36 24 38 18 45 C14 50 12 60 16 64 C20 68 28 66 32 60 C36 54 40 46 44 40 Z" fill="#cc0000" />
              <path d="M22 42 C16 34 18 24 24 20 C28 17 32 20 32 24 C32 28 28 34 22 42 Z" fill="#990000" />
              {/* Claws Right */}
              <path d="M66 40 C76 36 86 38 92 45 C96 50 98 60 94 64 C90 68 82 66 78 60 C74 54 70 46 66 40 Z" fill="#cc0000" />
              <path d="M88 42 C94 34 92 24 86 20 C82 17 78 20 78 24 C78 28 82 34 88 42 Z" fill="#990000" />
              {/* Stinger Tip */}
              <polygon points="26,76 20,72 24,80" fill="#ffd700" />
            </svg>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-['Space_Grotesk'] font-bold uppercase tracking-tight text-[#F5F4F0] leading-none ${textClasses.title}`}>
              Scorpion Performance
            </span>
          </div>
          <span className={`font-['JetBrains_Mono'] text-[#9E9E98] tracking-widest uppercase mt-0.5 ${textClasses.sub}`}>
            Contractors // San Antonio, TX
          </span>
        </div>
      )}
    </div>
  );
};
