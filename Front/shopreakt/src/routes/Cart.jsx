import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import isEmpty from "../utils/isEmpty";
import "./Cart.css";
import qs from "qs";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const CartPage = () => {
  const { balance } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const {
    getAllProducts,
    getCountById,
    deleteProduct,
    addCount,
    reduceCount,
    clearAll,
    addCart,
    resetCart,
  } = useCart();

  const [products, setProducts] = useState([]);
  const [showBalanceError, setShowBalanceError] = useState(false);

  const loadProducts = async () => {
    const ids = getAllProducts().map((p) => p.id);
    if (!ids.length) {
      setProducts([]);
      return;
    }

    const response = await axios.get(
      "https://localhost:7038/api/Product/CartProducts",
      {
        params: { ids },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      }
    );
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id);
    loadProducts();
  };

  const handleAddCount = (id) => {
    addCount(id);
    loadProducts();
  };

  const handleReduceCount = (id) => {
    reduceCount(id);
    loadProducts();
  };

  const _clear = () => {
    clearAll();
    resetCart();
    loadProducts();
  };
  const handleCheckout = () => {
    if (total <= balance) {
      _clear();
      navigate("/order");
      setShowBalanceError(false);
    } else {
      setShowBalanceError(true);
    }
  };

  const total = products.reduce(
    (acc, cur) => acc + cur.price * getCountById(cur.id),
    0
  );

  const isInsufficientBalance = total > balance;

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <h1 className="cart-title">Состав заказа</h1>

        {products.length === 0 && (
          <div className="cart-empty">В корзине пока нет товаров</div>
        )}

        <div className="cart-list">
          {products.map((p) => {
            const count = getCountById(p.id);

            return (
              <div className="cart-item" key={p.id}>
                <div className="cart-item__image-wrapper">
                  <img
                    src={p.image || "/images/кроссы.jpg"}
                    alt={p.name}
                    className="cart-item__image"
                  />
                </div>

                <div className="cart-item__info">
                  <div className="cart-item__row">
                    <span className="cart-item__price">
                      {p.price.toLocaleString("ru-RU")} ₽
                    </span>
                    <span className="cart-item__qty">× {count} шт</span>
                  </div>
                  <div className="cart-item__name">
                    {p.name}
                    {p.brand ? ` ${p.brand}` : ""}
                  </div>
                  {!isEmpty(p.description) && (
                    <div className="cart-item__desc">{p.description}</div>
                  )}

                  <div className="cart-item__controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleReduceCount(p.id)}
                      disabled={count <= 1}
                    >
                      –
                    </button>
                    <span className="qty-value">{count}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleAddCount(p.id)}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="cart-item__delete"
                      onClick={() => handleDelete(p.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-total">
          Баланс:{" "}
          <span className="cart-total__value">
            {balance.toLocaleString("ru-RU")} ₽
          </span>
        </div>

        <div className="cart-total">
          Итого:{" "}
          <span className="cart-total__value">
            {total.toLocaleString("ru-RU")} ₽
          </span>
        </div>

        {products.length > 0 && (
          <>
            <button
              type="button"
              className={`cart-checkout-btn ${
                isInsufficientBalance ? "insufficient-balance" : ""
              }`}
              onClick={handleCheckout}
            >
              Оформить заказ
            </button>
            {showBalanceError && isInsufficientBalance && (
              <div className="balance-error">Не хватает баланса</div>
            )}
            <button
              type="button"
              className="cart-cancel-btn"
              onClick={() => _clear()}
            >
              Отменить заказ
            </button>
          </>
        )}
        <button
          type="button"
          className="cart-cancel-btn"
          onClick={() => navigate("/")}
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default CartPage;
