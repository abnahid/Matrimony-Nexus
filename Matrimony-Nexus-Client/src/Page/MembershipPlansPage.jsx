import ThemeContext from "@/context/ThemeContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./Dashboard/Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MembershipPlansPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);

  const plans = [
    {
      name: "Basic",
      price: 0.0,
      features: [
        "Create Profile",
        "Search Matches",
        "View Profiles",
        "Limited Contact Access",
      ],
    },
    {
      name: "Premium",
      price: 25.0,
      features: [
        "All Basic Features",
        "Unlimited Contact Access",
        "Priority Listing",
        "Chat with Matches",
      ],
    },
    {
      name: "Elite",
      price: 50.0,
      features: [
        "All Premium Features",
        "Dedicated Matchmaker",
        "Exclusive Matches",
        "Personalized Support",
      ],
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div
      className={`flex items-center justify-center p-4 pt-20 ${isDarkMode ? "bg-BgDarkPrimary text-gray-200" : "bg-gray-50 text-gray-900"
        }`}
    >
      <div
        className={`max-w-5xl w-full rounded-lg p-8 md:p-12 ${isDarkMode ? "bg-BgDarkSecondary text-gray-300" : "bg-white"
          }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Membership Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border shadow-md rounded-lg p-8 text-center cursor-pointer hover:shadow-lg transition-all ${selectedPlan?.name === plan.name
                  ? isDarkMode
                    ? "border-BgDarkAccent"
                    : "border-BgPrimary"
                  : isDarkMode
                    ? "border-gray-700"
                    : "border-gray-300"
                }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <h3
                className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
              >
                {plan.name} Plan
              </h3>
              <p
                className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-BgDarkAccent" : "text-BgPrimary"
                  }`}
              >
                {plan.price === 0 ? "Free" : `$${plan.price}/month`}
              </p>
              <ul className="mb-6">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    <span
                      className={`mr-2 ${isDarkMode ? "text-BgDarkAccent" : "text-BgPrimary"
                        }`}
                    >
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <button
                  className={`px-4 py-2 rounded-lg text-white transition-all ${selectedPlan?.name === plan.name
                      ? isDarkMode
                        ? "bg-BgDarkAccent hover:bg-BgDarkPrimary"
                        : "bg-BgPrimary hover:bg-indigo-700"
                      : isDarkMode
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  disabled={selectedPlan?.name !== plan.name}
                >
                  {selectedPlan?.name === plan.name
                    ? plan.price === 0
                      ? "Get Started"
                      : "Selected"
                    : "Select Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPlan && selectedPlan.price > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Complete Your Payment for {selectedPlan.name} Plan
            </h3>
            <div className="max-w-lg mx-auto">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  planName={selectedPlan.name}
                  price={selectedPlan.price}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipPlansPage;