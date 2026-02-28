import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => {
        // ✅ Safe total calculation
        const total = order.products.reduce((sum, item) => {
          if (!item.product) return sum;
          return sum + item.product.price * item.quantity;
        }, 0);

        return (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            <h4>Status: {order.status}</h4>
            <p>
              Date:{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <hr />

            {order.products.map((item) => {
              if (!item.product) return null; // ✅ Null safety

              return (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={item.product.image || "/images/default.jpg"}
                    alt={item.product.name}
                    width="60"
                    height="60"
                    style={{
                      borderRadius: "8px",
                      marginRight: "15px",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <p>
                      <strong>{item.product.name}</strong>
                    </p>
                    <p>
                      ₹{item.product.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}

            <hr />

            <h4>Total: ₹{total}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default MyOrders;