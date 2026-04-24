import { useEffect, useRef, useState } from "react";

export default function IkigaiDiagram({ size = 400 }) {
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

  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const glowScale = 1 + Math.sin(pulse * 0.063) * 0.04;
  const floatY = Math.sin(pulse * 0.063) * 3;

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", maxWidth: size, height: s, margin: "0 auto" }}>
      {/* Outer glow */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,180,41,0.15) 0%, rgba(45,138,78,0.10) 40%, transparent 70%)",
        filter: "blur(20px)",
        transform: `scale(${glowScale})`,
        transition: "transform 0.1s ease",
        pointerEvents: "none",
      }} />

      <svg
        viewBox={`0 0 ${s} ${s}`}
        width={s}
        height={s}
        style={{ width: "100%", maxWidth: "100%", height: "auto", transform: `translateY(${floatY}px)`, transition: "transform 0.1s ease" }}
      >
        <defs>
          {/* Radial gradients with inner light */}
          <radialGradient id="g-love" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f5d060" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#e8b429" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9a6a00" stopOpacity="0.60" />
          </radialGradient>
          <radialGradient id="g-good" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#5ecf80" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#2d8a4e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0e3d20" stopOpacity="0.60" />
          </radialGradient>
          <radialGradient id="g-needs" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff7a50" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#e84c1e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7a1800" stopOpacity="0.60" />
          </radialGradient>
          <radialGradient id="g-paid" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3dc8c5" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#1e7a78" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#063635" stopOpacity="0.60" />
          </radialGradient>

          {/* Center gradient */}
          <radialGradient id="g-center" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1a3d2e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#061410" stopOpacity="0.98" />
          </radialGradient>

          {/* Glow filters */}
          <filter id="glow-love" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={s * 0.012} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-good" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={s * 0.012} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-needs" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={s * 0.012} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-paid" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={s * 0.012} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-center" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={s * 0.018} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="text-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Shimmer for center text */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e8d080" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
          </linearGradient>

          {/* Specular highlight per circle */}
          <radialGradient id="spec-love" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spec-good" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.30" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spec-needs" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spec-paid" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.30" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* === 4 main circles with glow === */}
        {/* Glow shadow behind each */}
        <circle cx={top.cx}    cy={top.cy}    r={r * 1.05} fill="#e8b429" opacity="0.12" filter="url(#glow-love)" />
        <circle cx={left.cx}   cy={left.cy}   r={r * 1.05} fill="#2d8a4e" opacity="0.12" filter="url(#glow-good)" />
        <circle cx={right.cx}  cy={right.cy}  r={r * 1.05} fill="#e84c1e" opacity="0.10" filter="url(#glow-needs)" />
        <circle cx={bottom.cx} cy={bottom.cy} r={r * 1.05} fill="#1e7a78" opacity="0.12" filter="url(#glow-paid)" />

        {/* Main circles */}
        <circle cx={top.cx}    cy={top.cy}    r={r} fill="url(#g-love)"  opacity={hovered === 'love'  ? 1 : 0.88} style={{ transition: "opacity 0.3s" }} />
        <circle cx={left.cx}   cy={left.cy}   r={r} fill="url(#g-good)"  opacity={hovered === 'good'  ? 1 : 0.83} style={{ transition: "opacity 0.3s" }} />
        <circle cx={right.cx}  cy={right.cy}  r={r} fill="url(#g-needs)" opacity={hovered === 'needs' ? 1 : 0.78} style={{ transition: "opacity 0.3s" }} />
        <circle cx={bottom.cx} cy={bottom.cy} r={r} fill="url(#g-paid)"  opacity={hovered === 'paid'  ? 1 : 0.83} style={{ transition: "opacity 0.3s" }} />

        {/* Specular highlights (3D look) */}
        <circle cx={top.cx}    cy={top.cy}    r={r} fill="url(#spec-love)"  opacity="0.8" />
        <circle cx={left.cx}   cy={left.cy}   r={r} fill="url(#spec-good)"  opacity="0.8" />
        <circle cx={right.cx}  cy={right.cy}  r={r} fill="url(#spec-needs)" opacity="0.8" />
        <circle cx={bottom.cx} cy={bottom.cy} r={r} fill="url(#spec-paid)"  opacity="0.8" />

        {/* Edge rim light */}
        <circle cx={top.cx}    cy={top.cy}    r={r} fill="none" stroke="#f5d060" strokeWidth={s * 0.004} opacity="0.25" />
        <circle cx={left.cx}   cy={left.cy}   r={r} fill="none" stroke="#5ecf80" strokeWidth={s * 0.004} opacity="0.25" />
        <circle cx={right.cx}  cy={right.cy}  r={r} fill="none" stroke="#ff7a50" strokeWidth={s * 0.004} opacity="0.20" />
        <circle cx={bottom.cx} cy={bottom.cy} r={r} fill="none" stroke="#3dc8c5" strokeWidth={s * 0.004} opacity="0.25" />

        {/* === Center circle === */}
        <circle cx={cx} cy={cy} r={r * 0.28} fill="#0a2018" opacity="0.95" filter="url(#glow-center)" />
        <circle cx={cx} cy={cy} r={r * 0.27} fill="url(#g-center)" />
        {/* Pulsing ring */}
        <circle cx={cx} cy={cy} r={r * 0.27 * glowScale} fill="none" stroke="rgba(232,180,41,0.4)" strokeWidth={s * 0.005} />
        <circle cx={cx} cy={cy} r={r * 0.27} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={s * 0.003} />

        {/* Center text */}
        <text
          x={cx} y={cy + 2}
          textAnchor="middle" dominantBaseline="middle"
          fill="url(#shimmer)"
          fontSize={s * 0.052}
          fontWeight="700"
          fontFamily="'Playfair Display', serif"
          filter="url(#text-glow)"
          style={{ letterSpacing: "1px" }}
        >
          Ikigai
        </text>

        {/* === Inner intersection labels === */}
        <text x={cx - off * 0.52} y={cy - off * 0.44} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#text-glow)" opacity="0.95">PASSION</text>
        <text x={cx + off * 0.52} y={cy - off * 0.44} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#text-glow)" opacity="0.95">MISSION</text>
        <text x={cx - off * 0.62} y={cy + off * 0.64} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#text-glow)" opacity="0.95">PROFESSION</text>
        <text x={cx + off * 0.62} y={cy + off * 0.64} textAnchor="middle" fill="white" fontSize={s * 0.024} fontWeight="800" letterSpacing="1" filter="url(#text-glow)" opacity="0.95">VOCATION</text>

        {/* === Outer labels === */}
        <text x={cx} y={top.cy - r * 0.72} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={sf}>What you</text>
        <text x={cx} y={top.cy - r * 0.72 + lf + 2} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold">LOVE</text>

        <text x={left.cx - r * 0.68} y={cy - sf * 0.5} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={sf}>What you are</text>
        <text x={left.cx - r * 0.68} y={cy + sf + 3} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold">GOOD AT</text>

        <text x={right.cx + r * 0.68} y={cy - sf * 0.5} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={sf}>What the world</text>
        <text x={right.cx + r * 0.68} y={cy + sf + 3} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold">NEEDS</text>

        <text x={cx} y={bottom.cy + r * 0.72} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={sf}>What you can be</text>
        <text x={cx} y={bottom.cy + r * 0.72 + lf + 2} textAnchor="middle" fill="white" fontSize={lf} fontWeight="bold">PAID FOR</text>
      </svg>
    </div>
  );
}