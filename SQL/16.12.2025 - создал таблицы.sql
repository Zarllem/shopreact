-- Таблица Brand
CREATE TABLE "Brand" (
    id          UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)   NOT NULL,
    image       VARCHAR(500),
    create_date TIMESTAMP      NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP      NOT NULL DEFAULT NOW(),
    is_active   BOOLEAN        NOT NULL DEFAULT TRUE
);

-- Таблица "User"
CREATE TABLE "User" (
    id          UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    userName    VARCHAR(255)   NOT NULL,
    scor        BIGINT,
    image       VARCHAR(500),
    fio         VARCHAR(255),
    adress      VARCHAR(255),
    email       VARCHAR(255),
    phone       VARCHAR(50),
    create_date TIMESTAMP      NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP      NOT NULL DEFAULT NOW(),
    is_active   BOOLEAN        NOT NULL DEFAULT TRUE
);

-- Таблица Product
CREATE TABLE "Product" (
    id          UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    price       BIGINT,
    image       VARCHAR(500),
    scor        BIGINT,
    quantity    BIGINT,
    create_date TIMESTAMP      NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP      NOT NULL DEFAULT NOW(),
    is_active   BOOLEAN        NOT NULL DEFAULT TRUE,
    Brand_id    UUID           NOT NULL,
    CONSTRAINT fk_product_brand
        FOREIGN KEY (Brand_id)
        REFERENCES "Brand" (id)
);
