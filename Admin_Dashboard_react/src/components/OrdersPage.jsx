// import React, { useEffect, useState } from "react";
// import { getOrders } from "../services/apiService";
// import "./OrdersPage.css";   // ✅ CSS import

// function OrdersPage() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getOrders();
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };
//     fetchOrders();
//   }, []);

//   return (
//     <div className="orders-container">
//       <h2>Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <ul>
//           {orders.map((order) => (
//             <li key={order.id}>
//               <h4>
//                 Order #{order.id}{" "}
//                 {order.table_id && <span>(Table {order.table_id})</span>}
//               </h4>

//               {/* Show order status */}
//           <div className="status-row">
//   <span className="status-label">Status:</span>
//   <span className={`status ${order.status}`}>{order.status}</span>
// </div>


//               <ul>
//                 {order.items.map((item) => (
//                   <li key={item.id}>
//                     {item.product?.name} × {item.quantity} ={" "}
//                     {(Number(item.product?.price) * Number(item.quantity)).toFixed(2)}
//                   </li>
//                 ))}
//               </ul>

//               <strong>
//                 Total:{" "}
//                 {order.items
//                   .reduce(
//                     (sum, item) =>
//                       sum + Number(item.product?.price) * Number(item.quantity),
//                     0
//                   )
//                   .toFixed(2)}
//               </strong>
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default OrdersPage;


import React, { useEffect, useState } from "react";
import { getOrders } from "../services/apiService";
import "./OrdersPage.css"; // ✅ CSS import

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4>
                Order #{order.id}{" "}
                {order.table_id && <span>(Table {order.table_id})</span>}
              </h4>

              {/* Show order status */}
              <div className="status-row">
                <span className="status-label">Status:</span>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>

              <ul className="items-list">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product?.name} × {item.quantity} ={" "}
                    {(
                      Number(item.product?.price) * Number(item.quantity)
                    ).toFixed(2)}
                  </li>
                ))}
              </ul>

              <strong className="total">
                Total:{" "}
                {order.items
                  .reduce(
                    (sum, item) =>
                      sum +
                      Number(item.product?.price) * Number(item.quantity),
                    0
                  )
                  .toFixed(2)}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
