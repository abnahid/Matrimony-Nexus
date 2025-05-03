/* eslint-disable no-unused-vars */
import Header from "@/Components/Header";
import ThemeContext from "@/context/ThemeContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";

const AllPayment = () => {
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useContext(ThemeContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch payments on component mount
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axiosSecure.get("/payments");
                setPayments(response.data);
            } catch (err) {
                setError("Failed to fetch payments. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [axiosSecure]);



    // Render table
    return (
        <div className={`p-6 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            <Header
                header="Payment History"
                title="Review all past transactions, track payment statuses, and maintain clear financial records."
            />
            <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-Primary"}`}>
                Payment History
            </h1>

            {loading ? (
                <p>Loading payments...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div
                    className={`overflow-x-auto rounded-lg border shadow-sm p-4 ${isDarkMode
                        ? "border-BgDarkAccent bg-BgDarkPrimary"
                        : "border-gray-300 bg-white"
                        }`}
                >
                    <table className={`table w-full ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                        <thead
                            className={`${isDarkMode ? "bg-BgDarkSecondary text-white" : "bg-gray-100 text-BgPrimary"
                                }`}
                        >
                            <tr>
                                <th>#</th>
                                <th>Biodata ID</th>
                                <th>Transaction ID</th>
                                <th>Customer Email</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => {
                                const rowBg =
                                    isDarkMode && index % 2 === 1 ? "bg-BgDarkAccent" : isDarkMode ? "bg-BgDarkSecondary" : "";

                                return (
                                    <tr key={payment.transactionId} className={rowBg}>
                                        <th>{index + 1}</th>
                                        <td>{payment.biodataId}</td>
                                        <td>{payment.transactionId}</td>
                                        <td>{payment.email || "N/A"}</td>
                                        <td>${Number(payment.price).toFixed(2)}</td>
                                        <td>
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${payment.status === "completed"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-yellow-500 text-white"
                                                    }`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


export default AllPayment;