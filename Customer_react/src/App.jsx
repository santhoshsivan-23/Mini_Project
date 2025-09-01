// import { Routes, Route } from "react-router-dom";
// import MenuPage from "./pages/MenuPage";
// import OrderPage from "./pages/OrderPage";
// import QrPage from "./pages/QrPage";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<QrPage />} />
//       <Route path="/menu/:tableId" element={<MenuPage />} />
//       <Route path="/orders/:tableId" element={<OrderPage />} />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import QrPage from "./pages/QrPage";
import "./App.css"; // ✅ import CSS

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<QrPage />} />
        <Route path="/menu/:tableId" element={<MenuPage />} />
        <Route path="/orders/:tableId" element={<OrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
