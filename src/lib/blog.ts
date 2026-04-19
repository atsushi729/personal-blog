import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
}

function parseFile(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx$/, '');
  const fullPath = path.join(blogDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const date = data.date instanceof Date
    ? data.date.toISOString().split('T')[0]
    : String(data.date || '');

  return {
    slug,
    title: data.title || slug,
    date,
    excerpt: data.excerpt || '',
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory).filter((f) => f.endsWith('.mdx'));
  const allPosts = fileNames.map(parseFile);

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    return parseFile(`${slug}.mdx`);
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs.readdirSync(blogDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
