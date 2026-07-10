import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { BlogPost } from "../../../lib/data/blogs";

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogListItem: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  return (
    <motion.a
      href={`#/blog/${post.slug}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-themeRed dark:hover:border-themeRed transition-all duration-500 rounded-xl overflow-hidden"
    >
      <div className="flex items-stretch gap-0">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-24 md:w-28 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 p-3 md:p-4 flex flex-col justify-center">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 mb-1">
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {post.readTime}
            </span>
            {post.featured && (
              <span className="px-2 py-0.5 bg-themeRed/10 dark:bg-themeRed/20 text-themeRed text-[10px] font-semibold rounded">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-gray-100 group-hover:text-themeRed dark:group-hover:text-themeRed transition-colors duration-500 line-clamp-1">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1 transition-colors duration-300">
            {post.excerpt}
          </p>

          {/* Tags + arrow */}
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ArrowUpRight
              size={14}
              className="text-gray-400 group-hover:text-themeRed group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {posts.map((post, i) => (
        <BlogListItem key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}
