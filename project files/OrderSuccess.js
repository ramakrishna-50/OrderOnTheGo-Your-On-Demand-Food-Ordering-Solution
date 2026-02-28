import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "green" }}>🎉 Order Placed Successfully!</h1>
      <p>Your delicious food is on the way 🚀</p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default OrderSuccess;