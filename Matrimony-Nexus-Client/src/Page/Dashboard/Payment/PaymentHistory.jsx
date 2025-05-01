import Header from "@/Components/Header";
import { AuthContext } from "@/context/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">Loading payment history...</p>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load payment history.");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">
          Error loading payment history: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Header
        header="Payment History"
        title="Review all past transactions, track payment statuses, and maintain clear financial records."
      />

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-left font-semibold">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Biodata ID</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.length > 0 ? (
              payments.map((payment, index) => {
                const statusStyles =
                  payment.status === "success"
                    ? "bg-green-500 text-white px-2 py-1 rounded text-xs"
                    : "bg-yellow-500 text-white px-2 py-1 rounded text-xs";

                return (
                  <tr
                    key={payment._id}
                    className={`hover:bg-gray-50 transition duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-6 py-4">{payment.email || "N/A"}</td>
                    <td className="px-6 py-4">{payment.biodataId || "N/A"}</td>
                    <td className="px-6 py-4">${payment.price?.toFixed(2) || "0.00"}</td>
                    <td className="px-6 py-4">
                      <span className={statusStyles}>{payment.status}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
