/* eslint-disable no-unused-vars */
import Header from "@/Components/Header";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AllPayment = () => {
    const axiosSecure = useAxiosSecure();

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
        <div className="p-6">
            <Header
                header={"Payment History"}
                title={
                    "Review all past transactions, track payment statuses, and maintain clear financial records."
                }

            />
            <h1 className="text-2xl font-bold mb-6 text-Primary">Payment History</h1>
            {loading ? (
                <p>Loading payments...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm bg-white p-4">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-BgPrimary">#</th>
                                <th className="text-BgPrimary">Biodata ID</th>
                                <th className="text-BgPrimary">Transaction ID</th>
                                <th className="text-BgPrimary">Customer Email</th>
                                <th className="text-BgPrimary">Amount</th>
                                <th className="text-BgPrimary">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.transactionId}>
                                    <th>{index + 1}</th>
                                    <td>{payment.biodataId}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.email || "N/A"}</td>
                                    <td>{payment.price}</td>

                                    <td>{payment.status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllPayment;