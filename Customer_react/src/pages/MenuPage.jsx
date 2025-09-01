import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MenuPage.css"; // ✅ Import CSS

export default function MenuPage() {
  const { tableId } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch menu items
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
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
      const res = await fetch("http://127.0.0.1:8000/api/orders", {
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Header 1: Food Menu */}
      <header className="menu-header">
        <h1>Restaurant Menu</h1>
      </header>

      {/* Header 2: Table & Orders */}
      <header className="table-header">
        <span>Table {tableId}</span>
        <button
          className="orders-btn"
          onClick={() => navigate(`/orders/${tableId}`)}
        >
          Orders
        </button>
      </header>

      {/* Menu List */}
      {menu.length === 0 && <p>Loading menu...</p>}
      <div className="menu-grid">
        {menu.map((product) => (
          <div key={product.id} className="menu-card">
            {product.image && (
              <img
                src={`http://127.0.0.1:8000/storage/${product.image}`}
                alt={product.name}
                className="menu-image"
              />
            )}
            <p className="menu-name"><strong>{product.name}</strong></p>
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
          <>
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
          </>
        )}
      </div>

      {/* Fixed total bar */}
      {cart.length > 0 && (
        <div className="total-bar">
          <p><strong>Total: ₹{total}</strong></p>
          <button onClick={placeOrder} className="place-order-btn">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
