import { useEffect, useState, useRef } from "react";

export default function IkigaiFourDiagram({ size = 520 }) {
  const [containerSize, setContainerSize] = useState(size);
  const containerRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerSize(Math.min(size, w));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [size]);

  const s = containerSize;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.30;
  const off = r * 0.48;

  const top    = { cx: cx,        cy: cy - off };
  const left   = { cx: cx - off,  cy: cy };
  const right  = { cx: cx + off,  cy: cy };
  const bottom = { cx: cx,        cy: cy + off };

  const lf = s * 0.030;
  const sf = s * 0.022;

  const [pulse, setPulse] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setTimeout(() => setEntered(true), 100);
    const interval = setInterval(() => setPulse(p => (p + 1) % 100), 50);
    return () => clearInterval(interval);
  }, []);

  const glowScale = 1 + Math.sin(pulse * 0.063) * 0.05;
  const floatY = Math.sin(pulse * 0.063) * 4;

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", maxWidth: size, height: s, margin: "0 auto" }}>
      {/* Ambient glow rings */}
      <div style={{
        position: "absolute", inset: "-10%",
        borderRadius: "50%",
        background: "conic-gradient(from 0deg, rgba(232,76,30,0.12), rgba(232,180,41,0.12), rgba(45,138,78,0.12), rgba(30,122,120,0.12), rgba(232,76,30,0.12))",
        filter: "blur(30px)",
        transform: `scale(${glowScale}) rotate(${pulse * 3.6}deg)`,
        pointerEvents: "none",
        animation: "none",
      }} />

      <svg
        viewBox={`0 0 ${s} ${s}`}
        width={s}
        height={s}
        style={{
          width: "100%", maxWidth: "100%", height: "auto",
          transform: `translateY(${floatY}px)`,
          transition: "transform 0.1s ease",
          filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
        }}
      >
        <defs>
          <radialGradient id="fg-love" cx="35%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#f7dd6a" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#e8b429" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#7a5500" stopOpacity="0.55" />
          </radialGradient>
          <radialGradient id="fg-good" cx="35%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#6de09a" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#2d8a4e" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#082c18" stopOpacity="0.55" />
          </radialGradient>
          <radialGradient id="fg-needs" cx="35%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#ff8060" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#e84c1e" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#5c1000" stopOpacity="0.55" />
          </radialGradient>
          <radialGradient id="fg-paid" cx="35%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#50dbd8" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#1e7a78" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#042828" stopOpacity="0.55" />
          </radialGradient>

          <radialGradient id="fg-center" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#1e4030" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#030f0a" stopOpacity="1" />
          </radialGradient>

          <radialGradient id="fspec-love" cx="28%" cy="22%" r="45%">
            <stop offset="0%" stopColor="white" stopOpacity="0.40" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fspec-good" cx="28%" cy="22%" r="45%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fspec-needs" cx="28%" cy="22%" r="45%">
            <stop offset="0%" stopColor="white" stopOpacity="0.32" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fspec-paid" cx="28%" cy="22%" r="45%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <filter id="fglow-main" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={s * 0.018} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="fglow-center" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation={s * 0.022} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ftext-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.8)" />
          </filter>
          <filter id="ftext-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <linearGradient id="fshimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbe0" />
            <stop offset="40%" stopColor="#f5d060" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <radialGradient id="fpulse-ring" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,180,41,0)" />
            <stop offset="80%" stopColor="rgba(232,180,41,0.3)" />
            <stop offset="100%" stopColor="rgba(232,180,41,0)" />
          </radialGradient>
        </defs>

        {/* Deep glow halos per circle */}
        <circle cx={top.cx}    cy={top.cy}    r={r * 1.1} fill="#e8b429" opacity="0.10" filter="url(#fglow-main)" />
        <circle cx={left.cx}   cy={left.cy}   r={r * 1.1} fill="#2d8a4e" opacity="0.10" filter="url(#fglow-main)" />
        <circle cx={right.cx}  cy={right.cy}  r={r * 1.1} fill="#e84c1e" opacity="0.08" filter="url(#fglow-main)" />
        <circle cx={bottom.cx} cy={bottom.cy} r={r * 1.1} fill="#1e7a78" opacity="0.10" filter="url(#fglow-main)" />

        {/* Main filled circles */}
        <circle cx={top.cx}    cy={top.cy}    r={r} fill="url(#fg-love)"  opacity={hovered === 'love'  ? 1 : 0.90} style={{ transition: "opacity 0.4s, r 0.4s" }} />
        <circle cx={left.cx}   cy={left.cy}   r={r} fill="url(#fg-good)"  opacity={hovered === 'good'  ? 1 : 0.85} style={{ transition: "opacity 0.4s" }} />
        <circle cx={right.cx}  cy={right.cy}  r={r} fill="url(#fg-needs)" opacity={hovered === 'needs' ? 1 : 0.80} style={{ transition: "opacity 0.4s" }} />
        <circle cx={bottom.cx} cy={bottom.cy} r={r} fill="url(#fg-paid)"  opacity={hovered === 'paid'  ? 1 : 0.85} style={{ transition: "opacity 0.4s" }} />

        {/* 3D specular highlights */}
        <circle cx={top.cx}    cy={top.cy}    r={r} fill="url(#fspec-love)"  />
        <circle cx={left.cx}   cy={left.cy}   r={r} fill="url(#fspec-good)"  />
        <circle cx={right.cx}  cy={right.cy}  r={r} fill="url(#fspec-needs)" />
        <circle cx={bottom.cx} cy={bottom.cy} r={r} fill="url(#fspec-paid)"  />

        {/* Rim lighting */}
        <circle cx={top.cx}    cy={top.cy}    r={r} fill="none" stroke="rgba(247,221,106,0.30)" strokeWidth={s * 0.005} />
        <circle cx={left.cx}   cy={left.cy}   r={r} fill="none" stroke="rgba(109,224,154,0.28)" strokeWidth={s * 0.005} />
        <circle cx={right.cx}  cy={right.cy}  r={r} fill="none" stroke="rgba(255,128,96,0.25)"  strokeWidth={s * 0.005} />
        <circle cx={bottom.cx} cy={bottom.cy} r={r} fill="none" stroke="rgba(80,219,216,0.28)"  strokeWidth={s * 0.005} />

        {/* Center orb */}
        <circle cx={cx} cy={cy} r={r * 0.29} fill="#061410" opacity="0.98" filter="url(#fglow-center)" />
        <circle cx={cx} cy={cy} r={r * 0.28} fill="url(#fg-center)" />

        {/* Animated pulse rings */}
        <circle cx={cx} cy={cy} r={r * 0.28 * glowScale} fill="none" stroke="rgba(232,180,41,0.5)" strokeWidth={s * 0.004} />
        <circle cx={cx} cy={cy} r={r * 0.28 * (2 - glowScale)} fill="none" stroke="rgba(30,122,120,0.3)" strokeWidth={s * 0.003} />
        <circle cx={cx} cy={cy} r={r * 0.28} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={s * 0.002} />

        {/* Specular on center orb */}
        <ellipse cx={cx - r * 0.08} cy={cy - r * 0.10} rx={r * 0.10} ry={r * 0.07} fill="white" opacity="0.18" />

        {/* Ikigai text */}
        <text
          x={cx} y={cy + 2}
          textAnchor="middle" dominantBaseline="middle"
          fill="url(#fshimmer)"
          fontSize={s * 0.054}
          fontWeight="700"
          fontFamily="'Playfair Display', serif"
          filter="url(#ftext-glow)"
          letterSpacing="1"
        >
          Ikigai
        </text>

        {/* Inner intersection labels */}
        <text x={cx - off * 0.52} y={cy - off * 0.44} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#ftext-shadow)" opacity="0.95">PASSION</text>
        <text x={cx + off * 0.52} y={cy - off * 0.44} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#ftext-shadow)" opacity="0.95">MISSION</text>
        <text x={cx - off * 0.62} y={cy + off * 0.64} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#ftext-shadow)" opacity="0.95">PROFESSION</text>
        <text x={cx + off * 0.62} y={cy + off * 0.64} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#ftext-shadow)" opacity="0.95">VOCATION</text>

        {/* Outer labels */}
        <text x={cx} y={top.cy - r * 0.72} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize={sf}>What you</text>
        <text x={cx} y={top.cy - r * 0.72 + lf + 2} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold" filter="url(#ftext-shadow)">LOVE</text>

        <text x={left.cx - r * 0.68} y={cy - sf * 0.5} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize={sf}>What you are</text>
        <text x={left.cx - r * 0.68} y={cy + sf + 3} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold" filter="url(#ftext-shadow)">GOOD AT</text>

        <text x={right.cx + r * 0.68} y={cy - sf * 0.5} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize={sf}>What the world</text>
        <text x={right.cx + r * 0.68} y={cy + sf + 3} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold" filter="url(#ftext-shadow)">NEEDS</text>

        <text x={cx} y={bottom.cy + r * 0.72} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize={sf}>What you can be</text>
        <text x={cx} y={bottom.cy + r * 0.72 + lf + 2} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold" filter="url(#ftext-shadow)">PAID FOR</text>
      </svg>
    </div>
  );
}