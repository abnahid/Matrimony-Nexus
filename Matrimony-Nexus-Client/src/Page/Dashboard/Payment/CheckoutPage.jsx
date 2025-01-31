import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckoutPage = () => {
  const { biodataId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-32">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Request Contact Information
        </h2>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="flex-1 bg-gray-50 rounded-lg p-6 border">
            <div className="mb-6">
              <h1 className="text-lg font-bold">Biodata Contact</h1>
              <p className="text-sm text-gray-600">
                Pay $5 to request contact details
              </p>
            </div>

            {/* Price Section */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-4xl font-bold text-gray-800">$5</h2>
              <p className="text-sm text-gray-600">Biodata Name: Sample Name</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Digital subscription</p>
              <div className="flex justify-between items-center">
                <p>Qty 1</p>
                <p>$5</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Subtotal</p>
              <div className="flex justify-between items-center">
                <p>$5</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">IVA: 0%</p>
              <div className="flex justify-between items-center">
                <p>$0.00</p>
              </div>
              <p className="text-xs text-gray-400">
                No tax because reverse charge applies
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-bold">Total due today</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">$5</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                biodataId={biodataId}
                planName="Premium"
                price={5.0}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
