/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Cart.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  userId: string;
}

const Cart: React.FC<CartProps> = ({ userId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/get-cart/${userId}`);
        setCartItems(response.data.items || []);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching cart:", error);
        setError(error.response?.data?.message || "Failed to load cart.");
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between py-3 border-b"
              >
                <span className="font-semibold text-gray-800">{item.name}</span>
                <span className="text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;