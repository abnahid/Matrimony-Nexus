import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { AuthContext } from "@/context/AuthProvider";
import ThemeContext from "@/context/ThemeContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";

const PaysDashboard = () => {
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  const axiosPublic = useAxiosPublic();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosPublic.get(`/users/${user.email}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosPublic]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!userData) {
    return <div className="p-6 text-center">User data not found.</div>;
  }

  const fakeImpactData = {
    connectionsMade: 45,
    matchesFound: 12,
    profileViews: 340,
    messagesExchanged: 158,
  };

  return (
    <div className={`p-6 ${isDarkMode ? "bg-[#1e1e2f] text-white" : "bg-white text-gray-900"}`}>
      {/* Background Cover */}
      <div
        className="relative h-[350px] bg-cover bg-center rounded-2xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: `url(${userData.photoUrl || user.photoURL || "https://img.freepik.com/premium-vector/flat-businessman-character_33040-132.jpg"})`,
        }}
      >
        <div className={`absolute inset-0 ${isDarkMode ? "bg-black opacity-60" : "bg-black opacity-40"}`}></div>
      </div>

      {/* Profile Info */}
      <div className="px-6 -mt-12 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div
              className={`w-32 h-32 rounded-full border-4 ${userData.premium ? "border-yellow-500" : "border-white"} bg-gray-200 overflow-hidden shadow-lg`}
            >
              <img
                src={
                  userData.photoUrl || user.photoURL ||
                  "https://img.freepik.com/premium-vector/flat-businessman-character_33040-132.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://img.freepik.com/premium-vector/flat-businessman-character_33040-132.jpg";
                }}
              />
            </div>
          </div>

          {/* Name and Premium Status */}
          <div className="text-left w-full z-10 mt-8">
            <h1 className={`${isDarkMode ? "text-white" : "text-gray-500"} text-3xl font-bold`}>
              {userData.displayName || userData.name || "No Name"}
            </h1>
            <p
              className={`text-sm font-bold mt-2 ${userData.premium ? "text-yellow-500" : isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              {userData.premium ? "Premium Member" : "Free Member"}
            </p>
          </div>
        </div>
      </div>

      {/* Avatar Card */}
      <Card className={`mb-6 ${isDarkMode ? "bg-[#2a2a40] text-white" : ""}`}>
        <CardContent className="flex items-center space-x-4 p-4">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={userData.photoURL} alt={userData.displayName} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">{userData.displayName || "Guest User"}</h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{userData.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Useful Stats Section */}
      <Card className={`${isDarkMode ? "bg-[#2a2a40] text-white" : ""}`}>
        <CardHeader>
          <CardTitle>Activity & Impact</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{fakeImpactData.connectionsMade}</p>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Connections Made</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{fakeImpactData.matchesFound}</p>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Matches Found</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{fakeImpactData.profileViews}</p>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Profile Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{fakeImpactData.messagesExchanged}</p>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Messages Exchanged</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaysDashboard;