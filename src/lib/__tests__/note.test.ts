import {
  getAllNotePaths,
  getAllNotes,
  getNoteBySlug,
  getNoteCategory,
  getNotesByCategory,
} from "../note";

jest.mock("fs");
const fs = jest.requireMock("fs") as jest.Mocked<typeof import("fs")>;

jest.spyOn(process, "cwd").mockReturnValue("/mock");

const TREE_NOTE = `---
title: Tree Basics
date: 2026-05-01
locale: en
translationKey: tree-basics
excerpt: Basic tree notes
---
# Tree Basics
`;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getNoteCategory", () => {
  it("カテゴリパスから Note カテゴリを返す", () => {
    const category = getNoteCategory(["ads", "data-structure", "tree"]);

    expect(category).toEqual({
      title: "Tree",
      segments: ["ads", "data-structure", "tree"],
    });
  });

  it("存在しないカテゴリパスでは null を返す", () => {
    expect(getNoteCategory(["unknown"])).toBeNull();
  });
});

describe("getNotesByCategory", () => {
  it("カテゴリディレクトリが存在しない場合は空配列を返す", () => {
    fs.readdirSync.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    expect(getNotesByCategory(["ads", "data-structure", "tree"])).toEqual([]);
  });

  it("カテゴリ配下の .mdx ファイルのみを読み込む", () => {
    fs.readdirSync.mockReturnValue([
      "tree-basics.mdx",
      "readme.txt",
    ] as unknown as ReturnType<typeof fs.readdirSync>);
    fs.readFileSync.mockReturnValue(TREE_NOTE);

    const notes = getNotesByCategory(["ads", "data-structure", "tree"]);

    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({
      slug: "tree-basics",
      title: "Tree Basics",
      category: {
        title: "Tree",
        segments: ["ads", "data-structure", "tree"],
      },
    });
    expect(String(fs.readFileSync.mock.calls[0][0])).toContain(
      "/content/note/en/ads/data-structure/tree/tree-basics.mdx"
    );
  });
});

describe("getNoteBySlug", () => {
  it("カテゴリと slug に対応するメモを返す", () => {
    fs.readFileSync.mockReturnValue(TREE_NOTE);

    const note = getNoteBySlug(
      ["ads", "data-structure", "tree"],
      "tree-basics"
    );

    expect(note).not.toBeNull();
    expect(note!.title).toBe("Tree Basics");
    expect(note!.date).toBe("2026-05-01");
  });
});

describe("getAllNotes", () => {
  it("全カテゴリのメモを集約する", () => {
    fs.readdirSync.mockImplementation((dirPath) => {
      if (String(dirPath).endsWith("/ads/data-structure/tree")) {
        return ["tree-basics.mdx"] as unknown as ReturnType<
          typeof fs.readdirSync
        >;
      }

      return [] as unknown as ReturnType<typeof fs.readdirSync>;
    });
    fs.readFileSync.mockReturnValue(TREE_NOTE);

    const notes = getAllNotes();

    expect(notes).toHaveLength(1);
    expect(notes[0].slug).toBe("tree-basics");
  });
});

describe("getAllNotePaths", () => {
  it("カテゴリパスとメモ詳細パスを返す", () => {
    fs.readdirSync.mockImplementation((dirPath) => {
      if (String(dirPath).endsWith("/ads/data-structure/tree")) {
        return ["tree-basics.mdx"] as unknown as ReturnType<
          typeof fs.readdirSync
        >;
      }

      return [] as unknown as ReturnType<typeof fs.readdirSync>;
    });
    fs.readFileSync.mockReturnValue(TREE_NOTE);

    const paths = getAllNotePaths();
    expect(paths).toContainEqual(["ads", "data-structure", "tree"]);
    expect(paths).toContainEqual([
      "ads",
      "data-structure",
      "tree",
      "tree-basics",
    ]);
  });
});
