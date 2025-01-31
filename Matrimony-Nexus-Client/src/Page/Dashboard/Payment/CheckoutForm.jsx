import { AuthContext } from "@/context/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ biodataId, planName, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    const card = elements.getElement(CardElement);

    if (!card) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card Details",
        text: "Please enter valid card information.",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const {
        data: { clientSecret },
      } = await axiosSecure.post("/create-payment-intent", { price });

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          email: user?.email || "anonymous",
        },
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message,
        });
        setIsProcessing(false);
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        Swal.fire({
          icon: "error",
          title: "Payment Confirmation Failed",
          text: confirmError.message,
        });
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          biodataId,
          planName,
          email: user.email,
          transactionId: paymentIntent.id,
          price,
          status: "completed",
        };

        await axiosSecure.post("/payments", paymentData);

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Your transaction ID: ${paymentIntent.id}`,
        });

        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-6">
        Checkout for {planName} Plan
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Biodata ID
        </label>
        <input
          type="text"
          value={biodataId}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Total Amount
        </label>
        <input
          type="text"
          value={`$${price.toFixed(2)}`}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100"
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full text-white py-2 rounded-lg ${
          isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-custom-gradient"
        } transition hover:bg-BgPrimary`}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
