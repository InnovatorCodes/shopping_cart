import cartSVG from "../assets/cart.svg";
import userSVG from "../assets/userProfile.svg";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ active, user, setUser }) {
  const navigate = useNavigate();
  const loginBtn = (
    <button className="login-btn" onClick={() => navigate("/login")}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12H14.88"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.65 8.6499L16 11.9999L12.65 15.3499"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Login
    </button>
  );
  const logoutBtn = (
    <button
      className="logout-btn"
      onClick={() => {
        localStorage.removeItem("user");
        setUser(null);
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M15 12H3.62"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
      Logout
    </button>
  );
  return (
    <div className="header">
      <h1>LUNO</h1>
      <div className="links">
        <Link to="/">
          <div className={`link home ${active == "home" ? "active" : ""}`}>
            Home
          </div>
        </Link>
        <Link to="/shop">
          <div className={`link shop ${active == "shop" ? "active" : ""}`}>
            Shop
          </div>
        </Link>
      </div>
      <div className="buttons">
        <button
          className="cart"
          onClick={() => {
            if (user) navigate("/cart");
            else navigate("/login");
          }}
        >
          <img src={cartSVG} alt="cart" />
        </button>
        {user ? (
          <div className="user">
            <img src={userSVG} alt="User Profile" />
            <div className="profile-dropdown">
              {user.user_id != -1 ? (
                <>
                  <h2>Welcome, </h2>
                  <h3>{user.full_name}</h3>
                </>
              ) : (
                <>
                  <h3>You're currently signed in as a guest.</h3>
                </>
              )}
              {user.user_id != -1 ? logoutBtn : loginBtn}
            </div>
          </div>
        ) : (
          loginBtn
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  active: PropTypes.oneOf(["home", "shop"]).isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
