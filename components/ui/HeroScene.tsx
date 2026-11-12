"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

type Token = { t: string; c?: "k" | "s" | "f" | "n" | "cm" };

const CODE: Token[] = [
  { t: "const", c: "k" }, { t: " " }, { t: "developer", c: "f" }, { t: " = {\n" },
  { t: "  role: " }, { t: '"Full-Stack Developer"', c: "s" }, { t: ",\n" },
  { t: "  stack: [" }, { t: '"React"', c: "s" }, { t: ", " }, { t: '"Java"', c: "s" }, { t: ", " }, { t: '"Python"', c: "s" }, { t: "],\n" },
  { t: "  location: " }, { t: '"Tunis, TN"', c: "s" }, { t: ",\n" },
  { t: "  openToWork: " }, { t: "true", c: "n" }, { t: ",\n" },
  { t: "  // build · ship · improve\n", c: "cm" },
  { t: "  " }, { t: "ship", c: "f" }, { t: "(idea) { " }, { t: "return", c: "k" }, { t: " " }, { t: '"reality"', c: "s" }, { t: "; }\n" },
  { t: "};" },
];

const TOTAL = CODE.reduce((sum, token) => sum + token.t.length, 0);

function renderCode(count: number): ReactNode[] {
  let left = count;
  const nodes: ReactNode[] = [];
  CODE.forEach((token, index) => {
    if (left <= 0) return;
    const text = token.t.slice(0, left);
    left -= token.t.length;
    nodes.push(
      token.c ? (
        <span key={index} className={`rw-c-${token.c}`}>
          {text}
        </span>
      ) : (
        <span key={index}>{text}</span>
      )
    );
  });
  return nodes;
}

const CHIPS: Array<[string, string]> = [
  ["⚛", "React / Next.js"],
  ["JV", "Java · Jakarta EE"],
  ["PY", "Python · IA"],
  ["DB", "PostgreSQL · Oracle"],
];

const CUBE_FACES = ["</>", "API", "SQL", "TS", "JAVA", "AI"];

/** Scène 3D du hero : fenêtre de code qui s'écrit seule, couches, badges flottants et cube. */
export default function HeroScene() {
  const [count, setCount] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(TOTAL);
      return;
    }
    let n = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= TOTAL) window.clearInterval(interval);
      }, 20);
    }, 700);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, []);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty("--ry", `${x * 22}deg`);
    stage.style.setProperty("--rx", `${-y * 18}deg`);
  };

  const onLeave = () => {
    stageRef.current?.style.setProperty("--ry", "0deg");
    stageRef.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <div className="rw-hero-art" aria-hidden="true" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="rw-stage" ref={stageRef}>
        <div className="rw-layer rw-layer--2" />
        <div className="rw-layer rw-layer--1" />

        <div className="rw-win">
          <div className="rw-win-bar">
            <i />
            <i />
            <i />
            <span>developer.ts</span>
          </div>
          <pre>
            {renderCode(count)}
            <span className="rw-typewriter-caret" />
          </pre>
        </div>

        {CHIPS.map(([icon, label], index) => (
          <div key={label} className={`rw-chip rw-chip--${index + 1}`}>
            <b>{icon}</b>
            {label}
          </div>
        ))}

        <div className="rw-cube-wrap">
          <div className="rw-cube3d">
            {CUBE_FACES.map((face) => (
              <span key={face}>{face}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
