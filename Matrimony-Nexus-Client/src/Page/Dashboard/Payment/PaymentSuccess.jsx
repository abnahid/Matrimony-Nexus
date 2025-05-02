import { jsPDF } from "jspdf";
import { useLoaderData } from "react-router-dom";

const PaymentSuccess = () => {
    const payment = useLoaderData();

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();

        // Generate Invoice
        const total = payment.price;

        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("Invoice", 105, 20, null, null, "center");

        // Line under title
        doc.setLineWidth(0.5);
        doc.setDrawColor(36, 66, 120);
        doc.line(14, 25, 200, 25);

        // Order Summary
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text("Order Summary", 14, 35);

        doc.setFontSize(12);
        doc.text("Biodata Item:", 14, 45);
        doc.text(payment.itemInfo?.name || "Biodata Item", 100, 45);

        doc.text("Total:", 14, 75);
        doc.text(`${total.toLocaleString()} USD`, 100, 75);

        // Line under order summary
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 80, 200, 80);

        // Auction Details
        doc.setFontSize(14);
        doc.text("Biodata Details", 14, 90);

        doc.setFontSize(12);
        doc.text("Biodata ID:", 14, 100);
        doc.text(payment.biodataId || "N/A", 100, 100);

        doc.text("transaction ID:", 14, 130);
        doc.text(payment?.transactionId || "N/A", 100, 130);

        // Line under auction details
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 135, 200, 135);

        // Shipping Info
        doc.setFontSize(14);
        doc.text("Buyer Information", 14, 145);

        doc.setFontSize(12);
        doc.text(payment.buyerInfo?.name || "User", 14, 155);
        doc.text(payment.buyerInfo?.email || "user@example.com", 14, 165);

        // Line under shipping info
        doc.setLineWidth(0.5);
        doc.setDrawColor(200, 200, 200);
        doc.line(14, 175, 200, 175);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text("Matrimony Nexus", 14, 185);
        doc.text("support@matrimonynexus.com", 14, 190);
        doc.text("+880 1777-123456", 14, 195);

        // Footer Line
        doc.setLineWidth(0.5);
        doc.setDrawColor(36, 66, 120);
        doc.line(14, 200, 200, 200);

        doc.text("Price:", 14, 75);
        doc.text(`$${total.toFixed(2)}`, 100, 75);

        // Save PDF
        const filename = `invoice-${payment.transactionId}.pdf`;
        doc.save(filename);
    };

    return (
        <div className=" flex items-center justify-center bg-gray-100 p-4 pt-32">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold text-green-600 text-center">
                    Payment Successful
                </h1>
                <p className="text-center text-gray-600 mt-4">
                    Thank you for your payment!
                </p>
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-bold">Transaction ID:</span>
                        <span>{payment.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">Biodata ID:</span>
                        <span>{payment.biodataId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">Amount Paid:</span>
                        <span>${payment.price}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">Status:</span>
                        <span className="text-green-500 font-semibold">{payment.status}</span>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <button
                        onClick={handleDownloadInvoice}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Download Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;