import FlashSale from "@/components/ui/HomePage/FlashSale/FlashSale";
import HeroSection from "@/components/ui/HomePage/HeroSection/HeroSection";
import TrendingProducts from "@/components/ui/HomePage/TrendingProducts/TrendingProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      {/* <TopCategories /> */}
      <FlashSale />
      <TrendingProducts />
    </div>
  );
};

export default HomePage;
