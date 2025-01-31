import CallToActionBanner from "@/Components/Home/CallToActionBanner";
import FAQs from "@/Components/Home/FAQs";
import MatrimonyBanner from "@/Components/Home/MatrimonyBanner";
import MembershipPlans from "@/Components/Home/MembershipPlans";
import SuccessStoryCarousel from "@/Components/Home/SuccessStoryCarousel";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import BdMarriage from "./../Components/Home/BdMarriage";
const Home = () => {
  return (
    <div>
      <MatrimonyBanner />
      <BdMarriage />
      <WhyChooseUs />
      <SuccessStoryCarousel />
      <div className="bg-white py-16">
        <CallToActionBanner />
      </div>
      <MembershipPlans />
      <FAQs />
    </div>
  );
};

export default Home;
