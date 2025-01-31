import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const PaysDashboard = () => {
  const { user } = useContext(AuthContext);
  const fakeData = {
    username: user?.displayName || "Guest",
    handle: user?.uid || "N/A",
    avatar: user?.photoURL || "@/assets/defaultProfilePicture.jpg",
    impact: {
      componentsContributed: 12,
      usersGotHelp: 58,
      favoritesReceived: 120,
      viewsLast30Days: 340,
    },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardContent className="flex items-center space-x-4 p-4">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={fakeData.avatar} alt={fakeData.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">{fakeData.username}</h1>
            <p className="text-gray-500">{fakeData.handle}</p>
          </div>
        </CardContent>
      </Card>

      {/* Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Impact</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold">
              {fakeData.impact.componentsContributed}
            </p>
            <p className="text-gray-500">Components Contributed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{fakeData.impact.usersGotHelp}</p>
            <p className="text-gray-500">Users Got Help</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {fakeData.impact.favoritesReceived}
            </p>
            <p className="text-gray-500">Favorites Received</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {fakeData.impact.viewsLast30Days}
            </p>
            <p className="text-gray-500">Views in Last 30 Days</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaysDashboard;
