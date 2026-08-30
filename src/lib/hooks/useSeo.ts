import { useEffect } from 'react';

const BASE_URL = 'https://mahmoud-elgharib.me';

const DEFAULT_DESCRIPTION =
  'AI & Data Science portfolio of Mahmoud El Gharib — machine learning, data analytics, NLP/RAG, and full-stack software development with real project case studies.';

interface SeoOptions {
  title: string;
  description?: string;
  /** Route path, e.g. '/projects' or '/blog'. Defaults to the homepage. */
  path?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Client-side SEO for the SPA's real (non-hash) routes.
 * Updates <title>, canonical URL, meta description, and Open Graph / Twitter tags
 * for the current route. Idempotent — safe to call on every navigation.
 */
export function useSeo({ title, description = DEFAULT_DESCRIPTION, path = '/' }: SeoOptions) {
  useEffect(() => {
    const url = path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
    document.title = title;
    upsertCanonical(url);
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
  }, [title, description, path]);
}
