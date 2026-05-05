"use client";

import { useAnimatedDiagram } from "@/hooks/useAnimatedDiagram";
import { ReplayButton } from "@/components/ui/ReplayButton";

/*
 * 10-second animation timeline
 *
 *  0-10%  main pushes   (0 – 1 s)
 * 10-20%  calc pushes   (1 – 2 s)
 * 20-30%  add  pushes   (2 – 3 s)
 * 30-50%  all 3 held    (3 – 5 s)
 * 50-60%  add  pops     (5 – 6 s)
 * 60-70%  calc pops     (6 – 7 s)
 * 70-80%  main pops     (7 – 8 s)
 * 80-100% empty hold    (8 –10 s)
 *
 * Code-block state:
 *   active  = top of stack   → opacity 1.0
 *   waiting = on stack below → opacity 0.45
 *   idle    = not on stack   → opacity 0.25
 */

export function CallStackDiagram() {
  const { ref, replay } = useAnimatedDiagram("cs-playing");

  const css = `
    /* ── initial hidden state ─────────────────────────────────── */
    .cs-main-frame, .cs-calc-frame, .cs-add-frame,
    .cs-sp-main, .cs-sp-calc, .cs-sp-add,
    .cs-push-label, .cs-pop-label { opacity: 0; }

    /* ── code blocks: base ────────────────────────────────────── */
    .cs-code-main, .cs-code-calc, .cs-code-add { opacity: 0.85; }

    /* ── lines: base ──────────────────────────────────────────── */
    .cs-line-main, .cs-line-calc, .cs-line-add { opacity: 0.15; }

    /* ── stack frames ─────────────────────────────────────────── */
    .cs-playing .cs-main-frame  { animation: cs-main  10s ease forwards; }
    .cs-playing .cs-calc-frame  { animation: cs-calc  10s ease forwards; }
    .cs-playing .cs-add-frame   { animation: cs-add   10s ease forwards; }

    .cs-main-frame, .cs-calc-frame, .cs-add-frame {
      transform-box: fill-box;
      transform-origin: center bottom;
    }

    @keyframes cs-main {
      0%         { opacity:0; transform:translateY(14px); }
      10%        { opacity:1; transform:translateY(0);    }
      70%        { opacity:1; transform:translateY(0);    }
      80%        { opacity:0; transform:translateY(-10px);}
      100%       { opacity:0; }
    }
    @keyframes cs-calc {
      0%, 9%     { opacity:0; transform:translateY(14px); }
      20%        { opacity:1; transform:translateY(0);    }
      60%        { opacity:1; transform:translateY(0);    }
      70%        { opacity:0; transform:translateY(-10px);}
      100%       { opacity:0; }
    }
    @keyframes cs-add {
      0%, 19%    { opacity:0; transform:translateY(14px); }
      30%        { opacity:1; transform:translateY(0);    }
      50%        { opacity:1; transform:translateY(0);    }
      60%        { opacity:0; transform:translateY(-10px);}
      100%       { opacity:0; }
    }

    /* ── SP arrows ────────────────────────────────────────────── */
    .cs-playing .cs-sp-main  { animation: cs-sp-m 10s ease forwards; }
    .cs-playing .cs-sp-calc  { animation: cs-sp-c 10s ease forwards; }
    .cs-playing .cs-sp-add   { animation: cs-sp-a 10s ease forwards; }

    @keyframes cs-sp-m {
      0%, 9%   { opacity:0; } 10%, 19% { opacity:1; }
      20%, 69% { opacity:0; } 70%, 79% { opacity:1; }
      80%      { opacity:0; } 100%     { opacity:0; }
    }
    @keyframes cs-sp-c {
      0%, 19%  { opacity:0; } 20%, 29% { opacity:1; }
      30%, 59% { opacity:0; } 60%, 69% { opacity:1; }
      70%      { opacity:0; } 100%     { opacity:0; }
    }
    @keyframes cs-sp-a {
      0%, 29%  { opacity:0; } 30%, 50% { opacity:1; }
      51%      { opacity:0; } 100%     { opacity:0; }
    }

    /* ── PUSH / POP labels ────────────────────────────────────── */
    .cs-playing .cs-push-label { animation: cs-push 10s ease forwards; }
    .cs-playing .cs-pop-label  { animation: cs-pop  10s ease forwards; }

    @keyframes cs-push {
      0%       { opacity:0; } 1%, 7%   { opacity:1; } 8%, 10%  { opacity:0; }
      11%, 17% { opacity:1; } 18%, 20% { opacity:0; }
      21%, 27% { opacity:1; } 28%      { opacity:0; } 100% { opacity:0; }
    }
    @keyframes cs-pop {
      0%, 49%  { opacity:0; } 51%, 57% { opacity:1; } 58%, 60% { opacity:0; }
      61%, 67% { opacity:1; } 68%, 70% { opacity:0; }
      71%, 77% { opacity:1; } 78%      { opacity:0; } 100% { opacity:0; }
    }

    /* ── code blocks (opacity sync) ───────────────────────────── */
    .cs-playing .cs-code-main { animation: cc-main 10s ease forwards; }
    .cs-playing .cs-code-calc { animation: cc-calc 10s ease forwards; }
    .cs-playing .cs-code-add  { animation: cc-add  10s ease forwards; }

    /* main: active(0%) → waiting(10%) → active(60%) → idle(70%) */
    @keyframes cc-main {
      0%        { opacity:1;    }
      9%        { opacity:1;    }
      11%       { opacity:0.45; }
      59%       { opacity:0.45; }
      61%       { opacity:1;    }
      69%       { opacity:1;    }
      71%       { opacity:0.25; }
      100%      { opacity:0.25; }
    }
    /* calc: idle → active(10%) → waiting(20%) → active(60%) → idle(70%) */
    @keyframes cc-calc {
      0%, 9%    { opacity:0.25; }
      11%       { opacity:1;    }
      19%       { opacity:1;    }
      21%       { opacity:0.45; }
      59%       { opacity:0.45; }
      61%       { opacity:1;    }
      69%       { opacity:1;    }
      71%       { opacity:0.25; }
      100%      { opacity:0.25; }
    }
    /* add: idle → active(20%) → idle(52%) */
    @keyframes cc-add {
      0%, 19%   { opacity:0.25; }
      21%       { opacity:1;    }
      50%       { opacity:1;    }
      52%       { opacity:0.25; }
      100%      { opacity:0.25; }
    }

    /* ── correspondence lines (sync) ──────────────────────────── */
    .cs-playing .cs-line-main { animation: cl-main 10s ease forwards; }
    .cs-playing .cs-line-calc { animation: cl-calc 10s ease forwards; }
    .cs-playing .cs-line-add  { animation: cl-add  10s ease forwards; }

    @keyframes cl-main {
      0%        { opacity:0.8;  }
      9%        { opacity:0.8;  }
      11%       { opacity:0.12; }
      59%       { opacity:0.12; }
      61%       { opacity:0.8;  }
      69%       { opacity:0.8;  }
      71%       { opacity:0.08; }
      100%      { opacity:0.08; }
    }
    @keyframes cl-calc {
      0%, 9%    { opacity:0.08; }
      11%       { opacity:0.8;  }
      19%       { opacity:0.8;  }
      21%       { opacity:0.12; }
      59%       { opacity:0.12; }
      61%       { opacity:0.8;  }
      69%       { opacity:0.8;  }
      71%       { opacity:0.08; }
      100%      { opacity:0.08; }
    }
    @keyframes cl-add {
      0%, 19%   { opacity:0.08; }
      21%       { opacity:0.8;  }
      50%       { opacity:0.8;  }
      52%       { opacity:0.08; }
      100%      { opacity:0.08; }
    }
  `;

  return (
    <div ref={ref} className="not-prose my-8">
      <style>{css}</style>
      <svg
          width="100%"
          viewBox="0 0 710 620"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        >
          <title>Call stack animation with Python code</title>
          <desc>
            Left: Python source code. Right: call stack frames animating as
            functions are called and returned. Code blocks and stack frames are
            synchronized.
          </desc>

          <defs>
            <marker
              id="cs-arrow"
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

          {/* ── LEFT: Python code ─────────────────────────────── */}
          <text x="18" y="22" opacity="0.5" fontSize="12" fill="#3D3D3A">
            Python code
          </text>

          {/* Code area background */}
          <rect
            x="10"
            y="30"
            width="298"
            height="542"
            rx="8"
            fill="#F5F4ED"
            stroke="#73726C"
            strokeWidth="0.5"
            opacity="0.6"
          />

          {/* main() code block – purple */}
          <g className="cs-code-main">
            <rect
              x="10"
              y="30"
              width="298"
              height="130"
              rx="8"
              fill="#EEEDFE"
              stroke="#534AB7"
              strokeWidth="0.5"
            />
            <text
              x="22"
              y="52"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#26215C"
            >
              def main():
            </text>
            <text
              x="34"
              y="70"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#3C3489"
            >
              {"    num = 42"}
            </text>
            <text
              x="34"
              y="88"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#3C3489"
            >
              {"    result = calculate()"}
            </text>
            <text
              x="34"
              y="106"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#3C3489"
            >
              {"    print(result)"}
            </text>
            <line
              x1="22"
              y1="118"
              x2="300"
              y2="118"
              stroke="#534AB7"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <text
              x="22"
              y="140"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#26215C"
            >
              {"main()  "}
              <tspan opacity="0.5"># entry point</tspan>
            </text>
          </g>

          {/* calculate() code block – teal */}
          <g className="cs-code-calc">
            <rect
              x="10"
              y="168"
              width="298"
              height="112"
              rx="8"
              fill="#E1F5EE"
              stroke="#0F6E56"
              strokeWidth="0.5"
            />
            <text
              x="22"
              y="190"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#04342C"
            >
              def calculate():
            </text>
            <text
              x="34"
              y="208"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#085041"
            >
              {"    x = 10"}
            </text>
            <text
              x="34"
              y="226"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#085041"
            >
              {"    val = add(3, 4)"}
            </text>
            <text
              x="34"
              y="244"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#085041"
            >
              {"    return val + x"}
            </text>
            <text
              x="22"
              y="262"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#0F6E56"
              opacity="0.5"
            >
              # returns to main
            </text>
          </g>

          {/* add() code block – amber */}
          <g className="cs-code-add">
            <rect
              x="10"
              y="288"
              width="298"
              height="96"
              rx="8"
              fill="#FAEEDA"
              stroke="#854F0B"
              strokeWidth="0.5"
            />
            <text
              x="22"
              y="310"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#412402"
            >
              def add(a, b):
            </text>
            <text
              x="34"
              y="328"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#633806"
            >
              {"    result = a + b"}
            </text>
            <text
              x="34"
              y="346"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#633806"
            >
              {"    return result"}
            </text>
            <text
              x="22"
              y="366"
              fontFamily="ui-monospace, monospace"
              fontSize="12"
              fill="#854F0B"
              opacity="0.5"
            >
              # returns to calculate
            </text>
          </g>

          {/* Execution order */}
          <rect
            x="10"
            y="392"
            width="298"
            height="168"
            rx="8"
            fill="none"
            stroke="#73726C"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <text x="22" y="412" opacity="0.5" fontSize="12" fill="#3D3D3A">
            Execution order
          </text>
          <text x="22" y="432" fontSize="12" fill="#3D3D3A" opacity="0.65">
            ① call main()
          </text>
          <text x="22" y="452" fontSize="12" fill="#3D3D3A" opacity="0.65">
            ② main → calls calculate()
          </text>
          <text x="22" y="472" fontSize="12" fill="#3D3D3A" opacity="0.65">
            ③ calculate → calls add(3, 4)
          </text>
          <text x="22" y="492" fontSize="12" fill="#3D3D3A" opacity="0.65">
            ④ add returns 7
          </text>
          <text x="22" y="512" fontSize="12" fill="#3D3D3A" opacity="0.65">
            ⑤ calculate returns 17
          </text>
          <text x="22" y="532" fontSize="12" fill="#3D3D3A" opacity="0.65">
            ⑥ main prints 17 and exits
          </text>

          {/* Correspondence lines (animated) */}
          <line
            className="cs-line-main"
            x1="308"
            y1="85"
            x2="370"
            y2="420"
            stroke="#534AB7"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <line
            className="cs-line-calc"
            x1="308"
            y1="225"
            x2="370"
            y2="316"
            stroke="#0F6E56"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <line
            className="cs-line-add"
            x1="308"
            y1="328"
            x2="370"
            y2="210"
            stroke="#854F0B"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* ── RIGHT: Call stack ─────────────────────────────── */}
          <text
            x="515"
            y="22"
            textAnchor="middle"
            opacity="0.5"
            fontSize="12"
            fill="#3D3D3A"
          >
            Call stack (memory)
          </text>

          <rect
            x="370"
            y="30"
            width="290"
            height="542"
            rx="10"
            fill="none"
            stroke="#73726C"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* Unused stack space */}
          <rect
            x="378"
            y="38"
            width="274"
            height="118"
            rx="6"
            fill="#F5F4ED"
            opacity="0.4"
          />
          <text
            x="515"
            y="104"
            textAnchor="middle"
            opacity="0.3"
            fontSize="12"
            fill="#3D3D3A"
          >
            (unused stack space)
          </text>

          {/* PUSH label */}
          <g className="cs-push-label">
            <text
              x="515"
              y="154"
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#BA7517"
            >
              PUSH ↓
            </text>
          </g>

          {/* add(3,4) frame – amber */}
          <g className="cs-add-frame">
            <rect
              x="378"
              y="164"
              width="274"
              height="96"
              rx="6"
              fill="#FAEEDA"
              stroke="#854F0B"
              strokeWidth="0.5"
            />
            <text x="396" y="188" fontSize="14" fontWeight="500" fill="#633806">
              add(3, 4)
            </text>
            <text x="396" y="206" fontSize="12" fill="#854F0B">
              args: a=3, b=4
            </text>
            <text x="396" y="222" fontSize="12" fill="#854F0B">
              local: result=7
            </text>
            <text x="396" y="238" fontSize="12" fill="#854F0B">
              return addr → calculate
            </text>
          </g>

          {/* calculate() frame – teal */}
          <g className="cs-calc-frame">
            <rect
              x="378"
              y="268"
              width="274"
              height="96"
              rx="6"
              fill="#E1F5EE"
              stroke="#0F6E56"
              strokeWidth="0.5"
            />
            <text x="396" y="292" fontSize="14" fontWeight="500" fill="#085041">
              calculate()
            </text>
            <text x="396" y="310" fontSize="12" fill="#0F6E56">
              local: x=10
            </text>
            <text x="396" y="326" fontSize="12" fill="#0F6E56">
              waiting for add(3, 4)
            </text>
            <text x="396" y="342" fontSize="12" fill="#0F6E56">
              return addr → main
            </text>
          </g>

          {/* main() frame – purple */}
          <g className="cs-main-frame">
            <rect
              x="378"
              y="372"
              width="274"
              height="96"
              rx="6"
              fill="#EEEDFE"
              stroke="#534AB7"
              strokeWidth="0.5"
            />
            <text x="396" y="396" fontSize="14" fontWeight="500" fill="#3C3489">
              main()
            </text>
            <text x="396" y="414" fontSize="12" fill="#534AB7">
              local: num=42
            </text>
            <text x="396" y="430" fontSize="12" fill="#534AB7">
              waiting for calculate()
            </text>
            <text x="396" y="446" fontSize="12" fill="#534AB7">
              return addr → OS
            </text>
          </g>

          {/* SP arrows */}
          <g className="cs-sp-add">
            <line
              x1="356"
              y1="182"
              x2="372"
              y2="182"
              stroke="#EF9F27"
              strokeWidth="1.5"
              markerEnd="url(#cs-arrow)"
            />
            <text
              x="340"
              y="186"
              textAnchor="end"
              fontSize="12"
              fill="#BA7517"
            >
              SP
            </text>
          </g>
          <g className="cs-sp-calc">
            <line
              x1="356"
              y1="286"
              x2="372"
              y2="286"
              stroke="#EF9F27"
              strokeWidth="1.5"
              markerEnd="url(#cs-arrow)"
            />
            <text
              x="340"
              y="290"
              textAnchor="end"
              fontSize="12"
              fill="#BA7517"
            >
              SP
            </text>
          </g>
          <g className="cs-sp-main">
            <line
              x1="356"
              y1="390"
              x2="372"
              y2="390"
              stroke="#EF9F27"
              strokeWidth="1.5"
              markerEnd="url(#cs-arrow)"
            />
            <text
              x="340"
              y="394"
              textAnchor="end"
              fontSize="12"
              fill="#BA7517"
            >
              SP
            </text>
          </g>

          {/* POP arc */}
          <g className="cs-pop-label">
            <path
              d="M652 178 Q672 130 672 80 Q672 38 652 38"
              fill="none"
              stroke="#EF9F27"
              strokeWidth="1"
              strokeDasharray="4 3"
              markerEnd="url(#cs-arrow)"
            />
            <text x="676" y="114" fontSize="12" fill="#BA7517">
              POP
            </text>
          </g>

          {/* Address axis */}
          <text
            x="662"
            y="44"
            textAnchor="middle"
            opacity="0.4"
            fontSize="12"
            fill="#3D3D3A"
          >
            high
          </text>
          <text
            x="662"
            y="565"
            textAnchor="middle"
            opacity="0.4"
            fontSize="12"
            fill="#3D3D3A"
          >
            low
          </text>
          <line
            x1="666"
            y1="54"
            x2="666"
            y2="554"
            stroke="#73726C"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <line
            x1="664"
            y1="54"
            x2="668"
            y2="54"
            stroke="#73726C"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="664"
            y1="554"
            x2="668"
            y2="554"
            stroke="#73726C"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* Legend */}
          <rect
            x="378"
            y="480"
            width="274"
            height="82"
            rx="6"
            fill="none"
            stroke="#73726C"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <text x="388" y="498" opacity="0.5" fontSize="12" fill="#3D3D3A">
            Legend
          </text>
          <rect
            x="388"
            y="506"
            width="12"
            height="12"
            rx="2"
            fill="#EEEDFE"
            stroke="#534AB7"
            strokeWidth="0.5"
          />
          <text x="406" y="516" fontSize="12" fill="#3D3D3A">
            main()
          </text>
          <rect
            x="388"
            y="524"
            width="12"
            height="12"
            rx="2"
            fill="#E1F5EE"
            stroke="#0F6E56"
            strokeWidth="0.5"
          />
          <text x="406" y="534" fontSize="12" fill="#3D3D3A">
            calculate()
          </text>
          <rect
            x="500"
            y="506"
            width="12"
            height="12"
            rx="2"
            fill="#FAEEDA"
            stroke="#854F0B"
            strokeWidth="0.5"
          />
          <text x="518" y="516" fontSize="12" fill="#3D3D3A">
            add()
          </text>
          <line
            x1="500"
            y1="529"
            x2="520"
            y2="529"
            stroke="#EF9F27"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text x="526" y="534" fontSize="12" fill="#3D3D3A">
            corresponds to
          </text>
        </svg>
      <div className="flex justify-center mt-3">
        <ReplayButton onClick={replay} />
      </div>
    </div>
  );
}
