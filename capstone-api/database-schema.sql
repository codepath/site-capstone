CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    favorites JSONB DEFAULT '[]',
    itineraries JSONB DEFAULT '[]',
    flights JSONB DEFAULT '[]'

);

CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    price TEXT NOT NULL,
    check_in TEXT NOT NULL,
    check_out TEXT NOT NULL
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER,
    city TEXT NOT NULL,
    check_in TEXT NOT NULL,
    check_out TEXT NOT NULL
);


CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    departing_at TIMESTAMP NOT NULL,
    arriving_at TIMESTAMP NOT NULL,
    carrier_name TEXT NOT NULL,
    carrier_logo_url TEXT,
    carrier_website TEXT
);

