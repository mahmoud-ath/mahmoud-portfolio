/**
 * Lazy Loading Utilities
 * 
 * Implements progressive loading for images and code-split heavy components
 * to improve initial load performance and reduce bundle size.
 */

import React, { lazy, Suspense, ComponentType, ReactNode } from 'react';


/**
 * IntersectionObserver wrapper for lazy loading images
 */
export interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  onLoad?: () => void;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Create a lazy-loaded image component using IntersectionObserver
 */
export const createLazyImage = (
  IncomingComponent: ComponentType<any>
): ComponentType<LazyImageProps> => {
  return lazy(() =>
    Promise.resolve({
      default: IncomingComponent,
    })
  );
};

/**
 * Lazy load utility for components
 * Usage: const HeavyComponent = lazyLoadComponent(() => import('./HeavyComponent'))
 */
export const lazyLoadComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): T => {
  return lazy(importFunc) as unknown as T;
};

/**
 * Batch lazy load multiple components
 */
export const lazyLoadComponents = <
  T extends Record<string, () => Promise<{ default: ComponentType<any> }>>
>(
  components: T
): Record<keyof T, ComponentType<any>> => {
  const result: Record<keyof T, ComponentType<any>> = {} as Record<
    keyof T,
    ComponentType<any>
  >;

  Object.keys(components).forEach(key => {
    result[key as keyof T] = lazy(components[key as keyof T]);
  });

  return result;
};

/**
 * Image lazy loading hook with IntersectionObserver
 */
export const useLazyImage = (ref: React.RefObject<HTMLImageElement>, options = {}) => {
  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      },
      {
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);
};

/**
 * Preload images in advance (for critical images)
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(
      url =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = url;
        })
    )
  );
};

/**
 * Request idle callback polyfill wrapper for non-critical tasks
 */
export const scheduleIdleTask = (callback: () => void): void => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
};

/**
 * Request animation frame wrapper for smooth animations
 */
export const scheduleAnimationTask = (callback: () => void): void => {
  if ('requestAnimationFrame' in window) {
    window.requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 1000 / 60);
  }
};

/**
 * Virtual scrolling utility for large lists
 * Returns visible items based on viewport
 */
export interface VirtualScrollConfig {
  itemHeight: number;
  containerHeight: number;
  scrollOffset: number;
  overscroll?: number;
}

export const getVisibleItems = <T extends any>(
  items: T[],
  config: VirtualScrollConfig
): { startIndex: number; endIndex: number; visibleItems: T[] } => {
  const { itemHeight, containerHeight, scrollOffset, overscroll = 3 } = config;

  const startIndex = Math.max(0, Math.floor(scrollOffset / itemHeight) - overscroll);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollOffset + containerHeight) / itemHeight) + overscroll
  );

  return {
    startIndex,
    endIndex,
    visibleItems: items.slice(startIndex, endIndex),
  };
};

/**
 * Debounce utility for expensive operations (like search)
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle utility for frequent events (like scroll)
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Chunk array into smaller arrays for pagination
 */
export const chunkArray = <T extends any>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
