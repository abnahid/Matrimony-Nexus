import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";

const MissionVision = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <section className={`py-28 px-6 md:px-20 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Our Mission & Vision
                </h2>

                {/* Mission Section */}
                <div className="mb-12">
                    <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-BgPrimary" : "text-purple-700"}`}>
                        🌟 Mission Statement
                    </h3>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        At <strong>Matrimony Nexus</strong>, our mission is to empower individuals in their quest
                        for genuine and lifelong companionship. We aim to simplify the matchmaking journey by offering
                        a platform that is modern, user-friendly, and culturally sensitive. By prioritizing trust,
                        transparency, and personalization, we create an environment where individuals feel comfortable
                        expressing who they are and what they seek. Our technology is designed to bring together people
                        based not only on preferences and values but also on mutual respect and emotional compatibility.
                        <br />
                        <br />
                        We strive to ensure that every interaction on our platform leads to meaningful connections,
                        built on a foundation of honesty and respect. Whether you're looking for someone who shares your
                        traditions or someone who challenges your worldview in a positive way, Matrimony Nexus exists to
                        guide you toward a fulfilling and committed partnership.
                    </p>
                </div>

                {/* Vision Section */}
                <div>
                    <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-BgPrimary" : "text-green-700"}`}>
                        🌈 Vision Statement
                    </h3>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Our vision is to become the world’s most trusted digital matchmaking platform—where tradition
                        meets innovation, and people from all walks of life can find lasting love. We envision a future
                        where technology does not replace human connection, but enhances it, enabling individuals to meet
                        their ideal partners with confidence, clarity, and hope.
                        <br />
                        <br />
                        Through continuous innovation, inclusive design, and a deep understanding of cultural diversity,
                        we aspire to set a new standard in the online matchmaking industry. Matrimony Nexus aims to be
                        more than just a platform—it will be a safe space, a support system, and a guiding hand for
                        millions looking to begin their next chapter in life with someone truly compatible.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;