import ThemeContext from "@/context/ThemeContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

const ResentUser = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosSecure.get("/recent-users");
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recent orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Status background color function
    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-500";
            case "pending":
                return "bg-yellow-500";
            case "returned":
                return "bg-red-500";
            case "on the way":
                return "bg-sky-500";
            case "way to return":
                return "bg-blue-500";
            case "ordered":
                return "bg-green-400";
            default:
                return "bg-gray-500";
        }
    };

    // Capitalize each word in the status text
    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div
            className={`p-4 border rounded-xl shadow-md overflow-hidden ${isDarkMode
                    ? "border-BgDarkAccent bg-BgDarkPrimary text-gray-200"
                    : "border-gray-300 bg-white text-gray-900"
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Recent Users</h2>
                <div className="flex space-x-2">
                    <Link to="/dashboard/manageUsers">
                        <button
                            className={`btn btn-outline btn-sm ${isDarkMode
                                    ? "text-gray-200 border-gray-400 hover:bg-BgDarkAccent hover:text-gray-100"
                                    : "text-gray-900 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            See all
                        </button>
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr
                            className={`text-sm ${isDarkMode
                                    ? "text-gray-400 border-BgDarkAccent"
                                    : "text-gray-500"
                                }`}
                        >
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className={`hover:${isDarkMode ? "bg-BgDarkSecondary" : "bg-gray-100"
                                    }`}
                            >
                                <td className="flex items-center space-x-3 py-2">
                                    <div>
                                        <p
                                            className={`font-medium ${isDarkMode
                                                    ? "text-gray-200"
                                                    : "text-gray-900"
                                                }`}
                                        >
                                            {order.name}
                                        </p>
                                    </div>
                                </td>
                                <td
                                    className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-900"
                                        }`}
                                >
                                    {order.role === "admin" ? "Admin" : "User"}
                                </td>

                                <td
                                    className={`${isDarkMode ? "text-gray-300" : "text-gray-900"
                                        }`}
                                >
                                    {order.premium ? "Premium" : "Free"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResentUser;