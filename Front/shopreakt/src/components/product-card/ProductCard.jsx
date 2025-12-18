import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ id, image, price, name, brand, score }) => {
  const navigate = useNavigate();
  const { addProduct, addCart, deleteProduct } = useCart();
  const holdTimer = useRef(null);
  const [isBuy, setISBuy] = useState(false);

  const startHold = () => {
    holdTimer.current = setTimeout(() => {
      navigate(`/product/${id}`);
    }, 1000);
  };

  const cancelHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const buy = (id) => {
    if (isBuy === false) {
      setISBuy(true);
      addCart(1);
      addProduct(id);
    } else {
      setISBuy(false);
      addCart(-1);
      deleteProduct(id);
    }
  };

  return (
    <div className="card-m">
      <div
        className="card-image-wrapper"
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
      >
        {score !== undefined && (
          <div className="card-score-badge">
            {score}
            <span className="score-currency">₽</span>
          </div>
        )}
        <img src={image} alt={name} className="card-image" />
      </div>

      <div className="card-info">
        <div className="card-price">{price.toLocaleString("ru-RU")} ₽</div>
        <div className="card-title">
          {name}
          {brand ? ` (${brand})` : ""}
        </div>
      </div>

      <div className="card-actions">
        <button
          className={`btn-primary-${!isBuy ? "black" : "white"}`}
          onClick={() => buy(id)}
        >
          {!isBuy ? "В корзину" : "В корзине"} <span className="icon">🛒</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
