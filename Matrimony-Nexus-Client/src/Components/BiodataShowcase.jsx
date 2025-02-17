import useBiodatas from "@/hooks/useBiodatas";
import { useEffect, useState } from "react";

const BiodataShowcase = () => {
    const [randomBiodatas, setRandomBiodatas] = useState([]);
    const { biodatas, loading } = useBiodatas(1, 50, {});

    useEffect(() => {
        if (biodatas.length > 0) {
            const shuffled = [...biodatas].sort(() => 0.5 - Math.random());
            setRandomBiodatas(shuffled.slice(0, 3));
        }
    }, [biodatas]);

    return (
        <div className="max-w-5xl mx-auto my-10">
            <h2 className="text-3xl font-bold text-center mb-6">Biodata Showcase</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading biodatas...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {randomBiodatas.map((biodata) => (
                        <div
                            key={biodata.biodataId}
                            className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center"
                        >
                            <img
                                src={biodata.image || "https://via.placeholder.com/150"}
                                alt={biodata.name}
                                className="w-32 h-32 rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">{biodata.name}</h3>
                            <p className="text-gray-600">Age: {biodata.age}</p>
                            <p className="text-gray-500">Location: {biodata.permanentDivision}</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BiodataShowcase;
