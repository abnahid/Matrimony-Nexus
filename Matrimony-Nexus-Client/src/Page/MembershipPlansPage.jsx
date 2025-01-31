import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./Dashboard/Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const MembershipPlansPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Basic",
      price: 5.0,
      features: ["Access limited profiles", "Basic support"],
    },
    {
      name: "Premium",
      price: 15.0,
      features: ["Access all profiles", "Priority support", "Enhanced search"],
    },
    {
      name: "Elite",
      price: 30.0,
      features: [
        "Access all profiles",
        "Priority support",
        "Enhanced search",
        "Personalized matchmaking assistance",
      ],
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-32">
      <div className="max-w-5xl w-full rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Membership Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all ${
                selectedPlan?.name === plan.name
                  ? "border-BgPrimary"
                  : "border-gray-300"
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">
                {plan.name} Plan
              </h3>
              <p className="text-4xl font-bold text-center text-BgPrimary mb-4">
                ${plan.price}
              </p>
              <ul className="text-sm text-gray-600 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-BgPrimary">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <button
                  className={`px-4 py-2 rounded-lg text-white transition-all ${
                    selectedPlan?.name === plan.name
                      ? "bg-BgPrimary hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={selectedPlan?.name !== plan.name}
                >
                  {selectedPlan?.name === plan.name
                    ? "Selected"
                    : "Select Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-8">
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
