import React, { useEffect } from "react";
import BlogDashboard from "./BlogDashboard";
import BlogDetail from "./BlogDetail";

interface BlogPageProps {
  view?: "dashboard" | { type: "detail"; slug: string };
  onViewChange?: (view: "dashboard" | { type: "detail"; slug: string }) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ view = "dashboard", onViewChange }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = () => {
    if (onViewChange) {
      onViewChange("dashboard");
    }
    window.location.hash = "#/blog";
  };

  if (view !== "dashboard" && view.type === "detail") {
    return <BlogDetail slug={view.slug} onBack={handleBack} />;
  }

  return <BlogDashboard onBack={() => { window.location.hash = "#/"; }} />;
};

export default BlogPage;
