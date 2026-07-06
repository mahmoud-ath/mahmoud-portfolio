/**
 * GitHub Stats Hook
 * Fetches live repository stats from the GitHub API
 */

import { useState, useEffect } from 'react';

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  openIssues: number;
  description: string;
  language: string | null;
  owner: string;
  repo: string;
  loading: boolean;
  error: string | null;
}

const cache = new Map<string, GitHubRepoStats & { fetchedAt: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url);
    if (u.hostname !== 'github.com') return null;
    const parts = u.pathname.replace(/^\//, '').split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1].replace(/\.git$/, '') };
  } catch {
    return null;
  }
}

export function useGitHubStats(githubUrl: string | undefined): GitHubRepoStats {
  const parsed = githubUrl ? parseGitHubUrl(githubUrl) : null;
  const cacheKey = parsed ? `${parsed.owner}/${parsed.repo}` : '';

  const [stats, setStats] = useState<GitHubRepoStats>({
    stars: 0,
    forks: 0,
    openIssues: 0,
    description: '',
    language: null,
    owner: parsed?.owner || '',
    repo: parsed?.repo || '',
    loading: !!parsed,
    error: parsed ? null : 'No GitHub URL',
  });

  useEffect(() => {
    if (!parsed) return;

    const key = `${parsed.owner}/${parsed.repo}`;

    // Check cache
    const cached = cache.get(key);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
      setStats({ ...cached, loading: false, error: null });
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data = await res.json();

        const result: GitHubRepoStats = {
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          openIssues: data.open_issues_count ?? 0,
          description: data.description ?? '',
          language: data.language ?? null,
          owner: parsed.owner,
          repo: parsed.repo,
          loading: false,
          error: null,
        };

        cache.set(key, { ...result, fetchedAt: Date.now() });
        setStats(result);
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch',
        }));
      }
    };

    fetchStats();
  }, [githubUrl]);

  return stats;
}
