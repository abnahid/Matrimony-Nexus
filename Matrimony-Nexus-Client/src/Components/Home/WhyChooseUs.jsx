import BannerImg from "@/assets/Home/banner.jpg";
import { FaCheckCircle, FaPlay } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Why choose <span className="text-red-600">Your Perfect Match</span>
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center">
              <FaCheckCircle className="text-red-500 mr-2" />
              Sign up at no cost and get started easily
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-red-500 mr-2" />
              Profiles verified for authenticity
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-red-500 mr-2" />
              Seamless communication via chat and video calls
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-red-500 mr-2" />
              Personalized, private, and confidential matchmaking
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-red-500 mr-2" />
              Safe, secure, and culturally aligned platform
            </li>
          </ul>
          <button className="mt-6 px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition">
            Discover Your Match
          </button>
        </div>

        {/* Video/Image Section */}
        <div className="lg:w-1/2 flex justify-center items-center relative">
          <img src={BannerImg} alt="Couple" className="rounded-lg shadow-lg" />
          <button
            className="absolute bg-white rounded-full p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <FaPlay className="text-red-600 text-3xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
