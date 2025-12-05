import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qrImage from "../assets/qr-sample.png";
function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;
  const bus = state?.bus;
  const totalFare = state?.totalFare;

  const [seconds, setSeconds] = useState(15);

  // ⏳ Timer
  useEffect(() => {
    if (seconds === 0) {
      navigate("/payment-success", { state: { booking, bus } });
      return;
    }
    const t = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Scan QR to Pay</h1>

        <img
          src={qrImage}
          alt="QR Code"
          className="w-64 h-64 mx-auto border p-2 rounded-xl"
        />

        <p className="text-lg mt-4 font-semibold text-green-600">
          Amount: ₹{totalFare}
        </p>

        <p className="mt-4 text-gray-700 text-sm">
          QR will expire in:
          <span className="font-bold text-red-600"> {seconds}s</span>
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
            Pay with PhonePe
          </button>

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold">
            Pay with Google Pay
          </button>

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold">
            Pay with Paytm
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
