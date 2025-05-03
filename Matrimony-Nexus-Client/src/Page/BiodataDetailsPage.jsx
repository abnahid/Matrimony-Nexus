import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card } from "@/components/ui/card";
import ThemeContext from "@/context/ThemeContext";
import useAuth from "@/hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "./../hooks/useAxiosSecure";

const BiodataDetailsPage = () => {
  const { biodataId } = useParams();
  const [biodata, setBiodata] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBiodata = async () => {
      const response = await axiosSecure.get(`/biodatas/${biodataId}`);
      setBiodata(response.data.biodata);

      const premiumResponse = await axiosSecure.get(`/users/${user.email}`);
      setIsPremium(
        premiumResponse.data.premium && premiumResponse.data.approvedPremium
      );

      const favouritesResponse = await axiosSecure.get(
        `/favorites/${user.email}`
      );
      const isFav = favouritesResponse.data.some(
        (fav) => fav.biodataId === biodataId
      );
      setIsFavourite(isFav);
    };

    fetchBiodata();
  }, [biodataId, user?.email, axiosSecure]);

  const handleRequestPremium = async () => {
    await axiosSecure.post("/users/premium-request", { email: user.email });
    toast.success("Premium request submitted successfully!");
  };

  const handleRequestContact = () => {
    if (isPremium) {
      toast.success("You already have access to contact information.");
    } else {
      navigate(`/checkout/${biodataId}`);
    }
  };

  const handleAddToFavourites = async () => {
    const { name, permanentDivision, occupation } = biodata;
    const response = await axiosSecure.post("/favorites", {
      name,
      biodataId,
      permanentDivision,
      occupation,
      userId: user.email,
    });

    if (response.data.success) {
      setIsFavourite(true);
      toast.success("Added to favourites successfully!");
    } else {
      toast.error("Failed to add to favourites.");
    }
  };

  if (!biodata) return <div>Loading...</div>;

  return (
    <div
      className={`container mx-auto p-10 py-24 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
        }`}
    >
      <h2 className="text-3xl font-bold mb-6">Biodata Details</h2>
      <Card
        className={`overflow-hidden shadow rounded-lg border ${isDarkMode
            ? "bg-BgDarkSecondary border-BgDarkAccent text-gray-300"
            : "bg-white border-gray-200 text-gray-900"
          }`}
      >
        <div
          className={`px-4 py-5 sm:px-6 flex justify-between ${isDarkMode ? "bg-BgDarkSecondary" : ""
            }`}
        >
          <div>
            <h3
              className={`text-lg leading-6 font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
            >
              User Profile
            </h3>
            <p
              className={`mt-1 max-w-2xl text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Details about the user.
            </p>
          </div>
          <Avatar>
            <AvatarImage src={biodata.profileImageLink} alt={biodata.name} />
          </Avatar>
        </div>
        <div
          className={`border-t px-4 py-5 sm:p-0 ${isDarkMode ? "border-BgDarkAccent" : "border-gray-200"
            }`}
        >
          <dl className={`sm:divide-y ${isDarkMode ? "sm:divide-BgDarkAccent" : "sm:divide-gray-200"}`}>
            {Object.entries({
              "Full Name": biodata.name,
              Age: biodata.age,
              Height: biodata.height,
              Weight: biodata.weight,
              Occupation: biodata.occupation,
              Race: biodata.race,
              "Permanent Division": biodata.permanentDivision,
              "Present Division": biodata.presentDivision,
              "Expected Partner Age": biodata.expectedPartnerAge,
              "Expected Partner Height": biodata.expectedPartnerHeight,
              "Expected Partner Weight": biodata.expectedPartnerWeight,
            }).map(([label, value]) => (
              <div
                key={label}
                className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt
                  className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  {label}
                </dt>
                <dd
                  className={`mt-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-900"
                    } sm:mt-0 sm:col-span-2`}
                >
                  {value || "N/A"}
                </dd>
              </div>
            ))}
            {isPremium ? (
              <>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    Contact Number
                  </dt>
                  <dd
                    className={`mt-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-900"
                      } sm:mt-0 sm:col-span-2`}
                  >
                    {biodata.mobileNumber}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt
                    className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    Email
                  </dt>
                  <dd
                    className={`mt-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-900"
                      } sm:mt-0 sm:col-span-2`}
                  >
                    {biodata.contactEmail}
                  </dd>
                </div>
              </>
            ) : (
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt
                  className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  Contact
                </dt>
                <dd className="flex gap-4 flex-row mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <Button
                    onClick={handleRequestPremium}
                    className={`bg-custom-gradient ${isDarkMode ? "text-gray-300" : "text-white"
                      }`}
                  >
                    Request Premium
                  </Button>
                  <Button
                    onClick={handleRequestContact}
                    className={`bg-custom-gradient ${isDarkMode ? "text-gray-300" : "text-white"
                      }`}
                  >
                    Request Contact Information
                  </Button>
                </dd>
              </div>
            )}
            {/* Add to Favourites Button */}
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt
                className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Add to Favourites
              </dt>
              <dd className="flex mt-1 text-sm sm:mt-0 sm:col-span-2">
                <Button
                  onClick={handleAddToFavourites}
                  disabled={isFavourite}
                  className={`bg-custom-gradient ${isDarkMode ? "text-gray-300" : "text-white"
                    }`}
                >
                  {isFavourite ? "Already in Favourites" : "Add to Favourites"}
                </Button>
              </dd>
            </div>
          </dl>
        </div>
      </Card>
    </div>
  );
};

export default BiodataDetailsPage;