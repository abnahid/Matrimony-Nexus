import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMailOpen } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";

const FooterLink = ({ href, children }) => (
  <li>
    <a href={href} className="hover:underline hover:text-BgDarkAccent transition">
      {children}
    </a>
  </li>
);

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`p-8 sm:p-12 ${isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-900"
        }`}
    >
      <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* Brand Description */}
        <div>
          <h2
            className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            Matrimony Nexus
          </h2>
          <p
            className={`mt-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Matrimony Nexus is a modern and user-friendly matchmaking platform
            designed to connect individuals seeking life partners. Our mission
            is to make the journey of finding a soulmate seamless and enjoyable.
          </p>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Help & Support</h3>
          <ul className="space-y-2">
            <FooterLink href="/register">How to Get Started</FooterLink>
            <FooterLink href="/">Membership Plans</FooterLink>
            <FooterLink href="/contact-us">Contact Us</FooterLink>
            <FooterLink href="/up-coming-page">FAQ</FooterLink>
            <FooterLink href="/sitemap">Sitemap</FooterLink>
          </ul>
        </div>

        {/* Corporate */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Corporate</h3>
          <ul className="space-y-2">
            <FooterLink href="/about-us">About Us</FooterLink>
            <FooterLink href="/mission-vision">Mission & Vision</FooterLink>
            <FooterLink href="/affiliates-b2b">Affiliates/B2B</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms-and-conditions">Terms & Conditions</FooterLink>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            Contact Us
          </h3>
          <p
            className={`mt-3 flex items-center gap-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            <FaLocationDot /> House 42, Dhanmondi, Dhaka 1209, Bangladesh
          </p>
          <p
            className={`flex items-center gap-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            <IoCallOutline /> +880 1777-123456
          </p>
          <p
            className={`flex items-center gap-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            <IoMdMailOpen /> support@matrimonynexus.com
          </p>
          <div
            className={`flex gap-4 mt-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
          >
            <a
              href="https://facebook.com/wispwerofnahid"
              className="hover:text-primary transition"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/@xahid_420"
              className="hover:text-primary transition"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/in/ajnahid"
              className="hover:text-primary transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div
        className={`text-center mt-8 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
      >
        <p>
          &copy; {new Date().getFullYear()} Matrimony Nexus | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;