import ThemeContext from "@/context/ThemeContext";
import Lottie from "lottie-react";
import { useContext } from "react";
import { Link, useRouteError } from "react-router-dom";
import Error404 from "../assets/lottie/Lost in Space.json";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function ErrorPage() {
  const error = useRouteError();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-gray-100 text-gray-900"}`}>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="m-2 w-2/3">
          <Lottie animationData={Error404} loop={true} />
        </div>
        <h1 className={`text-4xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
          Oops! Page Not Found
        </h1>
        <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          <i>Sorry, {error?.statusText || error?.message}</i>
        </p>
        <Link to="/">
          <button className={`mt-6 mb-12 px-4 py-2 bg-custom-gradient text-white rounded-lg shadow-lg hover:bg-BgPrimary ${isDarkMode ? "hover:bg-BgDarkSecondary" : ""}`}>
            Go to Home
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;