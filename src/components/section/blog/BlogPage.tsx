import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogDashboard from "./BlogDashboard";

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <BlogDashboard onBack={() => navigate("/")} />;
};

export default BlogPage;
