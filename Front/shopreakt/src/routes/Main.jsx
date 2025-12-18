// src/pages/Main.jsx
import { useEffect, useState } from "react";
import MyProduct from "../components/product-card/ProductCard";
import Header from "../components/Header/header";
import { useUser } from "../context/UserContext";
import "./Main.css";
import axios from "axios";
import isEmpty from "../utils/isEmpty";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { isLoading } = useUser();
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIsLoad(true);
    const loadProducts = async () => {
      const response = await axios.get(
        "https://localhost:7038/api/product/all"
      );
      setProducts(response.data);
      setFiltered(response.data);
      setIsLoad(false);
    };
    loadProducts();
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (isEmpty(value)) {
      setFiltered(products);
    } else {
      const lower = value.toLowerCase();
      const _products = products.filter((p) =>
        p.name.toLowerCase().includes(lower)
      );
      setFiltered(_products);
    }
  };

  return !isLoad && !isLoading ? (
    <div className="main">
      <Header />
      <div className="main__container">
        <div className="search-bar">
          <span className="search-bar__icon">🔍</span>
          <input
            type="text"
            className="search-bar__input"
            placeholder="Быстрый поиск"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="row">
          {filtered.map((p) => (
            <div key={p.id}>
              <MyProduct
                id={p.id}
                image="/images/кроссы.jpg"
                price={p.price}
                name={p.name}
                brand={p.brand}
                score={p.score}
                address={p.address}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="loading">Загрузка...</div>
  );
};

export default MainPage;
