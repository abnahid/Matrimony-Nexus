const MembershipPlans = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "Free",
      features: [
        "Create Profile",
        "Search Matches",
        "View Profiles",
        "Limited Contact Access",
      ],
      buttonLabel: "Get Started",
      buttonLink: "/biodatas",
    },
    {
      name: "Premium Plan",
      price: "$25/month",
      features: [
        "All Basic Features",
        "Unlimited Contact Access",
        "Priority Listing",
        "Chat with Matches",
      ],
      buttonLabel: "Subscribe Now",
      buttonLink: "/membership-plans-page",
    },
    {
      name: "Elite Plan",
      price: "$50/month",
      features: [
        "All Premium Features",
        "Dedicated Matchmaker",
        "Exclusive Matches",
        "Personalized Support",
      ],
      buttonLabel: "Subscribe Now",
      buttonLink: "/membership-plans-page",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Membership Plans</h2>
          <p className="text-gray-600 mt-4">
            Choose the plan that suits your needs and start your journey today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-BgPrimary mb-6">
                {plan.price}
              </p>
              <ul className="text-gray-600 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.buttonLink}
                className="inline-block px-6 py-3 text-white bg-custom-gradient rounded-md hover:bg-BgSecondary"
              >
                {plan.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
