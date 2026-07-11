import { Message } from '../types';
import { matchIntent } from './intentMatcher';
import { searchDocuments } from './documentSearch';

const fallbackResponses = [
  "That's an interesting question! While I don't have a specific answer, I'd love to learn more. Feel free to ask about my skills, projects, experience, or let's discuss how we might collaborate!",
  "I'm always learning! Though I'm not sure about that specific topic, I can definitely help you explore my background, work, or discuss potential opportunities. What sparks your interest?",
  "Great curiosity! I might not have covered that exact topic, but I'm confident I can help with information about my expertise, projects, or how we can work together. What would you like to know?",
  "That's a thoughtful question! I'm here to help with information about my professional background, technical skills, projects, or to discuss collaboration. What matters most to you?",
  "Hmm, that's not something I'm familiar with, but I'm here to help! Ask me about my work, skills, projects, or if you're interested in collaborating on something—I'd love to hear your ideas!"
];

// Project mapping with slugs for redirect
const projectMap: Record<string, { slug: string; snippet: string; title: string }> = {
  'cmh': {
    slug: 'cmh-data-management-system',
    title: 'Centralized Data Management System for Cloud Marketing Hub',
    snippet: 'Centralized system processing 500K+ monthly emails, 65% task reduction, RBAC + 2FA security for 400+ employees. Built during internship at Cloud Marketing Hub (April-June 2025).'
  },
  'smartmaint': {
    slug: 'smartmaint-predictive-maintenance',
    title: 'SmartMaint - Predictive Maintenance System',
    snippet: 'Predictive Maintenance system with 92% accuracy using Random Forest & IoT sensors. Reduced unplanned downtime by 40% and maintenance costs by 35%.'
  },
  'morocco': {
    slug: 'morocco-road-accidents-analysis',
    title: 'Statistical Analysis of Road Accidents in Morocco',
    snippet: 'Interactive dashboard analyzing 50K+ accident records with geospatial visualizations. Provides safety insights for urban planning and accident prevention.'
  },
  'tech horizon': {
    slug: 'tech-horizon-magazine',
    title: 'Tech Horizon - Full-Stack Web Application',
    snippet: 'Online magazine with multi-role system (visitor, subscriber, manager, admin). Features article management, real-time analytics, and comprehensive access control.'
  },
  'energy': {
    slug: 'energy-consumption-prediction-cart',
    title: 'Energy Consumption Prediction Using CART',
    snippet: 'CART regression model for predicting energy consumption patterns. Achieves high accuracy in peak demand forecasting and optimization.'
  },
  'watchly': {
    slug: 'watchly-ai',
    title: 'Watchly AI',
    snippet: 'Your Movie Discovery Companion.Watchly: Discover, Track, Share. Your all-in-one hub for movies & TV. Search millions of titles, save your watchlist, and share recommendations—all powered by TMDB API.'
  }
};

// Detect project-specific questions
const detectProjectQuery = (userMessage: string): { project: string; slug: string; title: string; snippet: string } | null => {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [key, projectData] of Object.entries(projectMap)) {
    if (lowerMessage.includes(key)) {
      return {
        project: key,
        slug: projectData.slug,
        title: projectData.title,
        snippet: projectData.snippet
      };
    }
  }
  
  return null;
};

// Enhanced social intelligence responses for specific contexts
const getContextualResponse = (userMessage: string): string | null => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Client/Project inquiry detection
  if ((lowerMessage.includes('assistant') || lowerMessage.includes('help') || lowerMessage.includes('need')) && 
      (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('develop'))) {
    return "That sounds like an exciting opportunity! I'd be interested in learning more about your project. I have experience in AI/ML, full-stack development, and data analysis.\n\nLet's discuss your needs directly:\n[mail] Email: elgharib.mahmoud2@gmail.com\n[linkedin] LinkedIn: linkedin.com/in/mahmoud-el-gharib\n[phone] Phone: +212 636-167511\n\nWhat kind of project are you working on?";
  }
  
  // Positive feedback
  if (lowerMessage.includes('great') || lowerMessage.includes('awesome') || lowerMessage.includes('impressive')) {
    return "Thank you so much for the kind words! I really appreciate it. I'm passionate about what I do, and I always strive to deliver quality solutions. If you're interested in collaborating or have any questions, feel free to reach out!";
  }
  
  // Availability/Timeline questions
  if (lowerMessage.includes('available') || lowerMessage.includes('when') || lowerMessage.includes('start')) {
    return "I'm currently available and open to new opportunities! Whether you need someone for a full-time role, freelance project, or consultation, I'm flexible and ready to discuss timeline and terms.\n\nLet's connect: elgharib.mahmoud2@gmail.com or +212 636-167511";
  }
  
  return null;
};

export const processMessage = async (userMessage: string): Promise<{ response: string; source: 'intent' | 'document' | 'fallback' | 'project'; intent?: string; projectSlug?: string }> => {
  // Step 0: Check for project-specific questions first
  const projectQuery = detectProjectQuery(userMessage);
  if (projectQuery) {
    return {
      response: `Great question! Here's a quick overview of ${projectQuery.title}:\n\n${projectQuery.snippet}\n\n[arrow] For complete details, implementation, code, and more, visit the full project page`,
      source: 'project',
      projectSlug: projectQuery.slug
    };
  }

  // Step 1: Check for contextual/social intelligence responses
  const contextualResponse = getContextualResponse(userMessage);
  if (contextualResponse) {
    return {
      response: contextualResponse,
      source: 'fallback'
    };
  }

  // Step 2: Try to match intent
  const intent = matchIntent(userMessage);

  if (intent) {
    return {
      response: intent.response,
      source: 'intent',
      intent: intent.id
    };
  }

  // Step 3: Search documents for relevant information
  const searchResults = searchDocuments(userMessage);

  if (searchResults.length > 0 && searchResults[0].score > 2) {
    const topResult = searchResults[0];
    const response = `Based on my experience with ${topResult.section.title}: ${topResult.snippet}\n\n[arrow] For more details, explore the full project or documentation.`;

    return {
      response,
      source: 'document'
    };
  }

  // Step 4: Return enhanced fallback response
  const randomFallback = fallbackResponses[
    Math.floor(Math.random() * fallbackResponses.length)
  ];

  return {
    response: randomFallback,
    source: 'fallback'
  };
};

export const generateBotMessage = (content: string, source: 'intent' | 'document' | 'fallback' | 'project'): Message => {
  return {
    id: Date.now().toString(),
    type: 'bot',
    content,
    timestamp: new Date(),
    source
  };
};

export const generateUserMessage = (content: string): Message => {
  return {
    id: Date.now().toString(),
    type: 'user',
    content,
    timestamp: new Date()
  };
};
