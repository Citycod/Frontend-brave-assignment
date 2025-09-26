# Shopping Cart Frontend
This is the frontend of the Shopping Cart application built with React (TypeScript + Vite).  
It connects to a Node.js/Express backend and allows users to view products, add items to their cart, and view their cart contents.

---

## 🚀 Features
- Product listing with images, names, and prices.  
- Add products to cart (sends data to backend API).  
- View cart with total price.  
- Error handling & loading states for better UX.  

---

## 🛠️ Tech Stack
- **React** with TypeScript  
- **Axios** for API calls  
- **Tailwind CSS** for styling  

---

## 📂 Project Structure
src/
├── components/
│ ├── ProductList.tsx # Product listing with Add to Cart
│ └── Cart.tsx # Displays cart items & total
├── App.tsx # Main entry point
└── main.tsx # React root

yaml
Copy code

---

## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd frontend
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm run dev
The app should now be running at http://localhost:5173 (default Vite port).

🌐 Backend API
This frontend expects a backend running on http://localhost:3000 with the following routes:
backend repo: https://github.com/Citycod/Backend-Brave-Assignment.git

POST /add-to-cart → Add item to user’s cart

GET /get-cart/:userId → Retrieve cart items

📸 Demo
Products list with add-to-cart button

Cart view with total price

✅
Then connect this repo to Vercel and deploy.

👨‍💻 Author
Edudje Wisdom Marvellous


