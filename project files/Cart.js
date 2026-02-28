import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
  };

  const checkout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart([]);
      navigate("/my-orders");

    } catch (error) {
      console.error(error);
      alert("Checkout Failed ❌");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "15px"
          }}
        >
          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.name}
            width="120"
            style={{ borderRadius: "8px" }}
          />

          {/* DETAILS */}
          <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => increaseQty(item._id)}>+</button>
              <button onClick={() => decreaseQty(item._id)}>-</button>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button
            onClick={checkout}
            style={{
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;