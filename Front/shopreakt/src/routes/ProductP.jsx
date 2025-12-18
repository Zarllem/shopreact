import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import isEmpty from "../utils/isEmpty.js";
import Header from "../components/Header/header";
import "./ProductP.css";
import { useCart } from "../context/CartContext.js";

const SIZES = ["36", "36.5", "37", "38", "40", "41"];

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeSize, setActiveSize] = useState(SIZES[0]);
  const navigate = useNavigate();
  const [isBuy, setISBuy] = useState(false);
  const { addProduct, addCart, deleteProduct } = useCart();

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

  useEffect(() => {
    setIsLoad(true);
    const loadProduct = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7038/api/product/one?id=${id}`
        );
        setProduct(response.data);
        setIsLoad(false);
      } catch (er) {
        setIsError(true);
      }
    };
    if (!isEmpty(id)) loadProduct();
  }, [id]);

  if (isEmpty(id) || isError) {
    return <div className="loading">Товар не найден или произошла ошибка</div>;
  }

  if (isLoad || !product) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="product-page">
      <Header />

      <div className="product-page__container">
        {/* фото + точки */}
        <div className="product-media">
          <img
            src={product.image}
            alt={product.name}
            className="product-media__image"
          />
        </div>

        {/* карточка под фото */}
        <div className="product-main-card">
          <div className="product-main-card__top">
            <div className="product-price">
              {product.price.toLocaleString("ru-RU")} ₽
            </div>

            {product.scor !== undefined && (
              <div className="product-score-badge">
                {product.scor}
                <span className="product-score-badge__currency">₽</span>
              </div>
            )}
          </div>

          <div className="product-title">
            {product.name}
            {product.brand ? ` (${product.brand})` : ""}
          </div>

          <div className="product-sizes">
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setActiveSize(size)}
                className={
                  size === activeSize
                    ? "product-size product-size--active"
                    : "product-size"
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* описание */}
        <div className="product-description-card">
          <h3 className="product-description__title">Описание</h3>
          <p className="product-description__text">
            {product.description || "Описание скоро появится."}
          </p>
        </div>
        <button
          className={`product-back-btn-${!isBuy ? "black" : "white"}`}
          onClick={() => buy(id)}
        >
          {!isBuy ? "В корзину" : "В корзине"} <span className="icon">🛒</span>
        </button>

        <button
          onClick={() => navigate("/")}
          className="product-back-btn-black"
          type="button"
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
