import React from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        <div className="success-icon-wrapper">
          <div className="success-icon-circle-outer">
            <div className="success-icon-circle-middle">
              <div className="success-icon-circle-inner">
                <svg
                  className="success-checkmark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <h1 className="success-title">Ваш заказ оформлен</h1>
        <p className="success-subtitle">
          В ближайшее время с вами свяжется менеджер
        </p>

        <button
          type="button"
          className="back-to-home-btn"
          onClick={() => navigate("/")}
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
