
// import CategoryCarousel from "./CategoryCarousel";
import About from "./About";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
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
        <LatestJobs />
        <Slider/>
        <About/>
        <TrustAndSafety/>
        <Footer />

    </div>
  )
}

export default Home;