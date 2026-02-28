import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RestaurantMenu({ cart, setCart }) {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchRestaurant();
    fetchItems();
  }, []);

  const fetchRestaurant = async () => {
    const res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
    setRestaurant(res.data);
  };

  const fetchItems = async () => {
    const res = await axios.get(`http://localhost:5000/api/products?restaurant=${id}`);
    setItems(res.data);
  };

  // ✅ ADD TO CART FUNCTION
  const addToCart = (item) => {
    const existing = cart.find((i) => i._id === item._id);

    if (existing) {
      const updatedCart = cart.map((i) =>
        i._id === item._id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  if (!restaurant) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h2>{restaurant.name}</h2>
      <p>⭐ {restaurant.rating} • {restaurant.deliveryTime}</p>

      <hr />

      <h3>MENU</h3>

      <div className="product-grid">
        {items.map((item) => (
          <div key={item._id} className="product-card">
            <img
              src={item.image}
              alt={item.name}
              className="product-image"
            />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>₹ {item.price}</p>

            {/* ✅ CONNECTED ADD BUTTON */}
            <button
              className="add-btn"
              onClick={() => addToCart(item)}
            >
              Add
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;