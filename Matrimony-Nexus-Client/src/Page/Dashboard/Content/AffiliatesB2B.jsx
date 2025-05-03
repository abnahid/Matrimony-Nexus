import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";

const AffiliatesB2B = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <section className={`py-28 px-6 md:px-20 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"}`}>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Affiliates & B2B Partnerships
                </h2>

                {/* Affiliate Opportunities */}
                <div className="mb-12">
                    <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-BgPrimary" : "text-blue-700"}`}>🤝 Affiliate Collaboration</h3>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        At <strong>Matrimony Nexus</strong>, we believe in growing together. We offer lucrative affiliate
                        opportunities for individuals, influencers, and organizations who wish to promote our platform
                        and earn through successful referrals. Our affiliate program is designed to be simple, transparent,
                        and rewarding. Whether you’re a relationship coach, a cultural influencer, a blogger, or simply
                        someone passionate about connecting people, we provide all the tools you need to succeed.
                        <br />
                        <br />
                        Our tracking system ensures accurate commissions, while our dedicated affiliate support team
                        helps you every step of the way. Together, we can make meaningful matchmaking accessible to more
                        people around the world.
                    </p>
                </div>

                {/* B2B Partnerships */}
                <div>
                    <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-BgPrimary" : "text-teal-700"}`}>🏢 B2B Partnerships</h3>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        We warmly welcome strategic B2B partnerships with community organizations, matchmaking agencies,
                        wedding service providers, and cultural institutions. By integrating with <strong>Matrimony Nexus</strong>,
                        partners can leverage our technology, data security, and global reach to expand their offerings
                        and better serve their audiences.
                        <br />
                        <br />
                        Whether it’s a co-branded white-label solution, API access, or cross-promotional collaboration,
                        our B2B model is flexible and customizable to meet diverse business needs. Let’s collaborate
                        to build bridges between cultures, communities, and hearts.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AffiliatesB2B;