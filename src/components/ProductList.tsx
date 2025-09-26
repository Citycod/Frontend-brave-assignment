/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    price: 999.99,
    image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "2",
    name: "Smartphone",
    price: 499.99,
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "3",
    name: "Headphones",
    price: 79.99,
    image: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

const ProductList: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [errorStates, setErrorStates] = useState<{ [key: string]: string | null }>({});

  const addToCart = async (productId: string) => {
  setLoadingStates((prev) => ({ ...prev, [productId]: true }));
  setErrorStates((prev) => ({ ...prev, [productId]: null }));

  const product = products.find((p) => p.id === productId);
  if (!product) return;

  try {
    const response = await axios.post("http://localhost:3000/add-to-cart", {
      userId: "user123",
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    alert(`Added ${product.name} to cart!`);
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    const errorMessage =
      error.response?.data?.message || "Failed to add item to cart.";
    setErrorStates((prev) => ({ ...prev, [productId]: errorMessage }));
  } finally {
    setLoadingStates((prev) => ({ ...prev, [productId]: false }));
  }
};

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Our Products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-48 mb-4 rounded-md"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/300x200?text=Image+Not+Found";
              }}
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            {errorStates[product.id] && (
              <p className="mt-2 text-sm text-red-500">{errorStates[product.id]}</p>
            )}
            <button
              onClick={() => addToCart(product.id)}
              disabled={loadingStates[product.id]}
              className={`mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200`}
            >
              {loadingStates[product.id] ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;