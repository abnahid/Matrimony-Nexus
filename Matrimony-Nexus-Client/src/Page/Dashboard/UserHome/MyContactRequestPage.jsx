import Header from "@/Components/Header";
import { Button } from "@/Components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import ThemeContext from "@/context/ThemeContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyContactRequestPage = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const response = await axiosSecure.get(
          `/users/contactRequests/${user.email}`
        );
        setContactRequests(response.data);
      } catch (error) {
        toast.error("Failed to load contact requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchContactRequests();
  }, [user.email, axiosSecure]);

  const handleDelete = async (requestId) => {
    const confirm = window.confirm("Are you sure you want to delete this request?");
    if (!confirm) return;

    try {
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
    } catch (error) {
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Header
        header="My Contact Requests"
        title="View and manage all the contact requests you've made or received. Stay connected and track your communication easily."
      />

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow bg-white mt-6">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : (
          <table className={`min-w-full divide-y text-sm ${isDarkMode
            ? "divide-gray-700 text-gray-200"
            : "divide-gray-200 text-gray-700"
            }`}>
            <thead className={`text-left font-semibold ${isDarkMode
              ? "bg-BgDarkSecondary text-gray-100"
              : "bg-gray-100"
              }`}>
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
                    className={`hover:bg-gray-50 transition duration-150 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                      }`}
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
                  <td colSpan="6" className={`px-6 py-6 text-center ${isDarkMode ? "text-gray-400 bg-BgDarkAccent" : "text-gray-500"
                    }`}>
                    📭 No contact requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div >
  );
};

export default MyContactRequestPage;
