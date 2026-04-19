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
  isMdx?: boolean;
}

function parseFile(fileName: string): BlogPost {
  const isMdx = fileName.endsWith('.mdx');
  const slug = fileName.replace(/\.(md|mdx)$/, '');
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
    content: isMdx ? content : content.replace(/^#{1,6}\s+.+\n?/, ''),
    isMdx,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(parseFile);

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  for (const ext of ['mdx', 'md'] as const) {
    try {
      return parseFile(`${slug}.${ext}`);
    } catch {
      continue;
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
}
