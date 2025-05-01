import Header from "@/Components/Header";
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
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.biodataId !== biodataId)
      );
      toast.success("Biodata removed from favorites.");
    } else {
      toast.error("Failed to delete favorite.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Header
        header={"My Favourites"}
        title={
          "Browse and manage your favourite profiles. Easily revisit the biodatas you've marked as preferred."
        }

      />

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-left font-semibold">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Biodata ID</th>
              <th className="px-6 py-3">Permanent Address</th>
              <th className="px-6 py-3">Occupation</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {favorites.length > 0 ? (
              favorites.map((favorite) => (
                <tr
                  key={favorite.biodataId}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4">{favorite.name || "N/A"}</td>
                  <td className="px-6 py-4">{favorite.biodataId}</td>
                  <td className="px-6 py-4">
                    {favorite.permanentDivision || "N/A"}
                  </td>
                  <td className="px-6 py-4">{favorite.occupation || "N/A"}</td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      onClick={() => handleDelete(favorite.biodataId)}
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
                  colSpan="5"
                  className="px-6 py-6 text-center text-gray-500"
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
