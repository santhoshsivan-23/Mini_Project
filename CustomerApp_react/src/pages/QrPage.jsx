import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";
import "./QrPage.css"; // ✅ import styles

export default function QrPage() {
  const tables = [1, 2, 3, 4, 5, 6];

  return (
    <div className="qr-container">
      <h2>Restaurant QR Codes</h2>
      <div className="qr-grid">
        {tables.map((id) => (
          <div key={id} className="qr-card">
            <p>Table {id}</p>
            <QRCodeCanvas value={`http://localhost:5173/menu/${id}`} size={150} />
            <br />
            <Link to={`/menu/${id}`}>Go to Table</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
