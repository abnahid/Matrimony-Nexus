import { Button } from "@/Components/ui/button";
import { Table } from "@/Components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();

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
      <div className="container mx-auto p-6">
        <p className="text-lg font-semibold text-center">Loading requests...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500 text-lg font-semibold text-center">
          Error loading requests: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Contact Requests</h2>
      {requests.length > 0 ? (
        <Table className="bg-white shadow rounded-lg border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Biodata ID
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="border-t">
                <td className="px-4 py-2 text-sm">{request.name || "N/A"}</td>
                <td className="px-4 py-2 text-sm">{request.email || "N/A"}</td>
                <td className="px-4 py-2 text-sm">
                  {request.biodataId || "N/A"}
                </td>
                <td className="px-4 py-2 text-center">
                  {request.status === "approved" ? (
                    <Button
                      disabled
                      className="bg-gray-300 text-gray-600 cursor-not-allowed"
                    >
                      Approved
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApproveContact(request._id)}
                      variant="primary"
                      className="bg-custom-gradient text-white hover:bg-red-600"
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
