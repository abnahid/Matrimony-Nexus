import BiodataShowcase from "@/Components/Home/BiodataShowcase";
import CallToActionBanner from "@/Components/Home/CallToActionBanner";
import FAQs from "@/Components/Home/FAQs";
import MatrimonyBanner from "@/Components/Home/MatrimonyBanner";
import MembershipPlans from "@/Components/Home/MembershipPlans";
import SuccessStoryCarousel from "@/Components/Home/SuccessStoryCarousel";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import BdMarriage from "./../Components/Home/BdMarriage";

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
        }`}
    >
      <MatrimonyBanner />
      <BdMarriage />
      <BiodataShowcase />
      <WhyChooseUs />
      <SuccessStoryCarousel />
      <div
        className={`py-16 px-6 md:px-0 ${isDarkMode ? "bg-BgDarkSecondary" : "bg-white"
          }`}
      >
        <CallToActionBanner />
      </div>
      <MembershipPlans />
      <FAQs />
    </div>
  );
};

export default Home;