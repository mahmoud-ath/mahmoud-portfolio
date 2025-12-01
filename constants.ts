import { Project, Experience, Testimonial, Certification } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  email: "malikaamirdev@gmail.com"
};

export const SKILLS = [
  "JavaScript/TypeScript", "React Native/React Js", "Firebase", "Firestore", "Cognito",
  "Node.js", "Express.js", "AWS", "MongoDB", "Serverless"
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'algoace',
    company: 'Algoace',
    role: 'Full Stack Developer @ Algoace',
    date: 'November 2022 - Present',
    location: 'Onsite',
    description: 'During my tenure at Algoace, a prominent software company, I have held the position of a Full Stack Hybrid Mobile Application Developer. In this role, I have adeptly utilized technologies such as React Native, AWS Microservices, and Firebase to contribute to the development and enhancement of cutting-edge mobile applications.'
  },
  {
    id: 'freelance',
    company: 'Upwork & Fiver',
    role: 'Freelance Full Stack Developer',
    date: 'Jan 2020 - Nov 2022',
    location: 'Remote',
    description: 'Worked with diverse clients globally to deliver high-quality web and mobile solutions. Specialized in React Native for cross-platform mobile apps and Node.js for backend services.'
  },
  {
    id: 'softstings',
    company: 'Softstings',
    role: 'Junior Developer',
    date: 'Jun 2019 - Dec 2019',
    location: 'Onsite',
    description: 'Started my journey as a junior developer assisting in UI/UX implementation and basic backend logic for web applications.'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'X-Dividend Mobile App',
    description: 'The app offers comprehensive data on companies, including categories of Most Actives, Gainers and Losers Stock Market. Users can sort the information by sector, name, highest or lowest price, dividend date, and ex-dividend date.',
    tags: ['React Native', 'Hybrid Mobile App', 'Android', 'iOS'],
    image: 'https://picsum.photos/800/600?random=1',
    featured: true
  },
  {
    id: '2',
    title: 'Interect Family Chat App',
    description: 'Interact is a revolutionary mobile app designed to help families connect with other families and promote social interaction. With Interact, families can easily find and connect with other families in their local area.',
    tags: ['React Native', 'Hybrid Mobile App', 'Android', 'iOS'],
    image: 'https://picsum.photos/800/600?random=2',
    featured: true
  },
  {
    id: '3',
    title: 'ShareIt: Share & Win',
    description: 'ShareIt is an innovative mobile application that empowers users to share their stories and engage with a community of like-minded individuals.',
    tags: ['React Native', 'Hybrid Mobile App', 'Android', 'iOS'],
    image: 'https://picsum.photos/800/600?random=3',
    featured: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Lauren', source: 'Fiver', text: '"Wonderful service and even better customer service. This was a great experience!"', theme: 'light' },
  { id: '2', name: 'Christopher Peters', source: 'Upwork', text: '"Great work, flexible on making changes, helped me understand choices made where there was ambiguity in the request. Will hire again!"', theme: 'dark' },
  { id: '3', name: 'Tony Yim', source: 'Fiver', text: '"this seller is amazing, my current developer can\'t fix it, but he can."', theme: 'light' },
  { id: '4', name: 'Colin', source: 'Fiver', text: '"He jumped through a bunch if hoops and hurdles to deliver a great job. Thanks"', theme: 'dark' },
];

export const CERTIFICATIONS: Certification[] = [
  { id: '1', title: 'Full Stack Developer', issuer: 'DigiPakistan', date: 'Dec 2023', image: 'https://picsum.photos/100/100?random=10' },
  { id: '2', title: 'MERN Stack Developer', issuer: 'Jawan Pakistan', date: 'Feb 2022', image: 'https://picsum.photos/100/100?random=11' },
  { id: '3', title: 'AWS MicroServices', issuer: 'Self Learning', date: 'Aug 2022', image: 'https://picsum.photos/100/100?random=12' },
];
