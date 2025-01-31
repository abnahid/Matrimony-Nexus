import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Gem, ScanFace, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import BiodataPieChart from "./BiodataPieChart";

const AdminHome = () => {
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
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 text-white p-6 rounded-md shadow-md">
          <div className="flex items-center gap-4 justify-between">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <UserRound className="size-5" />
          </div>

          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-md shadow-md">
          <div className="flex items-center gap-4 justify-between">
            <h3 className="text-lg font-semibold">Total Biodata</h3>
            <ScanFace className="size-5" />
          </div>
          <p className="text-2xl">{stats.totalBiodatas}</p>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded-md shadow-md">
          <div className="flex items-center gap-4 justify-between">
            <h3 className="text-lg font-semibold">Total Premium Users</h3>
            <Gem className="size-5" />
          </div>
          <p className="text-2xl">{stats.totalPremiumUsers}</p>
        </div>
      </div>
      <div className="mt-8">
        <BiodataPieChart />
      </div>
    </div>
  );
};

export default AdminHome;
