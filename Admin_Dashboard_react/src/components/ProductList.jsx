import React from "react";
import { deleteProduct } from "../services/apiService";
import "./ProductList.css"; // ✅ Import CSS for styling

function ProductList({ products, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          {product.image && (
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              alt={product.name}
            />
          )}
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <div className="product-actions">
            <button onClick={() => onEdit(product)} className="edit-btn">
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
