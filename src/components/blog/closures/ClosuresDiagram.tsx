export function ClosuresDiagram() {
  return (
    <div className="my-6">
      <svg
        width="100%"
        viewBox="0 0 680 660"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        <title>JavaScript Closure Scope Diagram</title>
        <desc>Left: JS source code with scope-colored line highlights. Right: nested scope diagram showing which variables live where.</desc>
        <defs>
          <marker id="closureArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* LEFT: JS source code */}
        <rect x="20" y="20" width="290" height="620" rx="12" fill="#F5F4ED" stroke="#D4D2C9" strokeWidth="0.5"/>
        <text x="36" y="42" dominantBaseline="central" fill="#6B6A63" fontSize="12">JavaScript</text>

        {/* Line highlight bands */}
        <rect x="28" y="54" width="274" height="20" rx="3" fill="#BFDBF7" opacity="0.8"/>
        <rect x="28" y="74" width="274" height="20" rx="3" fill="#BFDBF7" opacity="0.5"/>
        <rect x="28" y="94" width="274" height="20" rx="3" fill="#C6EDE0" opacity="0.3"/>
        <rect x="28" y="114" width="274" height="20" rx="3" fill="#C6EDE0" opacity="0.8"/>
        <rect x="28" y="134" width="274" height="20" rx="3" fill="#C6EDE0" opacity="0.5"/>
        <rect x="28" y="154" width="274" height="20" rx="3" fill="#C6EDE0" opacity="0.5"/>
        <rect x="28" y="174" width="274" height="20" rx="3" fill="#C6EDE0" opacity="0.3"/>
        <rect x="28" y="194" width="274" height="20" rx="3" fill="#BFDBF7" opacity="0.5"/>
        <rect x="28" y="214" width="274" height="20" rx="3" fill="#BFDBF7" opacity="0.3"/>
        <rect x="28" y="254" width="274" height="20" rx="3" fill="#E8E7DF" opacity="0.8"/>
        <rect x="28" y="274" width="274" height="20" rx="3" fill="#E8E7DF" opacity="0.6"/>
        <rect x="28" y="294" width="274" height="20" rx="3" fill="#E8E7DF" opacity="0.6"/>
        <rect x="28" y="314" width="274" height="20" rx="3" fill="#E8E7DF" opacity="0.6"/>

        {/* Code text */}
        <text x="36" y="64" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"function makeCounter() {"}</text>
        <text x="46" y="84" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"  let count = 0;"}</text>
        <text x="46" y="104" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{" "}</text>
        <text x="46" y="124" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"  function increment() {"}</text>
        <text x="56" y="144" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"    count += 1;"}</text>
        <text x="56" y="164" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"    return count;"}</text>
        <text x="46" y="184" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"  }"}</text>
        <text x="46" y="204" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"  return increment;"}</text>
        <text x="36" y="224" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"}"}</text>

        <text x="36" y="264" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"const counter = makeCounter();"}</text>
        <text x="36" y="284" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">
          {"counter(); "}
          <tspan fill="#B45309">{"// → 1"}</tspan>
        </text>
        <text x="36" y="304" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">
          {"counter(); "}
          <tspan fill="#B45309">{"// → 2"}</tspan>
        </text>
        <text x="36" y="324" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">
          {"counter(); "}
          <tspan fill="#B45309">{"// → 3"}</tspan>
        </text>

        {/* Divider */}
        <line x1="28" y1="344" x2="294" y2="344" stroke="#D4D2C9" strokeWidth="0.5"/>

        {/* Legend */}
        <text x="36" y="366" dominantBaseline="central" fill="#3D3D3A" fontSize="12">Scope color legend</text>
        <rect x="36" y="380" width="12" height="12" rx="2" fill="#2563EB"/>
        <text x="54" y="386" dominantBaseline="central" fill="#3D3D3A" fontSize="12">Outer function scope</text>
        <rect x="36" y="400" width="12" height="12" rx="2" fill="#059669"/>
        <text x="54" y="406" dominantBaseline="central" fill="#3D3D3A" fontSize="12">Inner function (closure)</text>
        <rect x="36" y="420" width="12" height="12" rx="2" fill="#7C3AED"/>
        <text x="54" y="426" dominantBaseline="central" fill="#3D3D3A" fontSize="12">Captured variable</text>
        <rect x="36" y="440" width="12" height="12" rx="2" fill="#D97706"/>
        <text x="54" y="446" dominantBaseline="central" fill="#3D3D3A" fontSize="12">Persists in memory</text>

        <line x1="28" y1="460" x2="294" y2="460" stroke="#D4D2C9" strokeWidth="0.5"/>

        <text x="36" y="480" dominantBaseline="central" fill="#3D3D3A" fontSize="12">Key point vs Python:</text>
        <rect x="36" y="492" width="254" height="32" rx="6" fill="#D1FAE5" stroke="#059669" strokeWidth="0.5"/>
        <text x="163" y="508" textAnchor="middle" dominantBaseline="central" fill="#065F46" fontSize="14" fontWeight="500">No "nonlocal" needed</text>

        <text x="36" y="542" dominantBaseline="central" fill="#3D3D3A" fontSize="12">JS closures capture outer</text>
        <text x="36" y="560" dominantBaseline="central" fill="#3D3D3A" fontSize="12">{"variables by reference →"}</text>
        <text x="36" y="578" dominantBaseline="central" fill="#3D3D3A" fontSize="12">read and write freely.</text>

        {/* RIGHT: Scope diagram */}
        <rect x="350" y="20" width="310" height="620" rx="14" fill="#F5F4ED" stroke="#D4D2C9" strokeWidth="0.5"/>
        <text x="368" y="42" dominantBaseline="central" fill="#6B6A63" fontSize="12">Global scope</text>

        {/* Outer function scope */}
        <rect x="368" y="56" width="274" height="400" rx="12" fill="#EFF6FF" stroke="#2563EB" strokeWidth="0.8"/>
        <text x="384" y="76" dominantBaseline="central" fill="#2563EB" fontSize="12">Outer function scope</text>
        <text x="384" y="96" dominantBaseline="central" fill="#1D4ED8" fontSize="14" fontWeight="500">makeCounter()</text>

        {/* count pill (captured) */}
        <rect x="386" y="112" width="238" height="32" rx="8" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="0.8"/>
        <text x="505" y="128" textAnchor="middle" dominantBaseline="central" fill="#5B21B6" fontSize="14" fontWeight="500">{"let count = 0  ← captured"}</text>

        {/* Inner function scope */}
        <rect x="386" y="162" width="238" height="198" rx="10" fill="#ECFDF5" stroke="#059669" strokeWidth="0.8"/>
        <text x="402" y="182" dominantBaseline="central" fill="#059669" fontSize="12">Inner function (closure)</text>
        <text x="402" y="202" dominantBaseline="central" fill="#065F46" fontSize="14" fontWeight="500">increment()</text>

        {/* inner code box */}
        <rect x="402" y="218" width="206" height="56" rx="8" fill="#F0EFE8" stroke="#D4D2C9" strokeWidth="0.5"/>
        <text x="418" y="240" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"count += 1;"}</text>
        <text x="418" y="260" dominantBaseline="central" fontFamily="ui-monospace, monospace" fill="#1F1E1D" fontSize="12">{"return count;"}</text>

        {/* return increment */}
        <rect x="386" y="290" width="238" height="28" rx="6" fill="#EFF6FF" stroke="#2563EB" strokeWidth="0.5"/>
        <text x="505" y="304" textAnchor="middle" dominantBaseline="central" fill="#1D4ED8" fontSize="14" fontWeight="500">return increment;</text>

        {/* scope chain arrow: inner reads count */}
        <path d="M 545 218 L 545 146" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#closureArrow)"/>
        <text x="546" y="185" dominantBaseline="central" fill="#059669" fontSize="12">reads</text>

        {/* Result boxes */}
        <rect x="356" y="484" width="82" height="44" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="0.8"/>
        <text x="397" y="502" textAnchor="middle" dominantBaseline="central" fill="#7F1D1D" fontSize="14" fontWeight="500">counter()</text>
        <text x="397" y="520" textAnchor="middle" dominantBaseline="central" fill="#DC2626" fontSize="12">→ 1</text>

        <rect x="454" y="484" width="82" height="44" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="0.8"/>
        <text x="495" y="502" textAnchor="middle" dominantBaseline="central" fill="#7F1D1D" fontSize="14" fontWeight="500">counter()</text>
        <text x="495" y="520" textAnchor="middle" dominantBaseline="central" fill="#DC2626" fontSize="12">→ 2</text>

        <rect x="552" y="484" width="82" height="44" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="0.8"/>
        <text x="593" y="502" textAnchor="middle" dominantBaseline="central" fill="#7F1D1D" fontSize="14" fontWeight="500">counter()</text>
        <text x="593" y="520" textAnchor="middle" dominantBaseline="central" fill="#DC2626" fontSize="12">→ 3</text>

        {/* arrows from inner down to results */}
        <path d="M 460 360 L 397 482" fill="none" stroke="#9CA3AF" strokeWidth="0.8" markerEnd="url(#closureArrow)"/>
        <path d="M 505 360 L 495 482" fill="none" stroke="#9CA3AF" strokeWidth="0.8" markerEnd="url(#closureArrow)"/>
        <path d="M 550 360 L 593 482" fill="none" stroke="#9CA3AF" strokeWidth="0.8" markerEnd="url(#closureArrow)"/>

        {/* Memory persists note */}
        <rect x="356" y="544" width="288" height="44" rx="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="0.8"/>
        <text x="500" y="562" textAnchor="middle" dominantBaseline="central" fill="#92400E" fontSize="14" fontWeight="500">{"After makeCounter() returns…"}</text>
        <text x="500" y="580" textAnchor="middle" dominantBaseline="central" fill="#B45309" fontSize="12">count stays alive in memory</text>

        {/* Connector lines: code → scope boxes */}
        <path d="M 312 64 L 366 76" fill="none" stroke="#2563EB" strokeWidth="0.7" strokeDasharray="3 2" markerEnd="url(#closureArrow)"/>
        <path d="M 312 84 L 384 128" fill="none" stroke="#7C3AED" strokeWidth="0.7" strokeDasharray="3 2" markerEnd="url(#closureArrow)"/>
        <path d="M 312 124 L 384 182" fill="none" stroke="#059669" strokeWidth="0.7" strokeDasharray="3 2" markerEnd="url(#closureArrow)"/>
        <path d="M 312 144 L 400 238" fill="none" stroke="#059669" strokeWidth="0.7" strokeDasharray="3 2" markerEnd="url(#closureArrow)"/>
      </svg>
    </div>
  );
}
