import { useContext, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const data = {
        user: {
            name: user?.displayName || "Guest",
            email: user?.email || "N/A",
            avatar: user?.photoURL || "/avatars/default.jpg",
        },
    };

    const handleMenuClick = () => setIsSidebarOpen(false);

    const NavItem = ({ to, icon: Icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 px-4 rounded-lg transition duration-200 text-sm ${isActive
                    ? "bg-rose-600 font-semibold text-white shadow-lg"
                    : "hover:bg-rose-500 hover:text-white text-white/80"
                }`
            }
            onClick={handleMenuClick}
        >
            <Icon size={20} />
            {label}
        </NavLink>
    );

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-br from-red-700 via-rose-500 to-rose-400 text-white p-3 rounded-full shadow-xl"
            >
                <HiOutlineBars3 size={20} />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed z-40 w-64 h-screen transform top-0 left-0 transition-transform duration-300 ease-in-out overflow-y-auto bg-gradient-to-t from-red-600 via-rose-500 to-rose-400 text-white ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full justify-between px-4 py-6">
                    {/* Logo */}
                    <div className="mb-6">
                        <Link to="/">
                            <h1 className="text-xl font-bold p-3 text-center rounded-lg shadow-xl bg-white/10 text-white tracking-wide">
                                Matrimony Nexus
                            </h1>
                        </Link>
                    </div>

                    {/* User Profile */}
                    <div className="rounded-xl p-4 mb-6 backdrop-blur-sm shadow bg-white/10 border border-white/20">
                        <div className="flex items-center gap-3">
                            <img
                                src={data.user.avatar}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full border-2 border-yellow-400 p-0.5"
                            />
                            <div>
                                <p className="font-semibold text-sm">{data.user.name}</p>
                                <span className="text-xs text-yellow-100 inline-block px-2 py-0.5 mt-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400">
                                    {isAdmin ? "Admin" : "User"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
                        {isAdmin ? (
                            <>
                                <NavItem to="/dashboard/adminHome" icon={MdOutlineDashboard} label="Dashboard" />
                                <NavItem to="/dashboard/manageUsers" icon={IoChatbubbleEllipsesOutline} label="Manage Users" />
                                <NavItem to="/dashboard/approvedContactRequests" icon={BiCategory} label="Approved Contact Requests" />
                                <NavItem to="/dashboard/approvedPremium" icon={IoSettingsOutline} label="Approved Premium" />
                                <NavItem to="/dashboard/all-payment" icon={BiCategory} label="Manage Payment" />
                            </>
                        ) : (
                            <>
                                <NavItem to="/dashboard/userHome" icon={MdOutlineDashboard} label="User Home" />
                                <NavItem to="/dashboard/editBiodata" icon={IoSettingsOutline} label="Edit Biodata" />
                                <NavItem to="/dashboard/viewBiodata" icon={IoChatbubbleEllipsesOutline} label="View Biodata" />
                                <NavItem to="/dashboard/myContactRequests" icon={BiCategory} label="My Contact Requests" />
                                <NavItem to="/dashboard/favouritesBiodata" icon={FaHome} label="Favourites Biodata" />

                                <NavItem to="/dashboard/paymentHistory" icon={BiCategory} label="Payment History" />
                            </>
                        )}

                        {/* Common Section */}
                        <div className="mt-6 pt-6 border-t border-white/20">
                            <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-yellow-100">
                                Common
                            </p>
                            <NavItem to="/dashboard/userHome" icon={CgProfile} label="Profile" />
                            <NavItem to="/" icon={FaHome} label="Home" />
                            <NavItem to="/dashboard/settings" icon={IoSettingsOutline} label="Settings" />
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="text-center text-xs text-white/70 mt-6">
                        <p>Matrimony-Nexus v1.55.4</p>
                    </div>
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
