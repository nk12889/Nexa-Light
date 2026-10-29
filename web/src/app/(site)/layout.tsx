import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { FloatingActions, SupportBanner } from "@/components/Chrome";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Navbar email={settings.email} phone={settings.phone} />
      <main>{children}</main>
      <SupportBanner />
      <Footer email={settings.email} />
      <FloatingActions whatsapp={settings.whatsapp} />
      <Reveal />
    </>
  );
}
