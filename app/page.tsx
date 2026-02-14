import HeroSection from "@/components/ui/hero-section";
import ColorfulBentoGrid from "@/components/ui/colorful-bento-grid";
import ZoomParallaxSection from "@/components/ui/zoom-parallax-section";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Colorful Bento Grid */}
      <ColorfulBentoGrid />

      {/* Zoom Parallax Section */}
      <ZoomParallaxSection />

    </div>
  );
}
