import { Button } from "@/Components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyContactRequestPage = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContactRequests = async () => {
      const response = await axiosSecure.get(
        `/users/contactRequests/${user.email}`
      );
      setContactRequests(response.data);
    };

    fetchContactRequests();
  }, [user.email, axiosSecure]);

  const handleDelete = async (requestId) => {
    const response = await axiosSecure.delete(
      `/users/contactRequests/${requestId}`
    );
    if (response.data.success) {
      setContactRequests((prev) =>
        prev.filter((request) => request._id !== requestId)
      );
      toast.success("Contact request removed successfully.");
    } else {
      toast.error("Failed to remove contact request.");
    }
  };

  return (
    <div className="container mx-auto p-10 py-24">
      <h2 className="text-3xl font-bold mb-6">My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Name</th>
              <th className="border border-gray-300 p-4 text-left">
                Biodata ID
              </th>
              <th className="border border-gray-300 p-4 text-left">Status</th>
              <th className="border border-gray-300 p-4 text-left">
                Mobile No
              </th>
              <th className="border border-gray-300 p-4 text-left">Email</th>
              <th className="border border-gray-300 p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {contactRequests.length > 0 ? (
              contactRequests.map((request) => (
                <tr key={request._id}>
                  <td className="border border-gray-300 p-4">{request.name}</td>
                  <td className="border border-gray-300 p-4">
                    {request.biodataId}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {request.status === "approved" ? "Approved" : "Pending"}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {request.status === "approved"
                      ? request.mobileNumber || "N/A"
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {request.status === "approved"
                      ? request.email || "N/A"
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Button
                      onClick={() => handleDelete(request._id)}
                      className="bg-red-500 text-white"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No contact requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequestPage;
