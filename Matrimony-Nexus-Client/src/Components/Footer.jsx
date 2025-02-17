import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-8 sm:p-12">
      <div className="container  max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* Help & Support Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Help & Support</h3>
          <ul>
            <li>
              <a href="/register" className="hover:underline">
                How to Get Started
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Membership Plans
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Sitemap
              </a>
            </li>
          </ul>
        </div>

        {/* Corporate Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Corporate</h3>
          <ul>
            <li>
              <a href="/about-us" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Mission & Vision
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Affiliates/B2B
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                VIP Services
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Lifestyle Blogs
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Legal</h3>
          <ul>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Fraud Alert
              </a>
            </li>
            <li>
              <a href="/up-coming-page" className="hover:underline">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Follow Us</h3>
          <p className="mb-4 text-gray-600">
            Stay connected with us through social media for the latest updates. Follow us to stay informed about our newest features, special offers, and community events!
          </p>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com/wispwerofnahid"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com/@xahid_420"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com/in/ajnahid"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Matrimony Nexus | All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
