import Header from "@/Components/Header";
import LottieLoding from "@/Components/LottieLoding";
import { AuthContext } from "@/context/AuthProvider";
import ThemeContext from "@/context/ThemeContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useContext(ThemeContext);
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

  // Show error toast only when there's an error
  useEffect(() => {
    if (isError) {
      toast.error("Failed to load payment history.");
    }
  }, [isError]);

  if (isLoading) {
    return <LottieLoding />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">
          Error loading payment history: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      <Header
        header="Payment History"
        title="Review all past transactions, track payment statuses, and maintain clear financial records."
      />

      <div
        className={`overflow-x-auto rounded-lg border shadow ${isDarkMode
          ? 'border-BgDarkAccent bg-BgDarkPrimary'
          : 'border-gray-300 bg-white'
          }`}
      >
        <table
          className={`min-w-full divide-y text-sm ${isDarkMode
            ? 'divide-gray-700 text-gray-200'
            : 'divide-gray-200 text-gray-700'
            }`}
        >
          <thead
            className={`text-left font-semibold ${isDarkMode ? 'bg-BgDarkSecondary text-gray-100' : 'bg-gray-100'
              }`}
          >
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Biodata ID</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody
            className={`${isDarkMode ? 'divide-gray-800' : 'divide-gray-200'
              }`}
          >
            {payments.length > 0 ? (
              payments.map((payment, index) => {
                if (!payment) return null;

                const status = payment?.status || "pending";
                const statusStyles =
                  status === "completed"
                    ? "bg-green-500 text-white px-2 py-1 rounded text-xs"
                    : "bg-yellow-500 text-white px-2 py-1 rounded text-xs";

                const formattedPrice = Number(payment?.price)?.toFixed(2) || "0.00";

                const rowBg = isDarkMode
                  ? index % 2 === 0
                    ? "bg-BgDarkSecondary"
                    : "bg-BgDarkAccent"
                  : index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50";

                return (
                  <tr
                    key={payment._id || index}
                    className={`${rowBg} hover:bg-opacity-80 transition duration-150`}
                  >
                    <td className="px-6 py-4">{payment.email || "N/A"}</td>
                    <td className="px-6 py-4">{payment.biodataId || "N/A"}</td>
                    <td className="px-6 py-4">${formattedPrice}</td>
                    <td className="px-6 py-4">
                      <span className={statusStyles}>{status}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No payment records found.
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
