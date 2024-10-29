import TrendingCategories from "./TrendingCategories";
import TrendingProducts from "./TrendingProducts";
import TwoImageSection from "./TwoImageSection";
import LimitedTimeOffer from "./LimitedTImeOffer";
import Feedback from "./Feedback";
import { Footer } from "./Footer";
export default function Main() {
    return (
        <>
        <div className="bg-black py-12">
            <TrendingCategories />
            <TwoImageSection />
            <TrendingProducts />
            
            <LimitedTimeOffer />
            <Feedback />
        </div>
            <Footer />
        </>
    );
}

