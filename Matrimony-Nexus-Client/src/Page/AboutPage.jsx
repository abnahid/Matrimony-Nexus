const AboutPage = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Your Path to Finding the Perfect Life Partner
        </h2>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          Matrimony Nexus is more than just a matchmaking platform. It’s your
          companion in one of life’s most important journeys—finding a life
          partner who shares your dreams, values, and aspirations.
        </p>
        <p className="text-base text-gray-500 mb-4">
          We understand the challenges of matchmaking in today's complex world.
          That's why we built Matrimony Nexus—to connect genuine individuals
          seeking meaningful and lasting relationships.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              A Trusted Platform
            </h3>
            <p className="text-sm text-gray-500">
              Matrimony Nexus is one of the most trusted matrimony platforms in
              Bangladesh. We prioritize safety and authenticity.
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Sharia-Compliant Matchmaking
            </h3>
            <p className="text-sm text-gray-500">
              Our platform adheres to Islamic values, ensuring matches align
              with your noble desires and cultural values.
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Join thousands of Bangladeshi brothers and sisters who trust Matrimony
          Nexus to help them find their life partner. Safe, secure, and
          meaningful connections start here.
        </p>
        <a
          href="/register"
          className="mt-6 inline-block bg-custom-gradient text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600"
        >
          Get Started Today
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
