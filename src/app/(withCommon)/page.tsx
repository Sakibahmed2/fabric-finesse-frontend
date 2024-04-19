import FlashSale from "@/components/ui/HomePage/FlashSale/FlashSale";
import HeroSection from "@/components/ui/HomePage/HeroSection/HeroSection";
import TopCategories from "@/components/ui/HomePage/TopCategories/TopCategories";
import TrendingProducts from "@/components/ui/HomePage/TrendingProducts/TrendingProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FlashSale />
      <TopCategories />
      <TrendingProducts />
    </div>
  );
};

export default HomePage;
