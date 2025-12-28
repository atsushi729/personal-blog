import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const posts: BlogPost[] = [
  {
    slug: "getting-started",
    title: "Getting Started with My Blog",
    date: "2024-12-19",
    excerpt:
      "Welcome to my new blog! In this first post, I share my journey and what you can expect from this space.",
  },
  {
    slug: "building-in-public",
    title: "Why I Believe in Building in Public",
    date: "2024-12-15",
    excerpt:
      "Sharing your work openly can be scary, but the benefits far outweigh the risks. Here's why I do it.",
  },
  {
    slug: "simplicity-in-code",
    title: "The Art of Simplicity in Code",
    date: "2024-12-10",
    excerpt:
      "Complex problems don't always need complex solutions. Let's explore how to keep things simple.",
  },
];

export default function Blog() {
  return (
    <div className="font-serif">
      <h1 className="text-3xl font-normal text-neutral-800 mb-6">
        Blog
      </h1>

      <p className="text-neutral-800 mb-12">
        Thoughts on software, technology, and building things.
      </p>

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
              <p className="text-neutral-600 mt-2">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
