import { Button } from "@/Components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyFavouritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await axiosSecure.get(`/favorites/${user.email}`);
      setFavorites(response.data);
    };

    if (user?.email) fetchFavourites();
  }, [user?.email, axiosSecure]);

  const handleDelete = async (biodataId) => {
    const response = await axiosSecure.delete(`/favorites/${biodataId}`);
    if (response.data.success) {
      // Update local state
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.biodataId !== biodataId)
      );
      toast.success("Biodata removed from favorites.");
    } else {
      throw new Error("Failed to delete favorite.");
    }
  };

  return (
    <div className="container mx-auto p-10 py-24">
      <h2 className="text-3xl font-bold mb-6">My Favourites</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Name</th>
              <th className="border border-gray-300 p-4 text-left">
                Biodata ID
              </th>
              <th className="border border-gray-300 p-4 text-left">
                Permanent Address
              </th>
              <th className="border border-gray-300 p-4 text-left">
                Occupation
              </th>
              <th className="border border-gray-300 p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.length > 0 ? (
              favorites.map((favorite) => (
                <tr key={favorite.biodataId}>
                  <td className="border border-gray-300 p-4">
                    {favorite.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {favorite.biodataId}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {favorite.permanentDivision || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {favorite.occupation || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-4 text-center">
                    <Button
                      onClick={() => handleDelete(favorite.biodataId)}
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
                  colSpan="5"
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No favorites found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavouritesPage;
