import { useUser } from "../contexts/UserContext";

export const ListingCard = ({ listing }) => {
  const { user } = useUser();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
      {listing.images && listing.images.length > 0 ? (
        <img
          className="w-full h-48 object-cover"
          src={listing.images[0]}
          alt={listing.title}
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
      )}

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>

          {/* Show status tag only if not a customer */}
          {user?.role !== "Customer" && (
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                listing.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {listing.isActive ? "Active" : "Inactive"}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{listing.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">
              ${listing.pricePerNight?.Single || 0}
            </p>
            <p className="text-xs text-gray-500">Per night (Single)</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              ${listing.pricePerNight?.Double || 0}
            </p>
            <p className="text-xs text-gray-500">Per night (Double)</p>
          </div>

          {/* Show total revenue only if not a customer */}
          {user?.role !== "Customer" && (
            <div>
              <p className="text-sm font-medium text-gray-900">
                ${listing.totalRevenue?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-gray-500">Total Revenue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
