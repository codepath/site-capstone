CREATE TABLE users_itinerary (
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER,
    itinerary_id INTEGER,
    date         TIMESTAMP NOT NULL DEFAULT NOW()         
);

CREATE TABLE users (
    id           SERIAL PRIMARY KEY,
    email        TEXT NOT NULL,
    password     TEXT NOT NULL
);

CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    price TEXT NOT NULL
);

CREATE TABLE itinerary (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    price TEXT NOT NULL
);
