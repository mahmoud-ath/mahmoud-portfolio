import React from 'react';
import { getIcon, getIconWithColor } from '../utils/iconMapping';

interface IconResponseProps {
  content: string;
}

export const IconResponse: React.FC<IconResponseProps> = ({ content }) => {
  // Split content by lines first
  const lines = content.split('\n');
  
  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIndex) => {
        if (!line.trim()) {
          return <div key={lineIndex} className="h-1" />; // Empty line spacing
        }

        // Check if line starts with an icon marker [iconName]
        const iconMatch = line.match(/^\s*\[(\w+)\]\s*(.+)$/);
        
        if (iconMatch) {
          const iconName = iconMatch[1];
          const Icon = getIcon(iconName);
          const iconConfig = getIconWithColor(iconName);
          const text = iconMatch[2];

          return (
            <div key={lineIndex} className="flex items-start gap-2">
              <Icon
                size={16}
                className={`flex-shrink-0 mt-0.5 ${iconConfig.color || 'text-gray-600'}`}
              />
              <span className="text-sm leading-relaxed">
                {text}
              </span>
            </div>
          );
        } else {
          // Regular text without icon
          return (
            <p key={lineIndex} className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {line}
            </p>
          );
        }
      })}
    </div>
  );
};

export default IconResponse;
