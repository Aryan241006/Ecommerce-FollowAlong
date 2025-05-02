import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform transition hover:scale-105">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-600">
            ${product.price}
          </span>
          <button
            onClick={() => navigate(`/edit-product/${product._id}`)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
          >
            Edit
          </button>
          <Link to={`/product/${product._id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
