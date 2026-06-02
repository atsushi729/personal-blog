"use client";

import { useState, useMemo } from "react";

type TraversalType = "bfs" | "dfs-pre" | "dfs-in" | "dfs-post";

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
  children: number[];
}

const nodes: Node[] = [
  { id: 0, x: 200, y: 40, label: "A", children: [1, 2] },
  { id: 1, x: 100, y: 120, label: "B", children: [3, 4] },
  { id: 2, x: 300, y: 120, label: "C", children: [5, 6] },
  { id: 3, x: 50, y: 200, label: "D", children: [] },
  { id: 4, x: 150, y: 200, label: "E", children: [] },
  { id: 5, x: 250, y: 200, label: "F", children: [] },
  { id: 6, x: 350, y: 200, label: "G", children: [] },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
];

function bfs(): number[] {
  const order: number[] = [];
  const queue = [0];
  while (queue.length > 0) {
    const id = queue.shift()!;
    order.push(id);
    nodes[id].children.forEach((c) => queue.push(c));
  }
  return order;
}

function dfsPreorder(id: number, order: number[] = []): number[] {
  order.push(id);
  nodes[id].children.forEach((c) => dfsPreorder(c, order));
  return order;
}

function dfsInorder(id: number, order: number[] = []): number[] {
  const children = nodes[id].children;
  if (children[0] !== undefined) dfsInorder(children[0], order);
  order.push(id);
  if (children[1] !== undefined) dfsInorder(children[1], order);
  return order;
}

function dfsPostorder(id: number, order: number[] = []): number[] {
  nodes[id].children.forEach((c) => dfsPostorder(c, order));
  order.push(id);
  return order;
}

const traversals: Record<TraversalType, () => number[]> = {
  bfs: bfs,
  "dfs-pre": () => dfsPreorder(0),
  "dfs-in": () => dfsInorder(0),
  "dfs-post": () => dfsPostorder(0),
};

const labels: Record<TraversalType, string> = {
  bfs: "BFS (Breadth-First)",
  "dfs-pre": "DFS Pre-order",
  "dfs-in": "DFS In-order",
  "dfs-post": "DFS Post-order",
};

export function TreeTraversalDemo() {
  const [type, setType] = useState<TraversalType>("bfs");
  const [step, setStep] = useState(-1);

  const order = useMemo(() => traversals[type](), [type]);
  const visited = useMemo(
    () => new Set(step >= 0 ? order.slice(0, step + 1) : []),
    [order, step]
  );
  const current = step >= 0 ? order[step] : -1;

  const handleTypeChange = (t: TraversalType) => {
    setType(t);
    setStep(-1);
  };

  const canNext = step < order.length - 1;
  const canPrev = step >= 0;

  return (
    <div className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6 font-sans">
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(labels) as TraversalType[]).map((t) => (
          <button
            key={t}
            onClick={() => handleTypeChange(t)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              type === t
                ? "bg-neutral-800 text-white"
                : "bg-white border border-neutral-300 text-neutral-600 hover:border-neutral-500"
            }`}
          >
            {labels[t]}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 400 260" className="w-full max-w-md mx-auto block">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y + 18}
            x2={nodes[b].x}
            y2={nodes[b].y - 18}
            stroke="#d4d4d4"
            strokeWidth={2}
          />
        ))}
        {nodes.map((node) => {
          const isVisited = visited.has(node.id);
          const isCurrent = node.id === current;
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={18}
                fill={isCurrent ? "#1d4ed8" : isVisited ? "#93c5fd" : "white"}
                stroke={
                  isCurrent ? "#1e40af" : isVisited ? "#3b82f6" : "#a3a3a3"
                }
                strokeWidth={2}
                style={{ transition: "fill 0.3s, stroke 0.3s" }}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fontSize={14}
                fontWeight="600"
                fill={isCurrent || isVisited ? "white" : "#404040"}
                style={{ transition: "fill 0.3s" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setStep((s) => Math.max(-1, s - 1))}
            disabled={!canPrev}
            className="rounded px-4 py-1.5 text-sm border border-neutral-300 bg-white disabled:opacity-30 hover:enabled:bg-neutral-100 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => setStep((s) => Math.min(order.length - 1, s + 1))}
            disabled={!canNext}
            className="rounded px-4 py-1.5 text-sm border border-neutral-300 bg-white disabled:opacity-30 hover:enabled:bg-neutral-100 transition-colors"
          >
            Next →
          </button>
        </div>
        <div className="text-sm text-neutral-500">
          {step < 0
            ? "Press Next to start"
            : step === order.length - 1
              ? "Done"
              : `Step ${step + 1} / ${order.length}`}
        </div>
      </div>

      {step >= 0 && (
        <div className="mt-3 text-sm text-neutral-600">
          Visit order:{" "}
          <span className="font-mono">
            {order
              .slice(0, step + 1)
              .map((id) => nodes[id].label)
              .join(" → ")}
          </span>
        </div>
      )}
    </div>
  );
}
