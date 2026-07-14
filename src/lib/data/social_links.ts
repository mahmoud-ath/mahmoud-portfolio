import { Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const SOCIAL_LINKS_DATA = {
  github: "https://github.com/mahmoud-ath",
  instagram: "https://instagram.com/mahmoudelgharib1",
  linkedin: "https://linkedin.com/in/mahmoud-el-gharib",
  email: "elgharib.mahmoud2@gmail.com",
  wattsaps: "https://wa.me/+212777440052"
};

export const SOCIAL_LINKS = [
  { icon: Mail, label: 'Email', href: `mailto:${SOCIAL_LINKS_DATA.email}`, color: 'text-themeRed' },
  { icon: Github, label: 'GitHub', href: SOCIAL_LINKS_DATA.github, color: 'text-gray-300' },
  { icon: Linkedin, label: 'LinkedIn', href: SOCIAL_LINKS_DATA.linkedin, color: 'text-gray-300' },
  { icon: Instagram, label: 'Instagram', href: SOCIAL_LINKS_DATA.instagram, color: 'text-gray-300' },
  { icon: FaWhatsapp, label: 'Wattsaps', href: SOCIAL_LINKS_DATA.wattsaps, color: 'text-green-400' },
];

