
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./MenuPage.css";

// export default function MenuPage() {
//   const { tableId } = useParams();
//   const navigate = useNavigate();

//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);

//   const API_BASE_URL = "http://13.61.174.186:8000/api"; // ✅ Backend API
//   const STORAGE_URL = "http://13.61.174.186:8000/storage"; // ✅ For images

//   // Fetch menu items
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/products`)
//       .then((res) => res.json())
//       .then((data) => setMenu(data))
//       .catch((err) => console.error("Error fetching menu:", err));
//   }, []);

//   // Add product to cart
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find((item) => item.id === product.id);
//       if (existing) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Increment / Decrement
//   const increment = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decrement = (id) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   // Place order
//   const placeOrder = async () => {
//     if (cart.length === 0) return;

//     const payload = {
//       table_id: tableId,
//       items: cart.map((item) => ({
//         product_id: item.id,
//         quantity: item.quantity,
//       })),
//     };

//     try {
//       const res = await fetch(`${API_BASE_URL}/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert("Order placed successfully!");
//         setCart([]);
//         navigate(`/orders/${tableId}`);
//       } else {
//         alert("Failed to place order");
//       }
//     } catch (err) {
//       console.error("Error placing order:", err);
//     }
//   };

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div>
//       {/* Navbar */}
//       <header className="menu-header" style={{ backgroundColor: "#FFA726", color: "white", padding: "12px", textAlign: "center" }}>
//         <h1>Restaurant Menu</h1>
//         <p style={{ margin: "4px 0", fontWeight: "bold" }}>Table {tableId}</p>
//       </header>

//       {/* Menu List */}
//       {menu.length === 0 && <p style={{ textAlign: "center" }}>Loading menu...</p>}
//       <div className="menu-grid">
//         {menu.map((product) => (
//           <div key={product.id} className="menu-card">
//             {product.image && (
//               <img
//                 src={`${STORAGE_URL}/${product.image}`}
//                 alt={product.name}
//                 className="menu-image"
//               />
//             )}
//             <p className="menu-name">
//               <strong>{product.name}</strong>
//             </p>
//             <p className="menu-price">₹{product.price}</p>
//             <button onClick={() => addToCart(product)} className="add-btn">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Cart */}
//       <div className="cart-container">
//         <h3>🛒 Cart</h3>
//         {cart.length === 0 ? (
//           <p>No items in cart</p>
//         ) : (
//           <ul>
//             {cart.map((item) => (
//               <li key={item.id} className="cart-item">
//                 <span>{item.name}</span>
//                 <div className="qty-controls">
//                   <button onClick={() => decrement(item.id)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increment(item.id)}>+</button>
//                 </div>
//                 <span>₹{item.price * item.quantity}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Fixed total bar */}
//       {cart.length > 0 && (
//         <div className="total-bar" style={{ backgroundColor: "#AED581", padding: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "fixed", bottom: 0, width: "100%" }}>
//           <p>
//             <strong>Total: ₹{total}</strong>
//           </p>
//           <button onClick={placeOrder} className="place-order-btn">
//             Place Order
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MenuPage.css";

export default function MenuPage() {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  const API_BASE_URL = "http://13.61.174.186:8000/api"; // ✅ Backend API
  const STORAGE_URL = "http://13.61.174.186:8000/storage"; // ✅ For images

  // Fetch menu items
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Increment / Decrement
  const increment = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Place order
  const placeOrder = async () => {
    if (cart.length === 0) return;

    const payload = {
      table_id: tableId,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Order placed successfully!");
        setCart([]);
        navigate(`/orders/${tableId}`);
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {/* Navbar */}
      <header className="menu-header" style={{ backgroundColor: "#FFA726", color: "white", padding: "12px", textAlign: "center" }}>
        <h1>Restaurant Menu</h1>
        <p style={{ margin: "4px 0", fontWeight: "bold" }}>Table {tableId}</p>
      </header>

      {/* Menu List */}
      {menu.length === 0 && <p style={{ textAlign: "center" }}>Loading menu...</p>}
      <div className="menu-grid">
        {menu.map((product) => (
          <div key={product.id} className="menu-card">
            {product.image && (
              <img
                src={`${STORAGE_URL}/${product.image}`}
                alt={product.name}
                className="menu-image"
              />
            )}
            <p className="menu-name">
              <strong>{product.name}</strong>
            </p>
            <p className="menu-price">₹{product.price}</p>
            <button onClick={() => addToCart(product)} className="add-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="cart-container">
        <h3>🛒 Cart</h3>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <div className="qty-controls">
                  <button onClick={() => decrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increment(item.id)}>+</button>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Fixed total bar */}
      {cart.length > 0 && (
        <div className="total-bar" >
          <p>
            <strong>Total: ₹{total}</strong>
          </p>
          <button onClick={placeOrder} className="place-order-btn">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
