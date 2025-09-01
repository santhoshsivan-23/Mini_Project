import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductForm.css";   // ✅ your CSS file

function ProductForm({ onProductAdded, onProductUpdated, editingProduct, clearEditing }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
  });

  const [orders, setOrders] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        image: null,
      });
    }
  }, [editingProduct]);

  // ✅ Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, formData);
        onProductUpdated(updated.product);
        clearEditing();
      } else {
        const newProduct = await addProduct(formData);
        onProductAdded(newProduct.product);
      }
      setFormData({ name: "", price: "", image: null });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // ✅ Helper: get last 6 orders (newest first) for each table
  const ordersForTable = (tableId) => {
    return orders
      .filter((order) => order.table_id === tableId)
      .slice(-6)        // last 6
      .reverse();       // newest first
  };

  const maxRows = Math.max(
    ...[1, 2, 3, 4, 5, 6].map((id) => ordersForTable(id).length),
    0
  );

  return (
    <div className="form-and-orders">
      
      {/* ---- Left side: Product Form ---- */}
      <div className="form-section">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              className="cancel-button"
              onClick={clearEditing}
            >
              Cancel
            </button>
          )}
        </form>

        <button onClick={() => navigate("/orders")} className="orders-button">
          Show Orders
        </button>
      </div>

      {/* ---- Right side: Orders Table ---- */}
      <div className="orders-table">
        <h2>Orders by Table</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <th key={id}>Table {id}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[1, 2, 3, 4, 5, 6].map((tableId) => {
                    const tableOrders = ordersForTable(tableId);
                    return (
                      <td key={tableId}>
                        {rowIndex < tableOrders.length
                          ? `Order #${tableOrders[rowIndex].id}`
                          : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
