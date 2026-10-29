import type { Metadata } from "next";
import { getProducts, getSettings } from "@/lib/data";
import PrintButton from "./PrintButton";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "NexaLight 2026 Master Architectural Catalogue",
  description: "Technical specification binder: photometric parameters, IP ratings and control protocols for NexaLight instruments.",
  alternates: { canonical: "/catalogue" },
};

// Printable specification binder ("Download Catalogue" saves it as PDF via the print dialog).
export default async function CataloguePage() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  const byCategory = products.reduce<Record<string, typeof products>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-10 text-[#1a1a1a] leading-relaxed">
      <header className="border-b-2 border-[#1a1a1a] pb-5 mb-8 flex flex-wrap justify-between items-center gap-4">
        <div className="font-bold text-2xl tracking-tight">NEXALIGHT ARCHITECTURAL</div>
        <div className="text-[11px] uppercase tracking-[2px] text-[#666]">Technical Specification Binder 2026</div>
      </header>
      <h1 className="text-3xl font-semibold mb-3">2026 Master Architectural Lighting Collection</h1>
      <p className="mb-8 text-[#444]">
        Photometric parameters, environmental protection ratings and control protocols for {products.length} NexaLight precision instruments.
      </p>
      <div className="no-print mb-10">
        <PrintButton />
      </div>

      {Object.entries(byCategory).map(([category, items]) => (
        <section key={category} className="mb-10 break-inside-avoid-page">
          <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">{category}</h2>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[13px]">
            <thead>
              <tr>
                {["Instrument", "Type", "Key Specifications"].map((h) => (
                  <th key={h} className="border border-[#e0e0e0] bg-[#f8f8f6] p-3 text-left text-[11px] uppercase tracking-wider font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="break-inside-avoid">
                  <td className="border border-[#e0e0e0] p-3 font-medium align-top w-[28%]">{p.name}</td>
                  <td className="border border-[#e0e0e0] p-3 align-top w-[18%]">{p.subcategory || "—"}</td>
                  <td className="border border-[#e0e0e0] p-3 align-top">
                    {Object.entries(p.specs ?? {})
                      .slice(0, 6)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" · ") || "Specification on request"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
      ))}

      <footer className="mt-12 pt-5 border-t border-[#eee] text-[11px] text-[#666] space-y-1">
        <p>
          <strong>NexaLight Design Laboratory</strong> • {settings.location} • {settings.email} • {settings.phone}
        </p>
        <p>IES photometric files (.ies) and Autodesk Revit BIM models (.rfa) available upon specification request.</p>
      </footer>
    </div>
  );
}
