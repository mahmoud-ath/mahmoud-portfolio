export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  content: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = await (async () => {
  try {
    const res = await fetch('/data/blogs.json');
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
})();
