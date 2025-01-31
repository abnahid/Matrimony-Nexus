const BdMarriage = () => {
  return (
    <section
      id="works"
      className="relative bg-gray-50 dark:bg-gray-900 py-10 sm:py-16 lg:py-24"
    >
      <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl dark:text-white text-gray-900 font-extrabold mx-auto md:text-6xl lg:text-5xl">
            How Does It Work?
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
            Matrimony Nexus makes your journey of finding the perfect life
            partner easy and seamless.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              alt="Curved Dotted Line Illustration"
              loading="lazy"
              width="1000"
              height="500"
              decoding="async"
              className="w-full"
              style={{ color: "transparent" }}
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">1</span>
              </div>
              <h3 className="mt-6 text-xl dark:text-white text-gray-900  font-semibold leading-tight md:mt-10">
                Create Your Profile
              </h3>
              <p className="mt-4 text-base text-gray-400 md:text-lg">
                Register on the platform and provide details about yourself to
                create a personalized profile.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">2</span>
              </div>
              <h3 className="mt-6 text-xl dark:text-white text-gray-900  font-semibold leading-tight md:mt-10">
                Browse Biodatas
              </h3>
              <p className="mt-4 text-base text-gray-400 md:text-lg">
                Explore detailed biodatas and filter by age, occupation,
                division, and other preferences.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">3</span>
              </div>
              <h3 className="mt-6 text-xl dark:text-white text-gray-900  font-semibold leading-tight md:mt-10">
                Contact & Connect
              </h3>
              <p className="mt-4 text-base text-gray-400 md:text-lg">
                Request contact information, interact, and take the next steps
                toward your future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
        style={{
          background:
            "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)",
        }}
      ></div>
    </section>
  );
};

export default BdMarriage;
