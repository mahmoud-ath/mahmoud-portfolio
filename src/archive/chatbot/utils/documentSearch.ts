import { documentSections } from '../data/documentContent';
import { DocumentSection, SearchResult } from '../types';

export const searchDocuments = (query: string, topK: number = 3): SearchResult[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);

  const results = documentSections.map(section => {
    const contentLower = section.content.toLowerCase();
    const titleLower = section.title.toLowerCase();

    // Calculate relevance score
    let score = 0;

    // Exact phrase match (highest priority)
    if (contentLower.includes(normalizedQuery)) score += 10;
    if (titleLower.includes(normalizedQuery)) score += 15;

    // Keyword matches
    queryWords.forEach(word => {
      if (contentLower.includes(word)) score += 2;
      if (titleLower.includes(word)) score += 3;
      if (section.keywords.some(kw => kw.includes(word))) score += 4;
    });

    // Section keyword matches
    section.keywords.forEach(keyword => {
      const keywordWords = keyword.split(/\s+/);
      keywordWords.forEach(kw => {
        if (queryWords.some(qw => qw.includes(kw) || kw.includes(qw))) {
          score += 3;
        }
      });
    });

    return {
      score,
      section,
      snippet: generateSnippet(section.content, queryWords)
    };
  });

  // Filter and sort by score
  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};

export const generateSnippet = (content: string, keywords: string[], length: number = 150): string => {
  let snippet = content;

  // Try to find keyword occurrence and extract surrounding context
  for (const keyword of keywords) {
    const index = content.toLowerCase().indexOf(keyword.toLowerCase());
    if (index !== -1) {
      const start = Math.max(0, index - 50);
      const end = Math.min(content.length, index + length);
      snippet = content.substring(start, end).trim();
      if (start > 0) snippet = '...' + snippet;
      if (end < content.length) snippet = snippet + '...';
      break;
    }
  }

  return snippet.length > length ? snippet.substring(0, length) + '...' : snippet;
};

export const isSimilar = (str1: string, str2: string, threshold: number = 0.7): boolean => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return true;

  const editDistance = getEditDistance(longer.toLowerCase(), shorter.toLowerCase());
  const similarity = (longer.length - editDistance) / longer.length;

  return similarity >= threshold;
};

export const getEditDistance = (s1: string, s2: string): number => {
  const costs: number[] = [];

  for (let j = 0; j <= s2.length; j++) {
    let lastValue = j;
    for (let i = 1; i <= s1.length; i++) {
      let newValue = costs[j - 1] || 0;
      if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
        newValue = Math.min(Math.min(newValue, lastValue), (costs[j] || 0)) + 1;
      }
      costs[j - 1] = lastValue;
      lastValue = newValue;
    }
    costs[s2.length] = lastValue;
  }

  return costs[s2.length - 1] || 0;
};
