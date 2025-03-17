import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import CategoriesSection from '@/components/landing/CategoriesSection';
import NewArrivalsSection from '@/components/landing/NewArrivalsSection';
import BestSellersSection from '@/components/landing/BestSellersSection';
import PromotionalSection from '@/components/landing/PromotionalSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import NewsletterSection from '@/components/landing/NewsletterSection';
import Footer from '@/components/landing/Footer';
import Banner from '@/components/landing/Banner';
import ProductCard from '@/components/landing/product-listing';
import DigestiveProducts from '@/components/landing/digestive-products';
import EventsCarousel from '@/components/home/DigestiveCare';
import ProductList from '@/components/product-list';
import CategorySection from '@/components/landing/CategorySection';



export default function Home() {
    return (
        <main>
            {/* <Header /> */}
            {/* <HeroSection /> */}
            <Banner />
            <CategorySection/>
       
            <CategoriesSection />
            <EventsCarousel/>
            <ProductList/>
            <NewArrivalsSection />
            <BestSellersSection />
            <PromotionalSection />
            <ReviewsSection />
            <ProductCard/>
            <DigestiveProducts/>
            
            {/* <NewsletterSection /> */}
            {/* <Footer /> */}
        </main>
    );
}