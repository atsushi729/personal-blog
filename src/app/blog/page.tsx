import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="font-serif">
      <h1 className="text-3xl font-normal text-neutral-800 mb-6">
        Blog
      </h1>

      <p className="text-neutral-800 mb-12">
        Thoughts on software, technology, and building things.
      </p>

      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet.</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <time className="text-sm text-neutral-500 font-sans">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="text-xl font-normal text-neutral-800 mt-1 group-hover:text-neutral-600 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-neutral-600 mt-2">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
