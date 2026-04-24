import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const onEnter = (e) => {
      const target = e.target;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button")) {
        hoveredRef.current = true;
        cursor.style.width = "60px";
        cursor.style.height = "60px";
        cursor.style.borderColor = "#e8b429";
        cursor.style.background = "rgba(232,180,41,0.08)";
      }
    };

    const onLeave = () => {
      hoveredRef.current = false;
      cursor.style.width = "36px";
      cursor.style.height = "36px";
      cursor.style.borderColor = "rgba(232, 76, 30, 0.7)";
      cursor.style.background = "transparent";
    };

    const animate = () => {
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.12;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.12;
      cursor.style.transform = `translate(${dotPos.current.x - 18}px, ${dotPos.current.y - 18}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring — trails behind */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "36px", height: "36px",
          border: "1.5px solid rgba(232, 76, 30, 0.7)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
          mixBlendMode: "normal",
          backdropFilter: "blur(1px)",
        }}
      >
        {/* Inner brand mark — ✦ ikigai symbol */}
        <span style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "8px",
          color: "rgba(232, 76, 30, 0.6)",
          lineHeight: 1,
          fontWeight: 700,
          letterSpacing: 0,
          userSelect: "none",
        }}>✦</span>
      </div>

      {/* Center dot — snaps to cursor instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "8px", height: "8px",
          borderRadius: "50%",
          background: "#e84c1e",
          pointerEvents: "none",
          zIndex: 100000,
          transition: "transform 0.05s linear",
          boxShadow: "0 0 8px rgba(232,76,30,0.8)",
        }}
      />
    </>
  );
}