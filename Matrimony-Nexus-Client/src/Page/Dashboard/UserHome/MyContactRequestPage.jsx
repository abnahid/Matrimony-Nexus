import Header from "@/Components/Header";
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
    <div className="container mx-auto px-4 py-6">
      <Header
        header="My Contact Requests"
        title="View and manage all the contact requests you've made or received. Stay connected and track your communication easily."
      />

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow bg-white mt-6">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-left text-sm font-semibold">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Biodata ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Mobile No</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contactRequests.length > 0 ? (
              contactRequests.map((request) => (
                <tr
                  key={request._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4">{request.name}</td>
                  <td className="px-6 py-4">{request.biodataId}</td>
                  <td className="px-6 py-4 capitalize">
                    {request.status === "approved" ? "Approved" : "Pending"}
                  </td>
                  <td className="px-6 py-4">
                    {request.status === "approved"
                      ? request.mobileNumber || "N/A"
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {request.status === "approved"
                      ? request.email || "N/A"
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      onClick={() => handleDelete(request._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
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
                  className="px-6 py-6 text-center text-gray-500"
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
