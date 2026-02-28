import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ cart, setCart, search }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/restaurants");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Search Filter Logic
  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(search?.toLowerCase() || "")
  );

  // ✅ Add To Cart Function (temporary – later we remove for restaurants)
  // eslint-disable-next-line no-unused-vars
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Popular Restaurants</h2>

      {/* ✅ GRID START */}
      <div className="product-grid">
        {filteredProducts.map((item) => (
          <div key={item._id} className="product-card">

            {/* ✅ Restaurant Image */}
            <img
              src={item.image}
              alt={item.name}
              className="product-image"
            />

            <h3>{item.name}</h3>

            {/* ⭐ Rating */}
            <p className="price">⭐ {item.rating}</p>

            {/* 🍽 Cuisine */}
            <p className="description">{item.cuisine}</p>

            {/* ⏱ Delivery Time */}
            <p className="description">{item.deliveryTime}</p>

            {/* Temporary Button (later change to View Menu) */}
            <button
              className="add-btn"
              onClick={() => navigate(`/restaurant/${item._id}`)}
            >
              View Menu
            </button>

          </div>
        ))}
      </div>
      {/* ✅ GRID END */}
    </div>
  );
}

export default Home;