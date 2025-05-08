import ThemeContext from "@/context/ThemeContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BiodataShowcase = () => {
    const [randomBiodatas, setRandomBiodatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const fetchBiodatas = async () => {
            setLoading(true);

            const response = await axiosPublic.get("/biodatas", {
                params: { page: 1, limit: 20 },
            });


            const biodatas = response.data.data || [];

            if (biodatas.length > 0) {
                const shuffled = [...biodatas].sort(() => 0.5 - Math.random());
                setRandomBiodatas(shuffled.slice(0, 3));
            }

            setLoading(false);
        };

        fetchBiodatas();
    }, [axiosPublic]);


    return (
        <div
            className={`max-w-7xl mx-auto my-20 px-6 md:px-0 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-white text-gray-900"
                }`}
        >
            <h2 className="text-3xl font-bold text-center mb-6">Biodata Showcase</h2>

            {loading ? (
                <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Loading biodatas...
                </p>
            ) : randomBiodatas.length === 0 ? (
                <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    No biodata found.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {randomBiodatas.map((biodata, index) => (
                        <div
                            key={biodata.biodataId || index}
                            className={`p-5 rounded-lg flex flex-col items-center ${isDarkMode ? "bg-BgDarkSecondary" : "bg-white"
                                }`}
                        >
                            <img
                                src={biodata.profileImageLink || "https://via.placeholder.com/150"}
                                alt={biodata.name || "User Image"}
                                className="w-32 h-32 rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">
                                {biodata.name || "Unknown"}
                            </h3>
                            <p
                                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                            >
                                Age: {biodata.age || "N/A"}
                            </p>
                            <p
                                className={`${isDarkMode ? "text-gray-500" : "text-gray-500"
                                    }`}
                            >
                                Location: {biodata.permanentDivision || "N/A"}
                            </p>
                            <Link to={`/biodata-details/${biodata.biodataId}`}>
                                <button
                                    className={`mt-4 px-4 py-2 rounded-lg text-white ${isDarkMode
                                        ? "bg-BgPrimary hover:bg-gray-700"
                                        : "bg-BgPrimary hover:bg-BgPrimaryHover"
                                        }`}
                                >
                                    View Profile
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BiodataShowcase;