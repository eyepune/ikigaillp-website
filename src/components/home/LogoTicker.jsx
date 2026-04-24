const logos = [
  "IIT Delhi", "IIM Bangalore", "XLRI", "Symbiosis", "Manipal University",
  "Tata Consultancy", "Infosys", "Wipro", "KPMG", "Deloitte",
];

export default function LogoTicker() {
  return (
    <div className="py-10 bg-[#080f0c] border-y border-white/5 overflow-hidden">
      <div className="flex animate-[ticker_20s_linear_infinite] gap-12 whitespace-nowrap">
        {[...logos, ...logos].map((logo, i) => (
          <span
            key={i}
            className="text-[#3a5040] font-bold text-sm uppercase tracking-widest shrink-0"
          >
            {logo}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}