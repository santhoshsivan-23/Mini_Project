

// import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:8000/api";

// export const getProducts = async () => {
//   const response = await axios.get(`${API_BASE_URL}/products`);
//   return response.data;
// };

// export const addProduct = async (productData) => {
//   const formData = new FormData();
//   formData.append("name", productData.name);
//   formData.append("price", productData.price);
//   if (productData.image) {
//     formData.append("image", productData.image);
//   }

//   const response = await axios.post(`${API_BASE_URL}/products`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// export const updateProduct = async (id, productData) => {
//   const formData = new FormData();
//   formData.append("name", productData.name);
//   formData.append("price", productData.price);
//   if (productData.image) {
//     formData.append("image", productData.image);
//   }

//   const response = await axios.post(`${API_BASE_URL}/products/${id}?_method=PUT`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// export const deleteProduct = async (id) => {
//   const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
//   return response.data;
// };

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// 🛒 Products
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const addProduct = async (productData) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price);
  if (productData.image) {
    formData.append("image", productData.image);
  }

  const response = await axios.post(`${API_BASE_URL}/products`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price);
  if (productData.image) {
    formData.append("image", productData.image);
  }

  // using _method=PUT for Laravel compatibility
  const response = await axios.post(
    `${API_BASE_URL}/products/${id}?_method=PUT`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// 🧾 Orders
export const getOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};
