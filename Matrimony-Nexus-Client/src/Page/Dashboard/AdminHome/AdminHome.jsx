import { AuthContext } from "@/context/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Gem, ScanFace, UserRound } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import CountUp from "react-countup";
import RecentOrders from "./RecentOrders";
import ResentUser from "./resentUser";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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
    <div className="container mx-auto p-6">

      {/* home hader */}
      <div
        className="h-[300px] md:h-[350px] bg-cover bg-center  rounded-xl shadow-md overflow-hidden bg-white"
        style={{
          backgroundImage: `linear-gradient(rgb(241, 73, 76), rgba(241, 73, 76, 0.7)), url(${user?.photoURL || "https://i.imgur.com/8Km9tLL.png"
            })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" inset-0 flex items-center justify-center">
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

      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="rounded-xl shadow-md overflow-hidden bg-white flex flex-col h-40 justify-between">
          <div className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Users</p>
              <h3 className="text-3xl font-bold mt-2">
                <CountUp end={stats.totalUsers} duration={2} />+
              </h3>
              <p className="text-xs mt-1 text-gray-500">10 Users add Per Month</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <UserRound className="text-2xl text-red-500" />
            </div>
          </div>
          <div className="h-1 bg-red-200"></div>
        </div>

        <div className="rounded-xl shadow-md overflow-hidden bg-white flex flex-col h-40 justify-between">
          <div className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Biodatas</p>
              <h3 className="text-3xl font-bold mt-2">
                <CountUp end={stats.totalBiodatas} duration={2} />+
              </h3>
              <p className="text-xs mt-1 text-gray-500">15 Biodatas add Per Month</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <ScanFace className="text-2xl text-red-500" />
            </div>
          </div>
          <div className="h-1 bg-red-200"></div>
        </div>


        <div className="rounded-xl shadow-md overflow-hidden bg-white flex flex-col h-40 justify-between">
          <div className="p-6 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Total Premium Users</p>
              <h3 className="text-3xl font-bold mt-2">
                <CountUp end={stats.totalPremiumUsers} duration={2} />+
              </h3>
              <p className="text-xs mt-1 text-gray-500">5 PremiumUsers add Per Month</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <Gem className="text-2xl text-red-500" />
            </div>
          </div>
          <div className="h-1 bg-red-200"></div>
        </div>


      </div>
      <div className='mt-8 md:grid gap-8 grid-cols-6 '>

        <div className='col-span-2'>
          <ResentUser />
        </div>

        <div className='col-span-4'>
          <RecentOrders />
        </div>
      </div>


    </div>
  );
};

export default AdminHome;
