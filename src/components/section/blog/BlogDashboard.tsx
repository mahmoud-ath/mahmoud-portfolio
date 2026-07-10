import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import BlogGrid from "./BlogGrid";
import { BLOG_POSTS } from "../../../lib/data/blogs";

interface BlogDashboardProps {
  onBack?: () => void;
}

export default function BlogDashboard({ onBack }: BlogDashboardProps) {
  const posts = BLOG_POSTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="min-h-screen py-24 px-6 md:px-24 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 hover:border-themeRed hover:text-themeRed dark:hover:text-themeRed transition-all duration-300 mb-4"
              >
                <ArrowLeft size={15} />
                Back home
              </button>
            )}
            <h1 className="text-2xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white">
              All Posts
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {posts.length} articles on engineering, AI, and software.
            </p>
          </div>
        </div>

        {/* List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BlogGrid posts={posts} />
        </motion.div>
      </div>
    </section>
  );
}
