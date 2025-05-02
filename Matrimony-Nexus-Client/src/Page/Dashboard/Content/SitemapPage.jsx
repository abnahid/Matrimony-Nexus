import { Link } from "react-router-dom";

const SitemapPage = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-28 space-y-10">
            <h1 className="text-3xl font-bold text-center">Sitemap</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">

                {/* Main Pages */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Main Pages</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                        <li><Link to="/biodatas">All Biodatas</Link></li>
                        <li><Link to="/membership-plans-page">Membership Plans</Link></li>
                    </ul>
                </div>

                {/* Static Content */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Content Pages</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li><Link to="/mission-vision">Mission & Vision</Link></li>
                        <li><Link to="/affiliates-b2b">Affiliates B2B</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Auth Pages */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Authentication</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>

                {/* Dashboard Pages (User) */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">User Dashboard</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li><Link to="/dashboard/userHome">User Home</Link></li>
                        <li><Link to="/dashboard/editBiodata">Edit Biodata</Link></li>
                        <li><Link to="/dashboard/viewBiodata">View Biodata</Link></li>
                        <li><Link to="/dashboard/myContactRequests">My Contact Requests</Link></li>
                        <li><Link to="/dashboard/favouritesBiodata">My Favourites</Link></li>
                        <li><Link to="/dashboard/paymentHistory">Payment History</Link></li>
                        <li><Link to="/dashboard/GotMarried">Got Married</Link></li>
                    </ul>
                </div>

                {/* Admin Panel */}

            </div>
        </div>
    );
};

export default SitemapPage;
