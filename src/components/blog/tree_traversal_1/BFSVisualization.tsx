"use client";

import { useAnimatedDiagram } from "@/hooks/useAnimatedDiagram";
import { ReplayButton } from "@/components/ui/ReplayButton";

export function BFSVisualization() {
  const { ref, replay } = useAnimatedDiagram("bfsv-playing");

  return (
    <div ref={ref} className="not-prose my-8 overflow-x-auto">
      <svg
        viewBox="0 0 680 490"
        width="100%"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>BFS: Layer-by-Layer Traversal Animation</title>
        <desc>
          Animated visualization showing BFS visiting nodes layer by layer with
          queue state transitions
        </desc>

        <defs>
          <marker
            id="bfsv-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path
              d="M2 1L8 5L2 9"
              fill="none"
              stroke="context-stroke"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        <style>{`
          .bfsv-f    { opacity: 0; }
          .bfsv-edge { opacity: 0; stroke-dasharray: 250; stroke-dashoffset: 250; }
          .bfsv-c0   { fill: rgb(195,205,190); }
          .bfsv-c1   { fill: rgb(185,200,215); }
          .bfsv-c2   { fill: rgb(190,185,215); }

          @keyframes bfsv-fade { from { opacity: 0; } to { opacity: 1; } }
          @keyframes bfsv-draw { from { stroke-dashoffset: 250; opacity: 1; } to { stroke-dashoffset: 0; opacity: 1; } }
          @keyframes bfsv-col0 { from { fill: rgb(195,205,190); } to { fill: rgb(234,243,222); } }
          @keyframes bfsv-col1 { from { fill: rgb(185,200,215); } to { fill: rgb(230,241,251); } }
          @keyframes bfsv-col2 { from { fill: rgb(190,185,215); } to { fill: rgb(238,237,254); } }

          .bfsv-playing .bfsv-f    { animation: bfsv-fade 0.4s ease forwards; }
          .bfsv-playing .bfsv-edge { animation: bfsv-draw 0.5s ease forwards; }
          .bfsv-playing .bfsv-c0   { animation: bfsv-col0 0.5s ease forwards; }
          .bfsv-playing .bfsv-c1   { animation: bfsv-col1 0.5s ease forwards; }
          .bfsv-playing .bfsv-c2   { animation: bfsv-col2 0.5s ease forwards; }

          .bfsv-playing .bfsv-d1  { animation-delay: 0.2s; }
          .bfsv-playing .bfsv-d2  { animation-delay: 0.8s; }
          .bfsv-playing .bfsv-d3  { animation-delay: 1.2s; }
          .bfsv-playing .bfsv-d4  { animation-delay: 1.6s; }
          .bfsv-playing .bfsv-d5  { animation-delay: 2.0s; }
          .bfsv-playing .bfsv-d6  { animation-delay: 2.4s; }
          .bfsv-playing .bfsv-d7  { animation-delay: 2.8s; }
          .bfsv-playing .bfsv-d8  { animation-delay: 3.2s; }
          .bfsv-playing .bfsv-d9  { animation-delay: 3.6s; }
          .bfsv-playing .bfsv-d10 { animation-delay: 4.0s; }
          .bfsv-playing .bfsv-d11 { animation-delay: 4.4s; }
          .bfsv-playing .bfsv-d12 { animation-delay: 4.8s; }
          .bfsv-playing .bfsv-d13 { animation-delay: 5.2s; }
        `}</style>

        {/* Layer 0 background */}
        <rect x="270" y="58" width="140" height="86" rx="12" fill="#EAF3DE" opacity="0.5" />
        <text x="340" y="50" textAnchor="middle" fill="#3B6D11" fontSize="11" fontWeight="600" fontFamily="-apple-system,system-ui,sans-serif">
          Layer 0 (start)
        </text>

        {/* Layer 1 background */}
        <rect x="104" y="182" width="472" height="84" rx="12" fill="#E6F1FB" opacity="0.5" />
        <text x="340" y="174" textAnchor="middle" fill="#185FA5" fontSize="11" fontWeight="600" fontFamily="-apple-system,system-ui,sans-serif">
          Layer 1 (distance 1)
        </text>

        {/* Layer 2 background */}
        <rect x="32" y="312" width="616" height="84" rx="12" fill="#EEEDFE" opacity="0.45" />
        <text x="340" y="304" textAnchor="middle" fill="#534AB7" fontSize="11" fontWeight="600" fontFamily="-apple-system,system-ui,sans-serif">
          Layer 2 (distance 2)
        </text>

        {/* Edges S → A, B, C */}
        <line className="bfsv-edge bfsv-d2" x1="318" y1="110" x2="196" y2="200" stroke="#378ADD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />
        <line className="bfsv-edge bfsv-d2" x1="340" y1="121" x2="340" y2="198" stroke="#378ADD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />
        <line className="bfsv-edge bfsv-d2" x1="362" y1="110" x2="484" y2="200" stroke="#378ADD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />

        {/* Edges A → D, E */}
        <line className="bfsv-edge bfsv-d6" x1="166" y1="242" x2="104" y2="332" stroke="#7F77DD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />
        <line className="bfsv-edge bfsv-d6" x1="189" y1="244" x2="222" y2="332" stroke="#7F77DD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />

        {/* Edge B → F */}
        <line className="bfsv-edge bfsv-d9" x1="340" y1="246" x2="340" y2="330" stroke="#7F77DD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />

        {/* Edges C → G, H */}
        <line className="bfsv-edge bfsv-d11" x1="491" y1="244" x2="466" y2="332" stroke="#7F77DD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />
        <line className="bfsv-edge bfsv-d11" x1="513" y1="242" x2="568" y2="332" stroke="#7F77DD" strokeWidth="1.4" markerEnd="url(#bfsv-arrow)" />

        {/* Node S */}
        <circle className="bfsv-c0 bfsv-d1" cx="340" cy="93" r="28" stroke="#639922" strokeWidth="1.5" />
        <text x="340" y="88" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="700" fill="#27500A" fontFamily="-apple-system,system-ui,sans-serif">S</text>
        <text x="340" y="104" textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#27500A" fontFamily="-apple-system,system-ui,sans-serif">start</text>
        <text className="bfsv-f bfsv-d1" x="376" y="72" fill="#639922" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">①</text>

        {/* Node A */}
        <circle className="bfsv-c1 bfsv-d3" cx="180" cy="222" r="24" stroke="#378ADD" strokeWidth="1" />
        <text x="180" y="217" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill="#185FA5" fontFamily="-apple-system,system-ui,sans-serif">A</text>
        <text x="180" y="230" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#185FA5" fontFamily="-apple-system,system-ui,sans-serif">visit 2</text>
        <text className="bfsv-f bfsv-d3" x="210" y="203" fill="#378ADD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">②</text>

        {/* Node B */}
        <circle className="bfsv-c1 bfsv-d4" cx="340" cy="222" r="24" stroke="#378ADD" strokeWidth="1" />
        <text x="340" y="217" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill="#185FA5" fontFamily="-apple-system,system-ui,sans-serif">B</text>
        <text x="340" y="230" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#185FA5" fontFamily="-apple-system,system-ui,sans-serif">visit 3</text>
        <text className="bfsv-f bfsv-d4" x="370" y="203" fill="#378ADD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">③</text>

        {/* Node C */}
        <circle className="bfsv-c1 bfsv-d5" cx="500" cy="222" r="24" stroke="#378ADD" strokeWidth="1" />
        <text x="500" y="217" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill="#185FA5" fontFamily="-apple-system,system-ui,sans-serif">C</text>
        <text x="500" y="230" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#185FA5" fontFamily="-apple-system,system-ui,sans-serif">visit 4</text>
        <text className="bfsv-f bfsv-d5" x="530" y="203" fill="#378ADD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">④</text>

        {/* Node D */}
        <circle className="bfsv-c2 bfsv-d7" cx="90" cy="352" r="22" stroke="#7F77DD" strokeWidth="1" />
        <text x="90" y="347" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">D</text>
        <text x="90" y="360" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">visit 5</text>
        <text className="bfsv-f bfsv-d7" x="116" y="333" fill="#7F77DD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">⑤</text>

        {/* Node E */}
        <circle className="bfsv-c2 bfsv-d8" cx="230" cy="352" r="22" stroke="#7F77DD" strokeWidth="1" />
        <text x="230" y="347" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">E</text>
        <text x="230" y="360" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">visit 6</text>
        <text className="bfsv-f bfsv-d8" x="256" y="333" fill="#7F77DD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">⑥</text>

        {/* Node F */}
        <circle className="bfsv-c2 bfsv-d10" cx="340" cy="352" r="22" stroke="#7F77DD" strokeWidth="1" />
        <text x="340" y="347" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">F</text>
        <text x="340" y="360" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">visit 7</text>
        <text className="bfsv-f bfsv-d10" x="366" y="333" fill="#7F77DD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">⑦</text>

        {/* Node G */}
        <circle className="bfsv-c2 bfsv-d12" cx="460" cy="352" r="22" stroke="#7F77DD" strokeWidth="1" />
        <text x="460" y="347" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">G</text>
        <text x="460" y="360" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">visit 8</text>
        <text className="bfsv-f bfsv-d12" x="486" y="333" fill="#7F77DD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">⑧</text>

        {/* Node H */}
        <circle className="bfsv-c2 bfsv-d13" cx="580" cy="352" r="22" stroke="#7F77DD" strokeWidth="1" />
        <text x="580" y="347" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">H</text>
        <text x="580" y="360" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#534AB7" fontFamily="-apple-system,system-ui,sans-serif">visit 9</text>
        <text className="bfsv-f bfsv-d13" x="606" y="333" fill="#7F77DD" fontSize="14" fontWeight="700" fontFamily="-apple-system,system-ui,sans-serif">⑨</text>

        {/* Queue section */}
        <rect x="46" y="406" width="588" height="74" rx="8" fill="none" stroke="#CCCCCC" strokeWidth="1" />
        <text x="62" y="423" fill="#666" fontSize="11" fontWeight="600" fontFamily="-apple-system,system-ui,sans-serif">
          Queue (FIFO)
        </text>

        <g className="bfsv-f bfsv-d1">
          <rect x="62" y="430" width="64" height="20" rx="4" fill="#EAF3DE" stroke="#639922" strokeWidth="0.5" />
          <text x="94" y="444" textAnchor="middle" fontSize="10" fill="#27500A" fontFamily="-apple-system,system-ui,sans-serif">Init: [S]</text>
        </g>

        <text className="bfsv-f bfsv-d2" x="134" y="444" textAnchor="middle" fill="#888" fontSize="13">→</text>

        <g className="bfsv-f bfsv-d2">
          <rect x="144" y="430" width="100" height="20" rx="4" fill="#E6F1FB" stroke="#185FA5" strokeWidth="0.5" />
          <text x="194" y="444" textAnchor="middle" fontSize="10" fill="#0C447C" fontFamily="-apple-system,system-ui,sans-serif">Pop S: [A,B,C]</text>
        </g>

        <text className="bfsv-f bfsv-d6" x="252" y="444" textAnchor="middle" fill="#888" fontSize="13">→</text>

        <g className="bfsv-f bfsv-d6">
          <rect x="262" y="430" width="118" height="20" rx="4" fill="#EEEDFE" stroke="#534AB7" strokeWidth="0.5" />
          <text x="321" y="444" textAnchor="middle" fontSize="10" fill="#3C3489" fontFamily="-apple-system,system-ui,sans-serif">Pop A: [B,C,D,E]</text>
        </g>

        <text className="bfsv-f bfsv-d9" x="388" y="444" textAnchor="middle" fill="#888" fontSize="13">→</text>

        <g className="bfsv-f bfsv-d9">
          <rect x="398" y="430" width="118" height="20" rx="4" fill="#EEEDFE" stroke="#534AB7" strokeWidth="0.5" />
          <text x="457" y="444" textAnchor="middle" fontSize="10" fill="#3C3489" fontFamily="-apple-system,system-ui,sans-serif">Pop B: [C,D,E,F]</text>
        </g>

        <text className="bfsv-f bfsv-d1" x="340" y="470" textAnchor="middle" fontSize="10" fill="#888" fontFamily="-apple-system,system-ui,sans-serif">
          Each layer is fully explored before moving to the next
        </text>
      </svg>
      <div className="flex justify-center mt-3">
        <ReplayButton onClick={replay} />
      </div>
    </div>
  );
}
