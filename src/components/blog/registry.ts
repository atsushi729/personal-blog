import type { MDXComponents } from "mdx/types";
import * as pureFunction from "./pure_function";
import * as treeTraversal1 from "./tree_traversal_1";

export const blogComponentRegistry: Record<string, MDXComponents> = {
  pure_function: pureFunction,
  tree_traversal_1: treeTraversal1,
};
