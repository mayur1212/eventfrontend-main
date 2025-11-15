import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  useEffect(() => {
    if (!formData) navigate("/register");
  }, [formData, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert("Razorpay failed to load");

    const options = {
      key: "rzp_test_1234567890",
      amount: 50000,
      currency: "INR",
      name: "Event Registration",
      handler: () => navigate("/success", { state: formData }),
      prefill: {
        name: formData?.clientName,
        email: formData?.email,
        contact: formData?.contactNumber,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow flex items-center justify-center pt-32 pb-10 bg-gradient-to-b from-[#e8f1ff] to-white px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200">

          {/* ✅ Show event banner */}
          {formData?.eventImage && (
  <div className="w-40 h-40 mx-auto bg-white border rounded-lg flex items-center justify-center overflow-hidden mb-4 shadow">
    <img
      src={formData.eventImage}
      alt="Event Banner"
      className="w-full h-full object-contain"
    />
  </div>
)}


          <h2 className="text-2xl font-bold text-center text-[#0056ff] mb-5">
            Payment Summary
          </h2>

          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>Event:</strong> {formData?.eventName}</p>
            <p><strong>Client Name:</strong> {formData?.clientName}</p>
            <p><strong>Email:</strong> {formData?.email}</p>
            <p><strong>Phone:</strong> {formData?.contactNumber}</p>
            <p><strong>Venue:</strong> {formData?.venue}</p>
            <p><strong>City:</strong> {formData?.city}</p>
            <p><strong>Start Date:</strong> {formData?.startDate}</p>
            <p><strong>End Date:</strong> {formData?.endDate}</p>
            <div className="border-t pt-3 mt-3 text-lg font-semibold text-black">Total Amount: ₹5000</div>
          </div>

          <button
            onClick={makePayment}
            className="w-full mt-6 py-3 text-white rounded-lg bg-[#0056ff] font-bold shadow hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
