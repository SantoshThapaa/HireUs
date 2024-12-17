
// import CategoryCarousel from "./CategoryCarousel";
import About from "./About";
import Footer from "./shared/Footer";
import HeroSection from "./HeroSection";
import ContentSection from "./ContentSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";
import Slider from "./Slider";
import TrustAndSafety from "./TrustandSafety";

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        {/* <CategoryCarousel /> */}
        <ContentSection/>
        <LatestJobs />
        <Slider/>
        <About/>
        <TrustAndSafety/>
        <Footer />

    </div>
  )
}

export default Home;