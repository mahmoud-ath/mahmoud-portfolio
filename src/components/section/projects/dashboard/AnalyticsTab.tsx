import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../../../lib/types/Project_Section';
import { PROJECT_CATEGORIES } from '../../../../lib/data/projects/projectConfig';
import { useProjectStats } from '../../../../lib/hooks';
import { TrendingUp, Award, Code2, Layers, BarChart3, BookOpen } from 'lucide-react';
import GitHubRepoCard from './GitHubRepoCard';

interface AnalyticsTabProps {
  projects: Project[];
}

// ── Stagger container ────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── Animated Horizontal Bar ──────────────────────────────────
const Bar: React.FC<{ label: string; value: number; max: number; color?: string; showValue?: boolean }> = ({
  label, value, max, color = 'bg-github-green', showValue = true,
}) => {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <motion.div variants={item} className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-github-fg font-medium truncate mr-2">{label}</span>
        {showValue && <span className="text-github-fg-muted flex-shrink-0 font-semibold">{value}</span>}
      </div>
      <div className="h-2.5 bg-github-input rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </motion.div>
  );
};

// ── Stat Card ────────────────────────────────────────────────
const StatCard: React.FC<{ label: string; value: string | number; subtitle: string; icon: React.ReactNode }> = ({
  label, value, subtitle, icon,
}) => (
  <motion.div
    variants={item}
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-github-bg border border-github-border rounded-xl p-5 transition-colors duration-300 hover:border-github-blue hover:shadow-lg hover:shadow-github-blue/5"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-github-fg-muted uppercase tracking-wider">{label}</span>
      <span className="text-github-fg-muted">{icon}</span>
    </div>
    <p className="text-3xl font-bold text-github-fg">{value}</p>
    <p className="text-xs text-github-fg-muted mt-1">{subtitle}</p>
  </motion.div>
);

// ── Section wrapper ──────────────────────────────────────────
const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  badge?: string;
  children: React.ReactNode;
}> = ({ icon, title, badge, children }) => (
  <motion.div
    variants={item}
    className="bg-github-bg border border-github-border rounded-xl p-6"
  >
    <div className="flex items-center gap-2 mb-5">
      <span className="text-github-blue">{icon}</span>
      <h3 className="font-bold text-github-fg">{title}</h3>
      {badge && <span className="text-xs text-github-fg-muted ml-auto">{badge}</span>}
    </div>
    {children}
  </motion.div>
);

// ── AnalyticsTab ─────────────────────────────────────────────
const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ projects }) => {
  const stats = useProjectStats(projects);

  // ── Tag frequency ──────────────────────────────────────────
  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach(p => p.tags.forEach(t => counts.set(t, (counts.get(t) || 0) + 1)));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [projects]);

  const maxTagCount = topTags.length > 0 ? topTags[0][1] : 1;

  // ── Difficulty distribution ────────────────────────────────
  const difficultyDist = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    projects.forEach(p => { if (p.difficulty >= 1 && p.difficulty <= 5) dist[p.difficulty - 1]++; });
    return dist;
  }, [projects]);
  const maxDifficulty = Math.max(...difficultyDist, 1);

  // ── Category max ───────────────────────────────────────────
  const categoryMax = Math.max(
    ...Object.values(PROJECT_CATEGORIES).map((_, i) => {
      const key = Object.keys(PROJECT_CATEGORIES)[i];
      return projects.filter(p => p.category === key).length;
    }),
    1,
  );

  // ── GitHub repos ───────────────────────────────────────────
  const reposWithGitHub = projects.filter(p => p.links?.github);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* ─── Summary Cards ────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Total"
          value={stats.total}
          subtitle="Projects completed"
          icon={<Code2 className="w-5 h-5" />}
        />
        <StatCard
          label="Featured"
          value={stats.featured}
          subtitle={`${Math.round((stats.featured / stats.total) * 100)}% of total`}
          icon={<Award className="w-5 h-5" />}
        />
        <StatCard
          label="Avg Impact"
          value={`${stats.averageImpactScore}/20`}
          subtitle="Average score"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          label="Completed"
          value={stats.byStatus.completed}
          subtitle={`${Math.round((stats.byStatus.completed / stats.total) * 100)}% rate`}
          icon={<BookOpen className="w-5 h-5" />}
        />
      </motion.div>

      {/* ─── Charts Row ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section icon={<Layers className="w-5 h-5" />} title="Category Breakdown">
          <div className="space-y-4">
            {Object.entries(PROJECT_CATEGORIES).map(([key, cat]) => {
              const count = projects.filter(p => p.category === key).length;
              return (
                <Bar
                  key={key}
                  label={cat.label}
                  value={count}
                  max={categoryMax}
                  color={
                    key === 'web-dev' ? 'bg-github-blue' :
                    key === 'machine-learning' ? 'bg-github-purple' :
                    'bg-github-green'
                  }
                />
              );
            })}
          </div>
        </Section>

        <Section icon={<BarChart3 className="w-5 h-5" />} title="Difficulty Distribution">
          <div className="space-y-4">
            {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'].map((label, i) => (
              <Bar
                key={i}
                label={label}
                value={difficultyDist[i]}
                max={maxDifficulty}
                color={
                  i === 0 ? 'bg-[#3fb950]' :
                  i === 1 ? 'bg-[#58a6ff]' :
                  i === 2 ? 'bg-[#d29922]' :
                  i === 3 ? 'bg-[#f85149]' : 'bg-[#bc8cff]'
                }
              />
            ))}
          </div>
        </Section>
      </div>

      {/* ─── Top Technologies ─────────────────────────────────── */}
      <Section icon={<Code2 className="w-5 h-5" />} title="Top Technologies">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topTags.map(([tag, count]) => (
            <Bar key={tag} label={tag} value={count} max={maxTagCount} />
          ))}
        </div>
      </Section>

      {/* ─── GitHub Repos ─────────────────────────────────────── */}
      <motion.div variants={item}>
        <Section
          icon={<Award className="w-5 h-5" />}
          title="GitHub Repositories"
          badge="Live stats · auto-updated"
        >
          {reposWithGitHub.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reposWithGitHub.map((project, i) => (
                <GitHubRepoCard
                  key={project.id}
                  repoName={project.title}
                  githubUrl={project.links!.github!}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-github-fg-muted text-center py-6">No GitHub repositories linked to projects.</p>
          )}
        </Section>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsTab;
