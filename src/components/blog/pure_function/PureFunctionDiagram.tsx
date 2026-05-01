"use client";

import { useAnimatedDiagram } from "@/hooks/useAnimatedDiagram";
import { ReplayButton } from "@/components/ui/ReplayButton";

// Cumulative animation delays (ms) for each step:
//   Pure section  — d0(0) d1(500) d2(900) d3(1300) d4(1800) d5(2100) d6(2700) d7(3100) d8(3500)
//   [1500ms pause]
//   Impure section — d9(5000) d10(5500) d11(5900) d12(6400) d13(6800) d14(7200) d15(7800) d16(8200) d17(8600)

export function PureFunctionDiagram() {
  const { ref, replay } = useAnimatedDiagram("pfd-playing");

  return (
    <div ref={ref} className="my-6">
      <svg
        width="100%"
        viewBox="0 0 699 580"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      >
        <style>{`
          .pfd-f { opacity: 0; }
          @keyframes pfd-fade { to { opacity: 1; } }
          .pfd-playing .pfd-f { animation: pfd-fade 0.4s ease forwards; }

          .pfd-playing .pfd-d0  { animation-delay:    0ms; }
          .pfd-playing .pfd-d1  { animation-delay:  500ms; }
          .pfd-playing .pfd-d2  { animation-delay:  900ms; }
          .pfd-playing .pfd-d3  { animation-delay: 1300ms; }
          .pfd-playing .pfd-d4  { animation-delay: 1800ms; }
          .pfd-playing .pfd-d5  { animation-delay: 2100ms; }
          .pfd-playing .pfd-d6  { animation-delay: 2700ms; }
          .pfd-playing .pfd-d7  { animation-delay: 3100ms; }
          .pfd-playing .pfd-d8  { animation-delay: 3500ms; }
          .pfd-playing .pfd-d9  { animation-delay: 5000ms; }
          .pfd-playing .pfd-d10 { animation-delay: 5500ms; }
          .pfd-playing .pfd-d11 { animation-delay: 5900ms; }
          .pfd-playing .pfd-d12 { animation-delay: 6400ms; }
          .pfd-playing .pfd-d13 { animation-delay: 6800ms; }
          .pfd-playing .pfd-d14 { animation-delay: 7200ms; }
          .pfd-playing .pfd-d15 { animation-delay: 7800ms; }
          .pfd-playing .pfd-d16 { animation-delay: 8200ms; }
          .pfd-playing .pfd-d17 { animation-delay: 8600ms; }
        `}</style>

        <defs>
          <marker
            id="pfArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
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

        {/* ===== Pure function panel (always visible) ===== */}
        <text
          x="170"
          y="28"
          textAnchor="middle"
          fill="#141413"
          fontSize="14"
          fontWeight="500"
        >
          Pure function
        </text>
        <rect
          x="40"
          y="36"
          width="260"
          height="238"
          rx="14"
          fill="#EAF3DE"
          stroke="#639922"
          strokeWidth="1"
        />

        {/* Pure input nodes — d0, d1, d2 */}
        <g className="pfd-f pfd-d0">
          <rect
            x="56"
            y="58"
            width="72"
            height="32"
            rx="6"
            fill="#E1F5EE"
            stroke="#0F6E56"
            strokeWidth="0.5"
          />
          <text
            x="92"
            y="74"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0F6E56"
            fontSize="12"
          >
            x = 3
          </text>
        </g>
        <g className="pfd-f pfd-d1">
          <rect
            x="56"
            y="100"
            width="72"
            height="32"
            rx="6"
            fill="#E1F5EE"
            stroke="#0F6E56"
            strokeWidth="0.5"
          />
          <text
            x="92"
            y="116"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0F6E56"
            fontSize="12"
          >
            x = 3
          </text>
        </g>
        <g className="pfd-f pfd-d2">
          <rect
            x="56"
            y="142"
            width="72"
            height="32"
            rx="6"
            fill="#E1F5EE"
            stroke="#0F6E56"
            strokeWidth="0.5"
          />
          <text
            x="92"
            y="158"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0F6E56"
            fontSize="12"
          >
            x = 3
          </text>
        </g>

        {/* f(x) function box — d3 */}
        <g className="pfd-f pfd-d3">
          <rect
            x="158"
            y="100"
            width="100"
            height="74"
            rx="10"
            fill="#EAF3DE"
            stroke="#3B6D11"
            strokeWidth="1.2"
          />
          <text
            x="208"
            y="128"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#27500A"
            fontSize="14"
            fontWeight="500"
          >
            f(x)
          </text>
          <text
            x="208"
            y="148"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3B6D11"
            fontSize="12"
          >
            x × 2
          </text>
        </g>

        {/* Arrows: inputs → function — d4 */}
        <g className="pfd-f pfd-d4">
          <line
            x1="128"
            y1="74"
            x2="156"
            y2="118"
            stroke="#1D9E75"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <line
            x1="128"
            y1="116"
            x2="156"
            y2="130"
            stroke="#1D9E75"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <line
            x1="128"
            y1="158"
            x2="156"
            y2="148"
            stroke="#1D9E75"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
        </g>

        {/* Output nodes + fn→output arrows — d5, d6, d7 */}
        <g className="pfd-f pfd-d5">
          <line
            x1="258"
            y1="118"
            x2="280"
            y2="112"
            stroke="#1D9E75"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <rect
            x="282"
            y="96"
            width="72"
            height="32"
            rx="6"
            fill="#EAF3DE"
            stroke="#3B6D11"
            strokeWidth="0.5"
          />
          <text
            x="318"
            y="112"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3B6D11"
            fontSize="12"
          >
            6
          </text>
        </g>
        <g className="pfd-f pfd-d6">
          <line
            x1="258"
            y1="137"
            x2="280"
            y2="150"
            stroke="#1D9E75"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <rect
            x="282"
            y="134"
            width="72"
            height="32"
            rx="6"
            fill="#EAF3DE"
            stroke="#3B6D11"
            strokeWidth="0.5"
          />
          <text
            x="318"
            y="150"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3B6D11"
            fontSize="12"
          >
            6
          </text>
        </g>
        <g className="pfd-f pfd-d7">
          <line
            x1="258"
            y1="158"
            x2="280"
            y2="183"
            stroke="#1D9E75"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <rect
            x="282"
            y="172"
            width="72"
            height="32"
            rx="6"
            fill="#EAF3DE"
            stroke="#3B6D11"
            strokeWidth="0.5"
          />
          <text
            x="318"
            y="188"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3B6D11"
            fontSize="12"
          >
            6
          </text>
        </g>

        {/* Pure labels + badge — d8 */}
        <g className="pfd-f pfd-d8">
          <text x="92" y="200" textAnchor="middle" fill="#3D3D3A" fontSize="12">
            same input
          </text>
          <text x="92" y="216" textAnchor="middle" fill="#3D3D3A" fontSize="12">
            every time
          </text>
          <text
            x="318"
            y="216"
            textAnchor="middle"
            fill="#3D3D3A"
            fontSize="12"
          >
            always same output
          </text>
          <rect
            x="56"
            y="240"
            width="230"
            height="24"
            rx="6"
            fill="#C0DD97"
            stroke="#639922"
            strokeWidth="0.5"
          />
          <text
            x="171"
            y="252"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3D3D3A"
            fontSize="12"
          >
            does not read or mutate external state
          </text>
        </g>

        {/* ===== Impure function panel (always visible) ===== */}
        <text
          x="510"
          y="28"
          textAnchor="middle"
          fill="#141413"
          fontSize="14"
          fontWeight="500"
        >
          Impure function
        </text>
        <rect
          x="380"
          y="36"
          width="260"
          height="238"
          rx="14"
          fill="#FCEBEB"
          stroke="#E24B4A"
          strokeWidth="1"
        />

        {/* External state node — d9 */}
        <g className="pfd-f pfd-d9">
          <rect
            x="470"
            y="54"
            width="100"
            height="32"
            rx="6"
            fill="#FAEEDA"
            stroke="#854F0B"
            strokeWidth="0.8"
          />
          <text
            x="520"
            y="70"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#854F0B"
            fontSize="12"
          >
            external: count
          </text>
        </g>

        {/* Impure input nodes — d10, d11 */}
        <g className="pfd-f pfd-d10">
          <rect
            x="394"
            y="120"
            width="72"
            height="32"
            rx="6"
            fill="#FAECEA"
            stroke="#993C1D"
            strokeWidth="0.5"
          />
          <text
            x="430"
            y="136"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#993C1D"
            fontSize="12"
          >
            x = 3
          </text>
        </g>
        <g className="pfd-f pfd-d11">
          <rect
            x="394"
            y="162"
            width="72"
            height="32"
            rx="6"
            fill="#FAECEA"
            stroke="#993C1D"
            strokeWidth="0.5"
          />
          <text
            x="430"
            y="178"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#993C1D"
            fontSize="12"
          >
            x = 3
          </text>
        </g>

        {/* g(x) function box — d12 */}
        <g className="pfd-f pfd-d12">
          <rect
            x="488"
            y="114"
            width="108"
            height="74"
            rx="10"
            fill="#FCEBEB"
            stroke="#A32D2D"
            strokeWidth="1.2"
          />
          <text
            x="542"
            y="140"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#791F1F"
            fontSize="14"
            fontWeight="500"
          >
            g(x)
          </text>
          <text
            x="542"
            y="158"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#A32D2D"
            fontSize="12"
          >
            x + count++
          </text>
        </g>

        {/* Dashed arrow: external state → fn + label — d13 */}
        <g className="pfd-f pfd-d13">
          <line
            x1="520"
            y1="86"
            x2="520"
            y2="112"
            stroke="#E24B4A"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            markerEnd="url(#pfArrow)"
          />
          <text x="560" y="102" fill="#3D3D3A" fontSize="12">
            reads &amp; mutates
          </text>
        </g>

        {/* Arrows: impure inputs → fn — d14 */}
        <g className="pfd-f pfd-d14">
          <line
            x1="466"
            y1="136"
            x2="486"
            y2="140"
            stroke="#D85A30"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <line
            x1="466"
            y1="178"
            x2="486"
            y2="162"
            stroke="#D85A30"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
        </g>

        {/* Impure output nodes — d15, d16 */}
        <g className="pfd-f pfd-d15">
          <line
            x1="596"
            y1="136"
            x2="620"
            y2="130"
            stroke="#E24B4A"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <rect
            x="622"
            y="114"
            width="48"
            height="32"
            rx="6"
            fill="#FCEBEB"
            stroke="#A32D2D"
            strokeWidth="0.5"
          />
          <text
            x="646"
            y="130"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#A32D2D"
            fontSize="12"
          >
            4
          </text>
        </g>
        <g className="pfd-f pfd-d16">
          <line
            x1="596"
            y1="158"
            x2="620"
            y2="172"
            stroke="#E24B4A"
            strokeWidth="1"
            markerEnd="url(#pfArrow)"
          />
          <rect
            x="622"
            y="156"
            width="48"
            height="32"
            rx="6"
            fill="#FCEBEB"
            stroke="#A32D2D"
            strokeWidth="0.5"
          />
          <text
            x="646"
            y="172"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#A32D2D"
            fontSize="12"
          >
            5
          </text>
        </g>

        {/* Impure labels + badge — d17 */}
        <g className="pfd-f pfd-d17">
          <text
            x="646"
            y="205"
            textAnchor="middle"
            fill="#3D3D3A"
            fontSize="12"
          >
            same input,
          </text>
          <text
            x="646"
            y="220"
            textAnchor="middle"
            fill="#3D3D3A"
            fontSize="12"
          >
            different result
          </text>
          <rect
            x="390"
            y="240"
            width="240"
            height="24"
            rx="6"
            fill="#F7C1C1"
            stroke="#E24B4A"
            strokeWidth="0.5"
          />
          <text
            x="510"
            y="252"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3D3D3A"
            fontSize="12"
          >
            depends on &amp; mutates external state
          </text>
        </g>

        {/* ===== Bottom section (always visible) ===== */}
        <text
          x="340"
          y="302"
          textAnchor="middle"
          fill="#141413"
          fontSize="14"
          fontWeight="500"
        >
          Two core rules of pure functions
        </text>

        <g>
          <rect
            x="40"
            y="316"
            width="286"
            height="88"
            rx="12"
            fill="#E6F1FB"
            stroke="#185FA5"
            strokeWidth="1"
          />
          <text
            x="183"
            y="345"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0C447C"
            fontSize="14"
            fontWeight="500"
          >
            ① Referential transparency
          </text>
          <text
            x="183"
            y="367"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#185FA5"
            fontSize="12"
          >
            f(3) always returns the same value
          </text>
          <text
            x="183"
            y="385"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#185FA5"
            fontSize="12"
          >
            call can be replaced by its result
          </text>
        </g>

        <g>
          <rect
            x="354"
            y="316"
            width="286"
            height="88"
            rx="12"
            fill="#EEEDFE"
            stroke="#534AB7"
            strokeWidth="1"
          />
          <text
            x="497"
            y="345"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#3C3489"
            fontSize="14"
            fontWeight="500"
          >
            ② No side effects
          </text>
          <text
            x="497"
            y="367"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#534AB7"
            fontSize="12"
          >
            I/O, global vars, DB writes NG
          </text>
          <text
            x="497"
            y="385"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#534AB7"
            fontSize="12"
          >
            zero impact on the outside world
          </text>
        </g>

        <g>
          <rect
            x="40"
            y="424"
            width="600"
            height="44"
            rx="10"
            fill="#F5F4ED"
            stroke="rgba(31,30,29,0.15)"
            strokeWidth="0.5"
          />
          <text
            x="340"
            y="441"
            textAnchor="middle"
            fill="#3D3D3A"
            fontSize="12"
            fontWeight="500"
          >
            Benefits of pure functions
          </text>
          <text
            x="340"
            y="458"
            textAnchor="middle"
            fill="#3D3D3A"
            fontSize="12"
          >
            Easy to test · Safe to parallelize · Memoizable · Easy to debug
          </text>
        </g>

        <g>
          <rect
            x="40"
            y="486"
            width="600"
            height="78"
            rx="10"
            fill="#FAEEDA"
            stroke="#EF9F27"
            strokeWidth="0.5"
          />
          <text x="56" y="506" fill="#3D3D3A" fontSize="12" fontWeight="500">
            Examples of side effects (avoided in pure functions)
          </text>
          <text x="56" y="524" fill="#854F0B" fontSize="12">
            · console.log() calls (I/O)
          </text>
          <text x="56" y="540" fill="#854F0B" fontSize="12">
            · Mutating global variables or objects
          </text>
          <text x="56" y="556" fill="#854F0B" fontSize="12">
            · HTTP requests, DB writes, file operations
          </text>
        </g>
      </svg>

      <div className="flex justify-center mt-3">
        <ReplayButton onClick={replay} />
      </div>
    </div>
  );
}
