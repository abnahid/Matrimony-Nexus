
const TermsAndConditions = () => {
    return (
        <section className="bg-gray-50 py-28 px-6 md:px-20">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Terms & Conditions
                </h2>

                {/* Introduction */}
                <div className="mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        These Terms and Conditions ("Terms") govern your access to and use of the <strong>Matrimony Nexus</strong> platform.
                        By registering or using our services, you agree to comply with and be bound by these Terms.
                        If you do not agree, please refrain from using the site.
                    </p>
                </div>

                {/* Eligibility */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-purple-700 mb-3">✅ Eligibility</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        You must be at least 18 years old and legally eligible to marry under the laws of your country.
                        By using the platform, you confirm that all information provided is accurate, truthful, and up-to-date.
                    </p>
                </div>

                {/* User Responsibilities */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-3">🧑‍💼 User Responsibilities</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Users are expected to:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Maintain respectful and honest communication</li>
                            <li>Not engage in harassment, fraud, or impersonation</li>
                            <li>Use the platform solely for personal, lawful matchmaking purposes</li>
                            <li>Keep login credentials confidential and secure</li>
                        </ul>
                    </p>
                </div>

                {/* Account Termination */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-red-700 mb-3">🚫 Account Suspension & Termination</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We reserve the right to suspend or permanently disable any account that violates our Terms,
                        harms other users, or misuses the platform. This includes fraudulent profiles, offensive
                        behavior, and breach of community standards.
                    </p>
                </div>

                {/* Intellectual Property */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-green-700 mb-3">📄 Intellectual Property</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        All content on <strong>Matrimony Nexus</strong>, including logos, design, text, software, and media, is
                        protected by intellectual property laws. You may not reproduce, distribute, or modify any content
                        without written permission.
                    </p>
                </div>

                {/* Limitation of Liability */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-orange-700 mb-3">⚖️ Limitation of Liability</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        While we strive to provide a secure and effective platform, <strong>Matrimony Nexus</strong> is not liable for:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Inaccurate user information or fraudulent profiles</li>
                            <li>Unsuccessful matchmaking outcomes</li>
                            <li>Emotional, legal, or financial losses arising from user interactions</li>
                        </ul>
                    </p>
                </div>

                {/* Modifications */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-teal-700 mb-3">🛠️ Modifications to Terms</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        We may update these Terms occasionally to reflect changes in our services or regulations.
                        Continued use of the platform after any such changes constitutes your acceptance of the new Terms.
                    </p>
                </div>

                {/* Governing Law */}
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">⚖️ Governing Law</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        These Terms shall be governed and interpreted according to the laws of Bangladesh or
                        the user's local jurisdiction, depending on the circumstances.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;
