// Utility Functions for Portfolio

/**
 * Format date to readable format
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  } catch {
    return dateString;
  }
};

/**
 * Format date range
 * @param startDate - Start date
 * @param endDate - End date (optional)
 * @returns Formatted date range
 */
export const formatDateRange = (startDate: string, endDate?: string): string => {
  if (!endDate || endDate.toLowerCase() === 'present') {
    return `${startDate} - Present`;
  }
  return `${startDate} - ${endDate}`;
};

/**
 * Smooth scroll to section
 * @param elementId - ID of element to scroll to
 */
export const scrollToSection = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Filter projects by tag
 * @param projects - Array of projects
 * @param tag - Tag to filter by
 * @returns Filtered projects array
 */
export const filterProjectsByTag = (projects: any[], tag: string) => {
  return projects.filter(project => 
    project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

/**
 * Get unique tags from projects
 * @param projects - Array of projects
 * @returns Array of unique tags
 */
export const getUniqueTags = (projects: any[]): string[] => {
  const tags = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach((tag: string) => {
      tags.add(tag);
    });
  });
  return Array.from(tags).sort();
};

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Max length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, length: number = 150): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Get featured projects
 * @param projects - Array of projects
 * @returns Featured projects only
 */
export const getFeaturedProjects = (projects: any[]) => {
  return projects.filter(project => project.featured === true);
};

/**
 * Copy text to clipboard
 * @param text - Text to copy
 */
export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

/**
 * Format skill categories for display
 * @param skills - Skills data object
 * @returns Formatted skills array
 */
export const formatSkillsForDisplay = (skills: Record<string, string[]>) => {
  return Object.entries(skills).map(([category, items]) => ({
    category: category
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim(),
    items
  }));
};

/**
 * Get reading time for text
 * @param text - Text content
 * @returns Reading time in minutes
 */
export const getReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Check if device is mobile
 * @returns Boolean indicating if device is mobile
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
