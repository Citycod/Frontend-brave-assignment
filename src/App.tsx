import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [view, setView] = useState<"products" | "cart">("products");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-blue-600">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold text-white">E-Commerce Checkout</h1>
          <div>
            <button
              onClick={() => setView("products")}
              className={`mr-4 px-4 py-2 rounded ${view === "products" ? "bg-blue-800 text-white" : "bg-white text-blue-600"} transition-colors`}
            >
              Products
            </button>
            <button
              onClick={() => setView("cart")}
              className={`px-4 py-2 rounded ${view === "cart" ? "bg-blue-800 text-white" : "bg-white text-blue-600"} transition-colors`}
            >
              Cart
            </button>
          </div>
        </div>
      </nav>
      <main className="container p-4 mx-auto">
        {view === "products" ? <ProductList /> : <Cart userId="user123" />}
      </main>
    </div>
  );
}

export default App;