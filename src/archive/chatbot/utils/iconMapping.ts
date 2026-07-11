import {
  MessageCircle,
  Handshake,
  User,
  Code2,
  Briefcase,
  FileText,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Phone,
  MapPin,
  HelpCircle,
  Globe,
  Award,
  Zap,
  Database,
  Settings,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

// Icon configuration with name and icon component
export interface IconConfig {
  name: string;
  icon: LucideIcon;
  color?: string;
}

// Map of icon identifiers to Lucide components
export const iconMap: Record<string, IconConfig> = {
  // General
  chat: { name: 'MessageCircle', icon: MessageCircle, color: 'text-blue-500' },
  collaboration: { name: 'Handshake', icon: Handshake, color: 'text-purple-500' },
  user: { name: 'User', icon: User, color: 'text-gray-600' },
  help: { name: 'HelpCircle', icon: HelpCircle, color: 'text-blue-500' },
  lightbulb: { name: 'Lightbulb', icon: Lightbulb, color: 'text-yellow-500' },
  checkmark: { name: 'CheckCircle', icon: CheckCircle, color: 'text-green-500' },
  arrow: { name: 'ArrowRight', icon: ArrowRight, color: 'text-gray-500' },

  // Technical
  code: { name: 'Code2', icon: Code2, color: 'text-emerald-500' },
  database: { name: 'Database', icon: Database, color: 'text-indigo-500' },
  settings: { name: 'Settings', icon: Settings, color: 'text-gray-600' },
  zap: { name: 'Zap', icon: Zap, color: 'text-yellow-500' },

  // Experience & Achievements
  briefcase: { name: 'Briefcase', icon: Briefcase, color: 'text-blue-600' },
  award: { name: 'Award', icon: Award, color: 'text-amber-500' },
  globe: { name: 'Globe', icon: Globe, color: 'text-blue-400' },

  // Contact & CV
  filetext: { name: 'FileText', icon: FileText, color: 'text-red-500' },
  mail: { name: 'Mail', icon: Mail, color: 'text-red-500' },
  linkedin: { name: 'Linkedin', icon: Linkedin, color: 'text-blue-600' },
  github: { name: 'Github', icon: Github, color: 'text-gray-800' },
  twitter: { name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  phone: { name: 'Phone', icon: Phone, color: 'text-green-500' },
  mappin: { name: 'MapPin', icon: MapPin, color: 'text-red-500' }
};

// Get icon by key
export const getIcon = (iconKey: string): LucideIcon => {
  return iconMap[iconKey]?.icon || MessageCircle;
};

// Get icon with color
export const getIconWithColor = (iconKey: string): IconConfig => {
  return iconMap[iconKey] || { name: 'MessageCircle', icon: MessageCircle, color: 'text-gray-600' };
};

// Format response with icon references
export const formatResponseWithIcons = (response: string): string => {
  // This function can be extended to handle special icon markers in responses
  // For example: "[mail] Email:" could be replaced with formatted output
  return response;
};

// Get all available icons
export const getAvailableIcons = (): string[] => {
  return Object.keys(iconMap);
};
