import { Link } from "react-router-dom";

export default function BookingSuccess() {
  return (
    <section className="flex flex-col items-center mt-10 text-center">
      <div className="mt-20 mb-6">
        <h1 className="text-3xl font-bold text-green-600">🎉 Booking Confirmed!</h1>
        <p className="mt-4 text-gray-700">Your booking is complete.</p>
      </div>

      <Link
        to="/home"
        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </section>
  );
}
