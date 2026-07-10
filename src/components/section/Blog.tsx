import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../layout/SectionHeader";
import BlogGrid from "./blog/BlogGrid";
import { BLOG_POSTS } from "../../lib/data/blogs";

interface BlogProps {
  onViewAllClick?: () => void;
}

export default function Blog({ onViewAllClick }: BlogProps) {
  const featuredPosts = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      window.location.hash = '#/blog';
    }
  };

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <section
      id="blog"
      className="py-24 px-6 md:px-24 bg-white dark:bg-slate-950"
    >
      <div className="container max-w-6xl mx-auto">
        <SectionHeader title="Latest Posts" />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto mb-16"
        >
          Thoughts on engineering, AI, and building software that matters.
        </motion.p>

        <div className="mb-16">
          <BlogGrid posts={featuredPosts} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => { handleViewAll(); scrollToTop(); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 border border-gray-300 text-gray-900 font-semibold hover:border-themeRed hover:text-themeRed hover:bg-themeRed/5 transition-all duration-300 flex items-center gap-2 dark:text-white"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
