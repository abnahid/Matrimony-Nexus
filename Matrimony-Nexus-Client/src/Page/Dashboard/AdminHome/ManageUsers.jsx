import { Button } from "@/Components/ui/button";
import { Table } from "@/Components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/users/admin/${userId}`);
      refetch();
    } catch (error) {
      console.error("Failed to make user admin:", error);
    }
  };

  const handleMakePremium = async (userId) => {
    try {
      await axiosSecure.patch(`/users/premium/${userId}`);
      refetch();
    } catch (error) {
      console.error("Failed to make user premium:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
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
                Role
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2 text-sm">{user.name}</td>
                <td className="px-4 py-2 text-sm">{user.email}</td>
                <td className="px-4 py-2 text-sm">{user.role || "User"}</td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-2"
                    onClick={() => handleMakeAdmin(user._id)}
                    variant="primary"
                    disabled={user.role === "admin"}
                  >
                    Make Admin
                  </Button>
                  <Button
                    onClick={() => handleMakePremium(user._id)}
                    variant="secondary"
                    disabled={user.premium === true}
                  >
                    Make Premium
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ManageUsers;
