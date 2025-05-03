import Header from "@/Components/Header";
import { Button } from "@/components/ui/button";
import { Table } from "@/Components/ui/table";
import ThemeContext from "@/context/ThemeContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingPremiumRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const handleApprovePremium = async (id) => {
    await axiosSecure.patch(`/users/approvedPremium/${id}`);
    refetch();
  };

  return (
    <div
      className={`container mx-auto p-6 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
        }`}
    >
      <Header
        header={"Approved Premium"}
        title={
          "Review and manage all users with approved premium access to ensure continued premium service quality."
        }
      />
      <h2 className="text-2xl font-bold mb-4">Approved Premium Requests</h2>
      {isLoading ? (
        <p>Loading requests...</p>
      ) : requests.length > 0 ? (
        <Table className={` ${isDarkMode ? "bg-BgDarkSecondary text-gray-300" : "border-gray-300 bg-white"}`}>
          <thead className={`overflow-x-auto rounded-lg border shadow ${isDarkMode
            ? "border-BgDarkAccent bg-BgDarkPrimary"
            : "border-gray-300 bg-white"
            }`}>
            <tr
              className={`${isDarkMode ? "bg-BgDarkAccent text-gray-100" : "bg-gray-100 text-gray-600"
                }`}
            >
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">
                Biodata ID
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request._id}
                className={`border-t ${isDarkMode ? "border-gray-700 hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
              >
                <td className="px-4 py-2 text-sm">{request.name}</td>
                <td className="px-4 py-2 text-sm">{request.email}</td>
                <td className="px-4 py-2 text-sm">{request._id}</td>
                <td className="px-4 py-2 text-center">
                  {request.approvedPremium ? (
                    <Button
                      disabled
                      className={`cursor-not-allowed ${isDarkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-300 text-gray-600"
                        }`}
                    >
                      Premium
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApprovePremium(request._id)}
                      variant="primary"
                      className={`hover:bg-red-600 ${isDarkMode
                        ? "bg-BgDarkAccent text-gray-200 hover:bg-BgDarkPrimary"
                        : "bg-custom-gradient text-white"
                        }`}
                    >
                      Make Premium
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No premium requests found.</p>
      )}
    </div>
  );
};

export default ApprovedPremium;