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
import DigestiveCare from '@/components/home/DigestiveCare';
import ProductList from '@/components/product-list';
import CategorySection from '@/components/landing/CategorySection';
import PilesCare from '@/components/home/PilesCare';
import AllProducts from '@/components/home/AllProducts';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
    return (
        <main >
            {/* <Header /> */}
            {/* <HeroSection /> */}
            <Banner />
            <CategorySection/>
            {/* <CategoriesSection /> */}
            <AllProducts/>
            <DigestiveCare/>
            <CallToAction title="Expert Consultation For Digestive Care" description="Get the best customised ayurvedic care for Digestive problems on the Phone from our Experts at your comfort" phone="8160229683" whatsapp="8160229683"/>
            <PilesCare/>
            <CallToAction title="Expert Consultation For Piles Care" description="Get the best customised ayurvedic care for Piles problems on the Phone from our Experts at your comfort" phone="8160229683" whatsapp="8160229683"/>
            {/* <ProductList/>
            <NewArrivalsSection />
            <BestSellersSection />
            <PromotionalSection /> */}
            <ReviewsSection />
            {/* <ProductCard/> */}
            <DigestiveProducts/>
            
            {/* <NewsletterSection /> */}
            {/* <Footer /> */}
        </main>
    );
}