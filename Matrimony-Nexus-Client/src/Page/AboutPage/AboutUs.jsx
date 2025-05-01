import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import aboutImg from "../../assets/Home/banner.jpg";

const AboutUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setVideoUrl("https://www.youtube.com/embed/-yNbthUFppw?si=xF_Yqg70fLzL9r1w");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setVideoUrl("");
    };

    return (
        <section className="container mx-auto  px-4 py-20">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-8">
                {/* Left Side - Image & Video */}
                <div className="relative md:w-1/2">
                    <img
                        src={aboutImg}
                        alt="About Matrimony Nexus"
                        className="w-full h-full object-cover"
                    />

                    <button
                        onClick={handleOpenModal}
                        className="absolute bg-white rounded-full p-4 shadow-md hover:shadow-lg transform hover:scale-105 transition"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <FaPlay className="text-BgPrimary text-3xl" />
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="relative bg-white p-4 rounded-lg">
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-0 right-0 text-black text-2xl p-2 bg-white rounded-full hover:bg-gray-100 transition"
                                >
                                    <IoMdClose />
                                </button>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={videoUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side - Text Content */}
                <div className="md:w-1/2">
                    <span className="bg-orange-100 text-BgPrimary px-3 py-1 rounded-full text-sm font-semibold">
                        About Us
                    </span>
                    <h2 className="text-4xl font-bold text-gray-800 mt-4">
                        Connecting Hearts with <span className="text-BgPrimary">Matrimony Nexus</span>
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Matrimony Nexus is a trusted platform that connects individuals seeking life partners, ensuring seamless, secure, and meaningful connections. Join thousands who have found their perfect match through our platform.
                    </p>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-red-100 p-2 rounded-full text-red-600">❤️</span>
                            <p className="text-gray-800 font-medium">Find Your Perfect Match</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-red-100 p-2 rounded-full text-red-600">🔒</span>
                            <p className="text-gray-800 font-medium">Secure and Private</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-red-100 p-2 rounded-full text-red-600">💬</span>
                            <p className="text-gray-800 font-medium">Reliable Communication</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-red-100 p-2 rounded-full text-red-600">🌍</span>
                            <p className="text-gray-800 font-medium">Global Reach</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6">
                        <button className="bg-BgPrimary text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-600 transition">
                            Join Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;