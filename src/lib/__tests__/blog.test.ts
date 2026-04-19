import { getAllPosts, getPostBySlug, getAllSlugs } from '../blog';

jest.mock('fs');
const fs = jest.requireMock('fs') as jest.Mocked<typeof import('fs')>;

jest.spyOn(process, 'cwd').mockReturnValue('/mock');

const POST_A = `---
title: Post A
date: 2024-03-15
excerpt: Excerpt of Post A
---
# Post A
Content of post A.
`;

const POST_B = `---
title: Post B
date: 2024-01-10
excerpt: Excerpt of Post B
---
Content of post B.
`;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getAllPosts', () => {
  it('ブログディレクトリが存在しない場合は空配列を返す', () => {
    fs.existsSync.mockReturnValue(false);
    expect(getAllPosts()).toEqual([]);
  });

  it('.mdx ファイルのみを読み込む', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(['post-a.mdx', 'post-b.mdx', 'readme.txt'] as unknown as ReturnType<typeof fs.readdirSync>);
    fs.readFileSync.mockImplementation((filePath) => {
      if (String(filePath).includes('post-a.mdx')) return POST_A;
      if (String(filePath).includes('post-b.mdx')) return POST_B;
      return '';
    });

    const posts = getAllPosts();
    expect(posts).toHaveLength(2);
    expect(posts.map((p) => p.slug)).toEqual(['post-a', 'post-b']);
  });

  it('日付の降順にソートされる', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(['post-b.mdx', 'post-a.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
    fs.readFileSync.mockImplementation((filePath) => {
      if (String(filePath).includes('post-a.mdx')) return POST_A;
      if (String(filePath).includes('post-b.mdx')) return POST_B;
      return '';
    });

    const posts = getAllPosts();
    expect(posts[0].slug).toBe('post-a'); // 2024-03-15
    expect(posts[1].slug).toBe('post-b'); // 2024-01-10
  });

  it('各投稿のフィールドを正しく解析する', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(['post-a.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
    fs.readFileSync.mockReturnValue(POST_A);

    const [post] = getAllPosts();
    expect(post.slug).toBe('post-a');
    expect(post.title).toBe('Post A');
    expect(post.date).toBe('2024-03-15');
    expect(post.excerpt).toBe('Excerpt of Post A');
    expect(post.content).toContain('Content of post A.');
  });

  it('title がない場合は slug をフォールバックにする', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(['my-post.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
    fs.readFileSync.mockReturnValue('---\ndate: 2024-01-01\n---\nBody');

    const [post] = getAllPosts();
    expect(post.title).toBe('my-post');
  });
});

describe('getPostBySlug', () => {
  it('ファイルが存在しない場合は null を返す', () => {
    fs.readFileSync.mockImplementation(() => { throw new Error('ENOENT'); });
    expect(getPostBySlug('non-existent')).toBeNull();
  });

  it('スラッグに対応する投稿を返す', () => {
    fs.readFileSync.mockReturnValue(POST_A);

    const post = getPostBySlug('post-a');
    expect(post).not.toBeNull();
    expect(post!.slug).toBe('post-a');
    expect(post!.title).toBe('Post A');
    expect(post!.date).toBe('2024-03-15');
  });

  it('Date オブジェクト型の日付を YYYY-MM-DD 文字列に変換する', () => {
    const content = `---\ntitle: Test\ndate: 2023-06-01\n---\nBody`;
    fs.readFileSync.mockReturnValue(content);

    const post = getPostBySlug('test');
    expect(post!.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('getAllSlugs', () => {
  it('ディレクトリが存在しない場合は空配列を返す', () => {
    fs.existsSync.mockReturnValue(false);
    expect(getAllSlugs()).toEqual([]);
  });

  it('.mdx ファイルから拡張子を除いた slug 一覧を返す', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(['alpha.mdx', 'beta.mdx', 'notes.txt'] as unknown as ReturnType<typeof fs.readdirSync>);

    const slugs = getAllSlugs();
    expect(slugs).toEqual(['alpha', 'beta']);
  });
});
