import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Heart, Share2, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getBlogBySlug } from "../../../lib/utils/blogUtils";
import { BLOG_POSTS } from "../../../lib/data/blogs";

interface BlogDetailProps {
  slug: string;
  onBack: () => void;
}

function joinContent(content: string[]): string {
  return content.reduce((result, line, i) => {
    if (i === 0) return line;

    const prev = content[i - 1];
    const currIsTable = line.startsWith('|');
    const prevIsTable = prev.startsWith('|');
    const currIsFence = line.startsWith('```');
    const prevIsFence = prev.startsWith('```');
    const prevIsList = prev.startsWith('- ') || prev.startsWith('* ') || prev.startsWith('> ');

    // Table rows: join with single newline
    if (currIsTable && prevIsTable) return result + '\n' + line;
    // Code block content (between fences): single newline
    if (currIsFence || prevIsFence) return result + '\n' + line;
    // List items or blockquotes: single newline
    if (prevIsList && (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('> '))) return result + '\n' + line;

    // Everything else: paragraph break
    return result + '\n\n' + line;
  }, '');
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogDetail({ slug, onBack }: BlogDetailProps) {
  const [liked, setLiked] = useState(false);
  const post = getBlogBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Loading state
  if (!post) {
    return (
      <div className="bg-white dark:bg-slate-950 min-h-screen flex items-center justify-center p-4 transition-colors duration-500">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-themeRed mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading Post...</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch the article.</p>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-8 sm:pb-12 transition-colors duration-500">
      {/* Hero image */}
      <div className="relative h-48 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 hover:border-themeRed hover:text-themeRed dark:hover:text-themeRed transition-all duration-300 mb-6 shadow-sm"
        >
          <ArrowLeft size={15} />
          Back to blog
        </motion.button>

        {/* Article card */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-10"
        >
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatDate(post.date)}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-xl font-medium"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
              {joinContent(post.content)}
            </ReactMarkdown>
          </div>

          {/* Share & Like */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-themeRed transition-colors duration-300"
            >
              <Heart
                size={16}
                className={liked ? "fill-themeRed text-themeRed" : ""}
              />
              <span>{liked ? "Liked" : "Like"}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                const btn = document.getElementById("share-btn");
                if (btn) btn.textContent = "Copied!";
                setTimeout(() => {
                  const btn2 = document.getElementById("share-btn");
                  if (btn2) btn2.textContent = "Share";
                }, 2000);
              }}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-themeRed transition-colors duration-300"
            >
              <Share2 size={16} />
              <span id="share-btn">Share</span>
            </button>
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-themeRed" />
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <a
                  key={related.id}
                  href={`#/blog/${related.slug}`}
                  className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-themeRed dark:hover:border-themeRed transition-all duration-500"
                >
                  <div className="h-32 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{formatDate(related.date)} · {related.readTime}</p>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-themeRed transition-colors duration-500 line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Bottom back button */}
        <div className="mt-8 pb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-themeRed text-themeRed font-semibold rounded-xl hover:bg-themeRed/5 transition-colors duration-500"
          >
            ← Back to blog
          </button>
        </div>
      </div>
    </div>
  );
}
