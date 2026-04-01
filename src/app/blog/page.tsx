import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software, technology, and building things by Atsushi Hatakeyama.",
  openGraph: {
    title: "Blog | Atsushi Hatakeyama",
    description: "Thoughts on software, technology, and building things by Atsushi Hatakeyama.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="font-sans">
      {posts.length === 0 ? (
        <p className="text-neutral-500 text-sm">No posts yet.</p>
      ) : (
        <BlogList posts={posts} />
      )}
    </div>
  );
}
