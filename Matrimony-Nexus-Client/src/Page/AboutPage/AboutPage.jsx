import FAQs from "@/Components/Home/FAQs";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import AboutUs from "./AboutUs";
import Gallery from "./Gallery";

const AboutPage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}>
      <div className="space-y-10 max-w-7xl mx-auto mb-10">
        <AboutUs />
        <Gallery />
        {/* <HowItWorks /> */}
      </div>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <img
              src="https://i.ibb.co/h25Mptp/abnahid.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h3 className="mt-4 text-lg font-semibold">Abdul Jabbar Al Nahid</h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Founder & Lead Developer
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/nsgmKpH/team-member.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h3 className="mt-4 text-lg font-semibold">Sarah Lee</h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Operations Manager
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/xLVb14x/team-member2.webp"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h3 className="mt-4 text-lg font-semibold">Alex Johnson</h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Marketing Head
            </p>
          </div>
        </div>
      </section>
      <div className="space-y-10 max-w-7xl mx-auto mt-10">
        <FAQs />
      </div>
    </div>
  );
};

export default AboutPage;