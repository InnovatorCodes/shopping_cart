import { useNavigate } from "react-router-dom";

export default function OrderPlacedPage() {
  const navigate = useNavigate();
  const orderSuccess = (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#1DB954"
          d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
        ></path>
      </g>
    </svg>
  );
  const orderID = Math.floor(1000 + Math.random() * 9000);
  return (
    <div className="order-placed">
      {orderSuccess}
      <h2>Order Placed Successfully</h2>
      <div>
        <p>Your Order ID is #{orderID}.</p>
        <p>We’ve received your order and it will be processed shortly.</p>
        <p>Your items are expected to be delivered within 3–4 business days.</p>
        <p>Just Kidding. Thanks for Checking out my Website though.</p>
      </div>
      <button className="continue-shopping" onClick={() => navigate("/shop")}>
        Continue Shopping
      </button>
    </div>
  );
}
