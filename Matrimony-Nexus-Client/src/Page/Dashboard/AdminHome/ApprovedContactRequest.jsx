import Header from "@/Components/Header";
import { Button } from "@/Components/ui/button";
import { Table } from "@/Components/ui/table";
import ThemeContext from "@/context/ThemeContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/contactRequest");
      return response.data;
    },

    staleTime: 1500,
  });

  const handleApproveContact = async (requestId) => {
    await axiosSecure.patch(`/users/contactRequests/${requestId}`);
    toast.success("Contact request approved successfully.");
    refetch();
  };

  if (isLoading) {
    return (
      <div
        className={`container mx-auto p-6 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
          }`}
      >
        <p className="text-lg font-semibold text-center">Loading requests...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`container mx-auto p-6 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
          }`}
      >
        <p className="text-red-500 text-lg font-semibold text-center">
          Error loading requests: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto p-6 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
        }`}
    >
      <Header
        header={"Approved Contact Requests"}
        title={
          "View users with approved contact requests and ensure proper connection flow within the platform."
        }
      />
      <h2 className="text-2xl font-bold mb-4">Approved Contact Requests</h2>
      {requests.length > 0 ? (
        <Table
          className={`${isDarkMode ? "bg-BgDarkSecondary text-gray-300" : ""
            }`}
        >
          <thead className={`overflow-x-auto rounded-lg border shadow ${isDarkMode
            ? "border-BgDarkAccent bg-BgDarkPrimary"
            : "border-gray-300 bg-white"
            }`}>
            <tr
              className={`${isDarkMode
                ? "bg-BgDarkAccent text-gray-100"
                : "bg-gray-100 text-gray-600"
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
                className={`border-t ${isDarkMode
                  ? "border-gray-700 hover:bg-gray-700"
                  : "hover:bg-gray-50"
                  }`}
              >
                <td className="px-4 py-2 text-sm">{request.name || "N/A"}</td>
                <td className="px-4 py-2 text-sm">{request.email || "N/A"}</td>
                <td className="px-4 py-2 text-sm">
                  {request.biodataId || "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {request.status === "approved" ? (
                    <Button
                      disabled
                      className={`cursor-not-allowed ${isDarkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-300 text-gray-600"
                        }`}
                    >
                      Approved
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApproveContact(request._id)}
                      className={`hover:bg-red-600 ${isDarkMode
                        ? "bg-BgDarkAccent text-gray-200 hover:bg-BgDarkPrimary"
                        : "bg-custom-gradient text-white"
                        }`}
                    >
                      Approve Contact
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-lg text-center text-gray-500">
          No pending contact requests found.
        </p>
      )}
    </div>
  );
};

export default ApprovedContactRequest;