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
      <div className="p-4 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading payment history...</p>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load payment history.");
    return (
      <div className="p-4 min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Error loading payment history: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-10 py-24">
      <h2 className="text-3xl font-bold mb-6">My Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Email</th>
              <th className="border border-gray-300 p-4 text-left">
                Biodata Id
              </th>
              <th className="border border-gray-300 p-4 text-left">
                Total Price
              </th>
              <th className="border border-gray-300 p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => {
                const statusStyles =
                  payment.status === "success"
                    ? "bg-green-500 text-white px-2 py-1 rounded"
                    : "bg-yellow-500 text-white px-2 py-1 rounded";

                return (
                  <tr
                    key={payment._id}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-600"
                        : "bg-white dark:bg-gray-700"
                    }`}
                  >
                    <td className="border border-gray-300 p-4">
                      {payment.email || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-4">
                      {payment.biodataId || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-4">
                      ${payment.price?.toFixed(2) || "0.00"}
                    </td>
                    <td className="border border-gray-300 p-4">
                      <span className={statusStyles}>{payment.status}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
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
