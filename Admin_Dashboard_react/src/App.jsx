// import React, { useEffect, useState } from "react";
// import { getProducts } from "./services/apiService";
// import ProductForm from "./components/ProductForm";
// import ProductList from "./components/ProductList";
// import OrdersPage from "./components/OrdersPage";
// import { Routes, Route } from "react-router-dom";
// import "./App.css"; // ✅ Add a CSS file for global styles

// function App() {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleProductAdded = (newProduct) => {
//     setProducts([...products, newProduct]);
//   };

//   const handleProductUpdated = (updatedProduct) => {
//     setProducts(
//       products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
//     );
//   };

//   const handleDelete = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//   };

//   const clearEditing = () => {
//     setEditingProduct(null);
//   };

//   return (
//     <div className="app-container">
//       <h1>Product Manager</h1>
//       <Routes>
//         {/* Home page → Products */}
//         <Route
//           path="/"
//           element={
//             <div>
//               <ProductForm
//                 onProductAdded={handleProductAdded}
//                 onProductUpdated={handleProductUpdated}
//                 editingProduct={editingProduct}
//                 clearEditing={clearEditing}
//               />
//               <ProductList
//                 products={products}
//                 onDelete={handleDelete}
//                 onEdit={handleEdit}
//               />
//             </div>
//           }
//         />

//         {/* Orders page */}
//         <Route path="/orders" element={<OrdersPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { getProducts } from "./services/apiService";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import OrdersPage from "./components/OrdersPage";
import { Routes, Route } from "react-router-dom";
import "./App.css"; // ✅ Import CSS

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const clearEditing = () => {
    setEditingProduct(null);
  };

  return (
    <div className="app-container">
      {/* 🔥 Admin Dashboard Heading */}
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ProductForm
                onProductAdded={handleProductAdded}
                onProductUpdated={handleProductUpdated}
                editingProduct={editingProduct}
                clearEditing={clearEditing}
              />
              <ProductList
                products={products}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          }
        />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
