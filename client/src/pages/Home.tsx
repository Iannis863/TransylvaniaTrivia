import HeroSection from "@/components/HeroSection";
import PrizesSection from "@/components/PrizesSection";
import RulesSection from "@/components/RulesSection";
import FormatSection from "@/components/FormatSection";
import MechanicsSection from "@/components/MechanicsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <PrizesSection />
      <RulesSection />
      <FormatSection />
      <MechanicsSection />
      <FooterSection />
    </div>
  );
}
