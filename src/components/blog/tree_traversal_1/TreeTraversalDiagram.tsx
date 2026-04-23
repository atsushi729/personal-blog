const BORDER_COLOR = "rgba(31, 30, 29, 0.4)";

export function TreeTraversalDiagram() {
  return (
    <div className="not-prose my-8 overflow-x-auto">
      <svg
        width="100%"
        viewBox="0 0 680 400"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full"
      >
        <title>Tree Traversal Techniques</title>
        <desc>木の走査技法の分類図。DFSとBFSの2種類に大別され、DFSはInorder・Preorder・Postorderの3種に分かれる。</desc>

        <rect x="190" y="20" width="300" height="52" rx="10" fill="rgb(234,243,222)" stroke="rgb(59,109,17)" strokeWidth="0.5" />
        <text x="340" y="50" textAnchor="middle" dominantBaseline="central" fill="rgb(39,80,10)" fontSize="14" fontWeight="500">
          Tree Traversal Techniques
        </text>

        <line x1="340" y1="72" x2="340" y2="100" stroke={BORDER_COLOR} strokeWidth="1.2" />
        <line x1="170" y1="100" x2="510" y2="100" stroke={BORDER_COLOR} strokeWidth="1.2" />
        <line x1="170" y1="100" x2="170" y2="120" stroke={BORDER_COLOR} strokeWidth="1.2" />
        <line x1="510" y1="100" x2="510" y2="120" stroke={BORDER_COLOR} strokeWidth="1.2" />

        <rect x="50" y="120" width="240" height="62" rx="10" fill="rgb(238,237,254)" stroke="rgb(83,74,183)" strokeWidth="0.5" />
        <text x="170" y="144" textAnchor="middle" dominantBaseline="central" fill="rgb(60,52,137)" fontSize="14" fontWeight="500">
          Depth First Traversal
        </text>
        <text x="170" y="163" textAnchor="middle" dominantBaseline="central" fill="rgb(83,74,183)" fontSize="12">
          (DFS)
        </text>

        <rect x="390" y="120" width="240" height="62" rx="10" fill="rgb(230,241,251)" stroke="rgb(24,95,165)" strokeWidth="0.5" />
        <text x="510" y="138" textAnchor="middle" dominantBaseline="central" fill="rgb(12,68,124)" fontSize="14" fontWeight="500">
          Breadth First Traversal
        </text>
        <text x="510" y="156" textAnchor="middle" dominantBaseline="central" fill="rgb(24,95,165)" fontSize="12">
          (Level Order Traversal
        </text>
        <text x="510" y="172" textAnchor="middle" dominantBaseline="central" fill="rgb(24,95,165)" fontSize="12">
          or BFS)
        </text>

        <line x1="170" y1="182" x2="170" y2="215" stroke={BORDER_COLOR} strokeWidth="1.2" />
        <line x1="170" y1="215" x2="170" y2="355" stroke={BORDER_COLOR} strokeWidth="1.2" />

        <line x1="170" y1="235" x2="230" y2="235" stroke={BORDER_COLOR} strokeWidth="1.2" />
        <line x1="170" y1="295" x2="230" y2="295" stroke={BORDER_COLOR} strokeWidth="1.2" />
        <line x1="170" y1="355" x2="230" y2="355" stroke={BORDER_COLOR} strokeWidth="1.2" />

        <rect x="230" y="213" width="200" height="44" rx="10" fill="rgb(250,238,218)" stroke="rgb(133,79,11)" strokeWidth="0.5" />
        <text x="330" y="235" textAnchor="middle" dominantBaseline="central" fill="rgb(99,56,6)" fontSize="14" fontWeight="500">
          Inorder Traversal
        </text>

        <rect x="230" y="273" width="200" height="44" rx="10" fill="rgb(250,238,218)" stroke="rgb(133,79,11)" strokeWidth="0.5" />
        <text x="330" y="295" textAnchor="middle" dominantBaseline="central" fill="rgb(99,56,6)" fontSize="14" fontWeight="500">
          Preorder Traversal
        </text>

        <rect x="230" y="333" width="200" height="44" rx="10" fill="rgb(250,238,218)" stroke="rgb(133,79,11)" strokeWidth="0.5" />
        <text x="330" y="355" textAnchor="middle" dominantBaseline="central" fill="rgb(99,56,6)" fontSize="14" fontWeight="500">
          Postorder Traversal
        </text>
      </svg>
    </div>
  );
}
