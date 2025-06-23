import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-extrabold text-indigo-600 drop-shadow-lg">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-900">Page Not Found</p>
      <p className="mt-2 text-lg text-gray-600 text-center max-w-md">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
