import TrendingCategories from "./TrendingCategories";
import TrendingProducts from "./TrendingProducts";
import TwoImageSection from "./TwoImageSection";

export default function Main() {
    return (
        <div className="bg-black py-12">
            <TrendingCategories />
            <TwoImageSection />
            <TrendingProducts />
        </div>
    );
}

