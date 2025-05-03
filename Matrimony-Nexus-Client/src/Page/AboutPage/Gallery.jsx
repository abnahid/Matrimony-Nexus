import ThemeContext from "@/context/ThemeContext";
import { useContext, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdFullscreen } from "react-icons/md";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { isDarkMode } = useContext(ThemeContext);

    const images = [
        { id: 1, src: "https://i.ibb.co/mvLSS36/Downloader-La-888948.webp", title: "Image 1" },
        { id: 2, src: "https://images.pexels.com/photos/31145650/pexels-photo-31145650/free-photo-of-person-reading-on-an-e-reader-device-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", title: "Image 2" },
        { id: 3, src: "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", title: "Image 3" },
        { id: 4, src: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", title: "Image 4" },
        { id: 5, src: "https://i.ibb.co/mvLSS36/Downloader-La-888948.webp", title: "Image 5" },
        { id: 6, src: "https://i.ibb.co/pj2js2n/pexels-photo-14831638.webp", title: "Image 6" },
    ];

    return (
        <div className={`py-20 px-10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}>
            <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        onClick={() => setSelectedImage(image)}
                    >
                        {/* Image */}
                        <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-60 object-cover rounded-xl group-hover:brightness-90 group-hover:saturate-110 transition-all duration-300"
                        />

                        {/* Overlay & Text */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 flex-col group-hover:opacity-100 transition-opacity duration-300">
                            <MdFullscreen className="text-white text-5xl" />
                            <span className="text-white text-lg font-semibold">View Image</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedImage && (
                <div className={`fixed inset-0 flex items-center justify-center ${isDarkMode ? "bg-black/90" : "bg-black/80"} backdrop-blur-sm z-50`}>
                    {/* Image Preview */}
                    <div className={`relative p-4 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className={`absolute z-50 top-5 right-5 p-2 rounded-full transition-all duration-200 ${isDarkMode ? "bg-gray-600 text-gray-200 hover:bg-gray-500" : "bg-black/60 text-white hover:bg-opacity-80"
                                }`}
                        >
                            <IoMdCloseCircle className="w-8 h-8" />
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="w-[90vw] md:w-[600px] h-auto rounded-lg"
                        />
                        <div className="text-center mt-2 text-lg font-semibold">{selectedImage.title}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;