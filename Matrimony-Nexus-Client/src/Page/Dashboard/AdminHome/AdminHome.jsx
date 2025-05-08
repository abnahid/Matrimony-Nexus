import { AuthContext } from "@/context/AuthProvider";
import ThemeContext from "@/context/ThemeContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Gem, ScanFace, UserRound } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import CountUp from "react-countup";
import RecentOrders from "./RecentOrders";
import ResentUser from "./resentUser";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBiodatas: 0,
    totalPremiumUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axiosSecure.get("/dashboard/stats");
      setStats(response.data);
    };

    fetchStats();
  }, []);

  return (
    <div
      className={`container mx-auto p-6 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
        }`}
    >
      {/* Home Header */}
      <div
        className={`h-[300px] md:h-[350px] bg-cover bg-center rounded-xl shadow-md overflow-hidden ${isDarkMode ? "bg-BgDarkSecondary" : "bg-white"
          }`}
        style={{
          backgroundImage: `linear-gradient(rgb(241, 73, 76), rgba(241, 73, 76, 0.7)), url(${user?.photoURL || "https://i.imgur.com/8Km9tLL.png"
            })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="inset-0 flex items-center justify-center">
          <div className="text-center p-6 flex flex-col items-center gap-4">
            <img
              src={user?.photoURL || "https://i.imgur.com/8Km9tLL.png"}
              alt={user?.displayName || "User"}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome Back, {user?.displayName?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Here's your personalized dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          {
            title: "Total Users",
            count: stats.totalUsers,
            increase: "10 Users add Per Month",
            icon: UserRound,
          },
          {
            title: "Total Biodatas",
            count: stats.totalBiodatas,
            increase: "15 Biodatas add Per Month",
            icon: ScanFace,
          },
          {
            title: "Total Premium Users",
            count: stats.totalPremiumUsers,
            increase: "5 Premium Users add Per Month",
            icon: Gem,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-md overflow-hidden flex flex-col h-40 justify-between ${isDarkMode ? "bg-BgDarkSecondary" : "bg-white"
              }`}
          >
            <div className="p-6 flex items-start justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${isDarkMode ? "text-red-400" : "text-red-600"
                    }`}
                >
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold mt-2">
                  <CountUp end={stat.count} duration={2} />+
                </h3>
                <p
                  className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  {stat.increase}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${isDarkMode ? "bg-red-500" : "bg-red-100"
                  }`}
              >
                {<stat.icon className="text-2xl text-red-200" />}
              </div>
            </div>
            <div
              className={`h-1 ${isDarkMode ? "bg-red-500" : "bg-red-200"
                }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Recent Users and Orders */}
      <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-2">
          <ResentUser />
        </div>
        <div className="md:col-span-4">
          <RecentOrders />
        </div>
      </div>

    </div>
  );
};

export default AdminHome;