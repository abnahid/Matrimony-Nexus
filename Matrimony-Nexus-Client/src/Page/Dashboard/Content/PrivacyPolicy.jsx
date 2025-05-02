
const PrivacyPolicy = () => {
    return (
        <section className="bg-white py-28 px-6 md:px-20">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Privacy Policy
                </h2>

                {/* Introduction */}
                <div className="mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        At <strong>Matrimony Nexus</strong>, your privacy is our priority. This Privacy Policy outlines how
                        we collect, use, protect, and share your personal information when you use our platform. By using
                        our services, you agree to the practices described in this policy.
                    </p>
                </div>

                {/* Data Collection */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-purple-700 mb-3">📥 What We Collect</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We collect information to provide better services to all our users. This includes:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Personal details like name, gender, date of birth, location, and contact information</li>
                            <li>Profile details such as religion, interests, education, and lifestyle choices</li>
                            <li>Usage data such as time spent, search filters used, and interaction patterns</li>
                            <li>Payment information when using premium features (handled securely via Stripe)</li>
                        </ul>
                    </p>
                </div>

                {/* Usage of Data */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-3">🔐 How We Use Your Information</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Your data is used solely to:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Enhance your matchmaking experience through smart suggestions</li>
                            <li>Maintain safety and authenticity across the platform</li>
                            <li>Communicate with you regarding updates, promotions, or policy changes</li>
                            <li>Improve our technology and develop new features</li>
                        </ul>
                    </p>
                </div>

                {/* Data Sharing */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-red-700 mb-3">🔄 Sharing of Information</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We do not sell or rent your personal information to third parties. However, we may share data with:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Trusted service providers who assist in operating the platform (e.g., hosting, payments)</li>
                            <li>Law enforcement or legal authorities if required by law or to protect user safety</li>
                        </ul>
                    </p>
                </div>

                {/* Data Security */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-green-700 mb-3">🛡️ Data Protection & Security</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We use industry-standard security measures to protect your data, including encryption,
                        secure servers, and two-factor authentication. While we do our best to safeguard your
                        data, no platform can be 100% secure.
                    </p>
                </div>

                {/* User Rights */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-indigo-700 mb-3">📌 Your Rights & Choices</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        You have full control over your information. You may:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Edit or delete your profile at any time</li>
                            <li>Request a copy of the personal data we store</li>
                            <li>Opt-out of marketing emails or notifications</li>
                            <li>Report abuse or request account deletion</li>
                        </ul>
                    </p>
                </div>

                {/* Updates */}
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">📅 Updates to This Policy</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We may update this Privacy Policy periodically. Any changes will be posted on this page
                        with a revised effective date. We recommend reviewing the policy regularly to stay informed.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
