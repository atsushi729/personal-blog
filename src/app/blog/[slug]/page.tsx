import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

const posts: Record<string, BlogPost> = {
  "getting-started": {
    slug: "getting-started",
    title: "Getting Started with My Blog",
    date: "2024-12-19",
    content: `Welcome to my new blog! I'm excited to finally have a space where I can share my thoughts, experiences, and learnings.

This blog will be a place where I document my journey as a software engineer. Expect posts about:

- Technical deep-dives into interesting problems
- Thoughts on software architecture and design
- Lessons learned from building projects
- Book reviews and recommendations

I believe that writing helps clarify thinking, and sharing knowledge creates value for everyone. I hope you find something useful here.

Thanks for reading, and stay tuned for more!`,
  },
  "building-in-public": {
    slug: "building-in-public",
    title: "Why I Believe in Building in Public",
    date: "2024-12-15",
    content: `Building in public means sharing your work openly as you create it. It can feel vulnerable, but I've found it to be incredibly valuable.

Here's why I do it:

**Accountability**: When others can see what you're working on, you're more likely to follow through.

**Feedback**: Early feedback helps you course-correct before investing too much time in the wrong direction.

**Community**: Sharing your journey attracts like-minded people who can become collaborators, mentors, or friends.

**Learning**: Explaining your work forces you to understand it deeply.

The fear of judgment is real, but the benefits of transparency and openness far outweigh the risks. Start small, share what you're comfortable with, and build from there.`,
  },
  "simplicity-in-code": {
    slug: "simplicity-in-code",
    title: "The Art of Simplicity in Code",
    date: "2024-12-10",
    content: `"Simplicity is the ultimate sophistication." - Leonardo da Vinci

This quote applies perfectly to software development. Complex problems don't always need complex solutions. In fact, the best solutions are often the simplest ones.

Here are some principles I follow:

**Start simple**: Begin with the simplest solution that could work. You can always add complexity later if needed.

**Avoid premature optimization**: Don't solve problems you don't have yet.

**Write readable code**: Code is read more often than it's written. Optimize for readability.

**Delete more than you add**: The best code is often the code you don't write.

Remember: every line of code is a liability. It needs to be understood, maintained, and debugged. Keep it simple.`,
  },
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div>
        <h1 className="text-3xl font-semibold text-neutral-800 mb-4">
          Post not found
        </h1>
        <Link
          href="/blog"
          className="text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          &larr; Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article>
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 transition-colors mb-8"
      >
        &larr; Back to blog
      </Link>

      <header className="mb-8">
        <time className="text-sm text-neutral-500">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="text-3xl font-semibold text-neutral-800 mt-2">
          {post.title}
        </h1>
      </header>

      <div className="prose">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
