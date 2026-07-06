import React from 'react';
import { motion } from 'framer-motion';
import { useGitHubStats, GitHubRepoStats } from '../../../../lib/hooks/useGitHubStats';
import { Star, GitFork, AlertCircle, ExternalLink, Github } from 'lucide-react';

interface GitHubRepoCardProps {
  repoName: string;
  githubUrl: string;
  index?: number;
}

// ── GitHub language colors ────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  CSS: '#563D7C',
  PHP: '#4F5D95',
  Java: '#B07219',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  'C++': '#F34B7D',
  C: '#555555',
  'C#': '#178600',
  Shell: '#89E051',
  Dockerfile: '#384D54',
  Jupyter: '#DA5B0B',
};

function getLangColor(lang: string | null): string {
  if (!lang) return '#8b949e';
  return LANG_COLORS[lang] || '#8b949e';
}

// ── Skeleton loader ───────────────────────────────────────────
const Skeleton: React.FC = () => (
  <div className="bg-github-bg border border-github-border rounded-xl p-4 animate-pulse">
    <div className="h-4 bg-github-border rounded w-3/4 mb-3" />
    <div className="h-3 bg-github-border rounded w-1/2 mb-4" />
    <div className="flex gap-4">
      <div className="h-5 bg-github-border rounded w-16" />
      <div className="h-5 bg-github-border rounded w-16" />
      <div className="h-5 bg-github-border rounded w-16" />
    </div>
  </div>
);

// ── Repo Card ─────────────────────────────────────────────────
const RepoCard: React.FC<{ stats: GitHubRepoStats; index: number }> = ({ stats, index }) => {
  if (stats.loading) return <Skeleton />;
  if (stats.error) return null;

  return (
    <motion.a
      href={`https://github.com/${stats.owner}/${stats.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative block bg-github-bg border border-github-border rounded-xl p-4
                 hover:border-github-blue hover:shadow-lg hover:shadow-github-blue/5
                 transition-all duration-300 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-github-blue via-github-green to-github-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Github className="w-4 h-4 text-github-fg-muted flex-shrink-0" />
          <span className="font-semibold text-sm text-github-fg group-hover:text-github-blue transition-colors truncate">
            {stats.owner}/{stats.repo}
          </span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-github-fg-muted flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Description */}
      {stats.description && (
        <p className="text-xs text-github-fg-muted mb-3 line-clamp-2 leading-relaxed">
          {stats.description}
        </p>
      )}

      {/* Language */}
      {stats.language && (
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: getLangColor(stats.language) }}
          />
          <span className="text-xs text-github-fg-muted">{stats.language}</span>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-github-fg-muted hover:text-github-yellow transition-colors duration-200">
          <Star className="w-3.5 h-3.5" />
          <span className="font-semibold text-github-fg">{stats.stars}</span>
        </div>
        <div className="flex items-center gap-1.5 text-github-fg-muted hover:text-github-blue transition-colors duration-200">
          <GitFork className="w-3.5 h-3.5" />
          <span className="font-semibold text-github-fg">{stats.forks}</span>
        </div>
        <div className="flex items-center gap-1.5 text-github-fg-muted hover:text-github-green transition-colors duration-200">
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="font-semibold text-github-fg">{stats.openIssues}</span>
        </div>
      </div>
    </motion.a>
  );
};

// ── Container with stagger animation ──────────────────────────
const GitHubRepoCard: React.FC<GitHubRepoCardProps> = ({ repoName, githubUrl, index = 0 }) => {
  const stats = useGitHubStats(githubUrl);

  return <RepoCard stats={stats} index={index} />;
};

export default GitHubRepoCard;
