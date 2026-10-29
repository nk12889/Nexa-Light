"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="bg-[#1a1a1a] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-accent hover:text-primary transition-colors">
      Print / Save as PDF
    </button>
  );
}
