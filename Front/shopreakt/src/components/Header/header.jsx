import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { user, balance } = useUser();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="user-info">
        <div
          className="user-avatar"
          onClick={() => {
            navigate("/account");
          }}
        >
          <img src={"images/default-avatar.png"} alt={user.name} />
        </div>
        <div className="user-name">
          <span>Привет,</span> {user.username}
        </div>
      </div>

      <div
        className="cart-info"
        onClick={() => {
          navigate("/cart");
        }}
      >
        <span className="cart-amount">{balance.toLocaleString("ru-RU")} ₽</span>
        <span className="cart-icon">🛒</span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </header>
  );
};

export default Header;
