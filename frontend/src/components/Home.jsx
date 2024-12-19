
// import CategoryCarousel from "./CategoryCarousel";
import About from "./About";
import Footer from "./shared/Footer";
import HeroSection from "./HeroSection";
import ContentSection from "./ContentSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";
import Slider from "./Slider";
import TrustAndSafety from "./TrustandSafety";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role == 'recruiter'){
      navigate("/admin/services");
    }
  },[]);
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