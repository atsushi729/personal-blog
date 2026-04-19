"use client";

import { useEffect, useRef } from "react";

export function TreeTraversalOrders() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("tto-playing");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="not-prose my-8 overflow-x-auto">
      <svg viewBox="0 0 680 520" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>Tree Traversal Orders: Pre-Order, In-Order, Post-Order</title>
        <desc>Comparison of three binary tree traversal methods with animated diagrams and pseudocode.</desc>
        <defs>
          <marker id="tto-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>
        <style>{`
          .tto-f  { opacity: 0; }
          .tto-a  { opacity: 0; stroke-dasharray: 100; stroke-dashoffset: 100; }
          .tto-np { fill: rgb(225,225,230); }
          .tto-ng { fill: rgb(220,230,225); }
          .tto-no { fill: rgb(230,225,220); }

          @keyframes tto-fade  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes tto-draw  { from { stroke-dashoffset: 100; opacity: 1; } to { stroke-dashoffset: 0; opacity: 1; } }
          @keyframes tto-vp { from { fill: rgb(225,225,230); } to { fill: rgb(238,237,254); } }
          @keyframes tto-vg { from { fill: rgb(220,230,225); } to { fill: rgb(225,245,238); } }
          @keyframes tto-vo { from { fill: rgb(230,225,220); } to { fill: rgb(250,236,231); } }

          .tto-playing .tto-f  { animation: tto-fade 0.5s ease forwards; }
          .tto-playing .tto-a  { animation: tto-draw 0.5s ease forwards; }
          .tto-playing .tto-np { animation: tto-vp   0.5s ease forwards; }
          .tto-playing .tto-ng { animation: tto-vg   0.5s ease forwards; }
          .tto-playing .tto-no { animation: tto-vo   0.5s ease forwards; }

          .tto-playing .d1 { animation-delay: 0.4s; }
          .tto-playing .d2 { animation-delay: 1.1s; }
          .tto-playing .d3 { animation-delay: 1.8s; }
          .tto-playing .d4 { animation-delay: 2.5s; }
          .tto-playing .d5 { animation-delay: 3.2s; }
        `}</style>

        {/* ── PRE-ORDER ── */}
        <text x="113" y="22" textAnchor="middle" fill="rgb(20,20,19)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">Pre-Order</text>
        <text x="113" y="38" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">root → left → right</text>
        <polygon points="113,55 55,130 171,130" fill="none" stroke="rgba(31,30,29,0.3)" strokeWidth="1.2"/>

        {/* root: visited at step 1 */}
        <circle className="tto-np d1" cx="113" cy="62" r="14" stroke="rgb(83,74,183)" strokeWidth="0.5"/>
        <text x="113" y="62" textAnchor="middle" dominantBaseline="central" fill="rgb(60,52,137)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">R</text>
        <text className="tto-f d1" x="133" y="55" fill="rgb(127,119,221)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">①</text>

        <path className="tto-a d2" d="M105,73 Q88,93 80,111" fill="none" stroke="rgb(127,119,221)" strokeWidth="1.4" markerEnd="url(#tto-arrow)"/>

        {/* left: visited at step 3 */}
        <circle className="tto-ng d3" cx="72" cy="123" r="14" stroke="rgb(15,110,86)" strokeWidth="0.5"/>
        <text x="72" y="123" textAnchor="middle" dominantBaseline="central" fill="rgb(8,80,65)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">L</text>
        <text className="tto-f d3" x="52" y="115" fill="rgb(29,158,117)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">②</text>

        <path className="tto-a d4" d="M86,117 Q120,105 140,113" fill="none" stroke="rgb(29,158,117)" strokeWidth="1.4" markerEnd="url(#tto-arrow)"/>

        {/* right: visited at step 5 */}
        <circle className="tto-no d5" cx="154" cy="123" r="14" stroke="rgb(153,60,29)" strokeWidth="0.5"/>
        <text x="154" y="123" textAnchor="middle" dominantBaseline="central" fill="rgb(113,43,19)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">R</text>
        <text className="tto-f d5" x="172" y="115" fill="rgb(216,90,48)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">③</text>

        <rect x="16" y="148" width="194" height="115" rx="6" fill="rgb(245,244,237)" stroke="rgba(31,30,29,0.3)" strokeWidth="0.5"/>
        <text x="113" y="167" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontWeight="500" fontFamily="monospace">function pre-order(T)</text>
        <text x="113" y="186" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">if !ISEMPTY(T) then</text>
        <rect x="60" y="193" width="106" height="18" rx="3" fill="rgb(232,89,60)" opacity="0.18"/>
        <text x="113" y="206" textAnchor="middle" fill="rgb(216,90,48)" fontSize="12" fontWeight="500" fontFamily="monospace">① visit(root(T))</text>
        <text x="113" y="222" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">pre-order(left(T))</text>
        <text x="113" y="238" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">pre-order(right(T))</text>
        <text x="113" y="254" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">end if / end function</text>

        {/* ── IN-ORDER ── */}
        <text x="340" y="22" textAnchor="middle" fill="rgb(20,20,19)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">In-Order</text>
        <text x="340" y="38" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">left → root → right</text>
        <polygon points="340,55 282,130 398,130" fill="none" stroke="rgba(31,30,29,0.3)" strokeWidth="1.2"/>

        {/* left: visited at step 1 */}
        <circle className="tto-ng d1" cx="299" cy="123" r="14" stroke="rgb(15,110,86)" strokeWidth="0.5"/>
        <text x="299" y="123" textAnchor="middle" dominantBaseline="central" fill="rgb(8,80,65)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">L</text>
        <text className="tto-f d1" x="279" y="115" fill="rgb(29,158,117)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">①</text>

        <path className="tto-a d2" d="M307,113 Q320,93 332,75" fill="none" stroke="rgb(29,158,117)" strokeWidth="1.4" markerEnd="url(#tto-arrow)"/>

        {/* root: visited at step 3 */}
        <circle className="tto-np d3" cx="340" cy="62" r="14" stroke="rgb(83,74,183)" strokeWidth="0.5"/>
        <text x="340" y="62" textAnchor="middle" dominantBaseline="central" fill="rgb(60,52,137)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">R</text>
        <text className="tto-f d3" x="360" y="55" fill="rgb(127,119,221)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">②</text>

        <path className="tto-a d4" d="M352,73 Q366,93 373,111" fill="none" stroke="rgb(127,119,221)" strokeWidth="1.4" markerEnd="url(#tto-arrow)"/>

        {/* right: visited at step 5 */}
        <circle className="tto-no d5" cx="381" cy="123" r="14" stroke="rgb(153,60,29)" strokeWidth="0.5"/>
        <text x="381" y="123" textAnchor="middle" dominantBaseline="central" fill="rgb(113,43,19)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">R</text>
        <text className="tto-f d5" x="399" y="115" fill="rgb(216,90,48)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">③</text>

        <rect x="243" y="148" width="194" height="115" rx="6" fill="rgb(245,244,237)" stroke="rgba(31,30,29,0.3)" strokeWidth="0.5"/>
        <text x="340" y="167" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontWeight="500" fontFamily="monospace">function in-order(T)</text>
        <text x="340" y="186" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">if !ISEMPTY(T) then</text>
        <text x="340" y="202" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">in-order(left(T))</text>
        <rect x="287" y="209" width="106" height="18" rx="3" fill="rgb(232,89,60)" opacity="0.18"/>
        <text x="340" y="222" textAnchor="middle" fill="rgb(216,90,48)" fontSize="12" fontWeight="500" fontFamily="monospace">② visit(root(T))</text>
        <text x="340" y="238" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">in-order(right(T))</text>
        <text x="340" y="254" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">end if / end function</text>

        {/* ── POST-ORDER ── */}
        <text x="567" y="22" textAnchor="middle" fill="rgb(20,20,19)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">Post-Order</text>
        <text x="567" y="38" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">left → right → root</text>
        <polygon points="567,55 509,130 625,130" fill="none" stroke="rgba(31,30,29,0.3)" strokeWidth="1.2"/>

        {/* left: visited at step 1 */}
        <circle className="tto-ng d1" cx="526" cy="123" r="14" stroke="rgb(15,110,86)" strokeWidth="0.5"/>
        <text x="526" y="123" textAnchor="middle" dominantBaseline="central" fill="rgb(8,80,65)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">L</text>
        <text className="tto-f d1" x="506" y="115" fill="rgb(29,158,117)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">①</text>

        <path className="tto-a d2" d="M540,117 Q574,105 594,113" fill="none" stroke="rgb(29,158,117)" strokeWidth="1.4" markerEnd="url(#tto-arrow)"/>

        {/* right: visited at step 3 */}
        <circle className="tto-no d3" cx="608" cy="123" r="14" stroke="rgb(153,60,29)" strokeWidth="0.5"/>
        <text x="608" y="123" textAnchor="middle" dominantBaseline="central" fill="rgb(113,43,19)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">R</text>
        <text className="tto-f d3" x="626" y="115" fill="rgb(216,90,48)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">②</text>

        <path className="tto-a d4" d="M600,111 Q588,90 577,76" fill="none" stroke="rgb(216,90,48)" strokeWidth="1.4" markerEnd="url(#tto-arrow)"/>

        {/* root: visited at step 5 */}
        <circle className="tto-np d5" cx="567" cy="62" r="14" stroke="rgb(83,74,183)" strokeWidth="0.5"/>
        <text x="567" y="62" textAnchor="middle" dominantBaseline="central" fill="rgb(60,52,137)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">R</text>
        <text className="tto-f d5" x="587" y="55" fill="rgb(127,119,221)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">③</text>

        <rect x="470" y="148" width="194" height="115" rx="6" fill="rgb(245,244,237)" stroke="rgba(31,30,29,0.3)" strokeWidth="0.5"/>
        <text x="567" y="167" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontWeight="500" fontFamily="monospace">function post-order(T)</text>
        <text x="567" y="186" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">if !ISEMPTY(T) then</text>
        <text x="567" y="202" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">post-order(left(T))</text>
        <text x="567" y="218" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">post-order(right(T))</text>
        <rect x="514" y="225" width="106" height="18" rx="3" fill="rgb(232,89,60)" opacity="0.18"/>
        <text x="567" y="238" textAnchor="middle" fill="rgb(216,90,48)" fontSize="12" fontWeight="500" fontFamily="monospace">③ visit(root(T))</text>
        <text x="567" y="254" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="monospace">end if / end function</text>

        {/* ── Divider ── */}
        <rect x="16" y="280" width="648" height="1" fill="rgba(31,30,29,0.15)"/>
        <text x="340" y="300" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Traversal order comparison on the same tree</text>

        {/* Legend */}
        <circle cx="60" cy="320" r="7" fill="rgb(127,119,221)"/>
        <text x="74" y="324" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Root node</text>
        <circle cx="200" cy="320" r="7" fill="rgb(29,158,117)"/>
        <text x="214" y="324" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Left subtree</text>
        <circle cx="360" cy="320" r="7" fill="rgb(216,90,48)"/>
        <text x="374" y="324" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Right subtree</text>
        <rect x="510" y="313" width="12" height="12" rx="3" fill="rgb(232,89,60)" opacity="0.4"/>
        <text x="528" y="324" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">visit( ) call</text>

        {/* ── Example table ── */}
        <rect x="16" y="344" width="648" height="130" rx="8" fill="rgb(245,244,237)" stroke="rgba(31,30,29,0.3)" strokeWidth="0.5"/>
        <text x="340" y="366" textAnchor="middle" fill="rgb(20,20,19)" fontSize="14" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">Example: root = A, left = B, right = C</text>
        <text x="113" y="386" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">Method</text>
        <text x="340" y="386" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">Visit order</text>
        <text x="567" y="386" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontWeight="500" fontFamily="-apple-system,system-ui,sans-serif">Common use case</text>
        <line x1="16" y1="393" x2="664" y2="393" stroke="rgba(31,30,29,0.15)" strokeWidth="0.5"/>
        <text x="113" y="413" textAnchor="middle" fill="rgb(127,119,221)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Pre-Order</text>
        <text x="340" y="413" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">A → B → C</text>
        <text x="567" y="413" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Tree copy / serialization</text>
        <line x1="16" y1="420" x2="664" y2="420" stroke="rgba(31,30,29,0.15)" strokeWidth="0.5"/>
        <text x="113" y="440" textAnchor="middle" fill="rgb(29,158,117)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">In-Order</text>
        <text x="340" y="440" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">B → A → C</text>
        <text x="567" y="440" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Sorted output from BST</text>
        <line x1="16" y1="447" x2="664" y2="447" stroke="rgba(31,30,29,0.15)" strokeWidth="0.5"/>
        <text x="113" y="467" textAnchor="middle" fill="rgb(216,90,48)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Post-Order</text>
        <text x="340" y="467" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">B → C → A</text>
        <text x="567" y="467" textAnchor="middle" fill="rgb(61,61,58)" fontSize="12" fontFamily="-apple-system,system-ui,sans-serif">Memory free / dependency resolve</text>
      </svg>
    </div>
  );
}
