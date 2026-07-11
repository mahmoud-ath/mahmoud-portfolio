import intentsData from '../data/intents.json';
import { Intent } from '../types';

const intents: Intent[] = intentsData.intents as Intent[];

export const matchIntent = (userMessage: string): Intent | null => {
  const normalizedMessage = userMessage.toLowerCase().trim();

  // Find matching intent based on keywords
  const matches = intents.map(intent => {
    const matchedKeywords = intent.keywords.filter(keyword =>
      normalizedMessage.includes(keyword.toLowerCase())
    );

    return {
      intent,
      matchCount: matchedKeywords.length,
      score: matchedKeywords.length / intent.keywords.length
    };
  }).filter(m => m.matchCount > 0);

  if (matches.length === 0) return null;

  // Sort by priority and score, return best match
  matches.sort((a, b) => {
    const priorityDiff = b.intent.priority - a.intent.priority;
    if (priorityDiff !== 0) return priorityDiff;
    return b.score - a.score;
  });

  return matches[0].intent;
};

export const getAllIntents = (): Intent[] => intents;

export const getIntentsByCategory = (category: Intent['category']): Intent[] => {
  return intents.filter(intent => intent.category === category);
};
