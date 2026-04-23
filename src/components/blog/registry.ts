import type { MDXComponents } from "mdx/types";
import * as treeTraversal1 from "./tree_traversal_1";

export const blogComponentRegistry: Record<string, MDXComponents> = {
  tree_traversal_1: treeTraversal1,
};
