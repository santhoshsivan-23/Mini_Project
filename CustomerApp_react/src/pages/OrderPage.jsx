// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function OrderPage() {
//   const { tableId } = useParams();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/orders?table_id=${tableId}`)
//       .then((res) => res.json())
//       .then((data) => setOrders(data));
//   }, [tableId]);

//   return (
//     <div>
//       <h2>Orders for Table {tableId}</h2>
//       {orders.length === 0 && <p>No orders yet.</p>}

//       {orders.map((order) => (
//         <div key={order.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
//           <p>Order #{order.id} - Status: {order.status}</p>
//           <ul>
//             {order.items.map((item) => (
//               <li key={item.id}>
//                 {item.product?.name} × {item.quantity} = ₹
//                 {item.product?.price * item.quantity}
//               </li>
//             ))}
//           </ul>
//           <p>
//             <strong>
//               Total: ₹
//               {order.items.reduce(
//                 (sum, item) => sum + item.product?.price * item.quantity,
//                 0
//               )}
//             </strong>
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderPage() {
  const { tableId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://13.61.174.186:8000/api/orders?table_id=${tableId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [tableId]);

  return (
    <div>
      <h2>Orders for Table {tableId}</h2>
      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>
            Order #{order.id} - Status:{" "}
            <strong>{order.status || "Pending"}</strong>
          </p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.product?.name} × {item.quantity} = ₹
                {item.product?.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>
            <strong>
              Total: ₹
              {order.items.reduce(
                (sum, item) => sum + (item.product?.price || 0) * item.quantity,
                0
              )}
            </strong>
          </p>
        </div>
      ))}
    </div>
  );
}
