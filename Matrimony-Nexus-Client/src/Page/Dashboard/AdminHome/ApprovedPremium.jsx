import { Button } from "@/components/ui/button";
import { Table } from "@/Components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();

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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Premium Requests</h2>
      {isLoading ? (
        <p>Loading requests...</p>
      ) : requests.length > 0 ? (
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
                <td className="px-4 py-2 text-sm">{request.name}</td>
                <td className="px-4 py-2 text-sm">{request.email}</td>
                <td className="px-4 py-2 text-sm">{request._id}</td>
                <td className="px-4 py-2 text-center">
                  {request.approvedPremium ? (
                    <Button
                      disabled
                      className="bg-gray-300 text-gray-600 cursor-not-allowed"
                    >
                      Premium
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApprovePremium(request._id)}
                      variant="primary"
                      className="bg-custom-gradient text-white hover:bg-red-600"
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
