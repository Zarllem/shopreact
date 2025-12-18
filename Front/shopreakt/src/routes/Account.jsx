import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Account.css";
import { useUser } from "../context/UserContext";

const AccountPage = () => {
  const { user, isLoading, balance, loadUser, score } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fio, setFio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isLoading || !user) return;
    setUsername(user.username || "");
    setFio(user.fio || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
  }, [isLoading, user]);

  const saveUser = () => {
    const saveUser = async () => {
      const request = {
        id: user.id,
        username: username,
        fio: fio,
        email: email,
        phone: phone,
        address: address,
      };

      await axios.post("https://localhost:7038/api/User/UpdateUser", request);

      loadUser();
    };
    saveUser();
  };

  if (isLoading || !user) {
    return <div className="account-page loading">Загрузка пользователя...</div>;
  }

  return (
    <div className="account-page">
      <div className="account-page__container">
        {/* Профиль */}
        <div className="account-profile">
          <div
            className="account-profile__avatar"
            onClick={() => navigate("/")}
          >
            <img src={"images/default-avatar.png"} alt={user.username} />
          </div>
          <div className="account-profile__name">
            {user.username || "Пользователь"} <span>|</span> Аккаунт
          </div>
          <div className="account-profile__meta">
            Баланс: {balance.toLocaleString("ru-RU")} ₽ · Бонусы:{" "}
            {score?.toLocaleString("ru-RU") ?? 0}
          </div>
        </div>

        {/* Карточка данных */}
        <div className="account-card">
          <h3 className="account-card__title">Данные для доставки</h3>
          <p className="account-card__subtitle">
            Чтобы не вводить каждый раз после заказа. Если нужно будет указать
            другой адрес — не проблема.
          </p>

          <div className="account-field">
            <div className="account-field__label">ФИО</div>
            <input
              className="account-field__input"
              type="text"
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              placeholder="Иванов Иван Иванович"
            />
          </div>

          <div className="account-field">
            <div className="account-field__label">Телефон</div>
            <input
              className="account-field__input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 900 000 00 00"
            />
          </div>

          <div className="account-field">
            <div className="account-field__label">Email</div>
            <input
              className="account-field__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div className="account-field">
            <div className="account-field__label">Адрес</div>
            <input
              className="account-field__input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Город, улица, дом..."
            />
          </div>

          <div className="account-field">
            <div className="account-field__label">Username</div>
            <input
              className="account-field__input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </div>

          <button type="button" className="account-save-btn" onClick={saveUser}>
            Сохранить изменения
          </button>
        </div>

        <button
          type="button"
          className="account-back-btn"
          onClick={() => navigate("/")}
        >
          Вернуться назад
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
