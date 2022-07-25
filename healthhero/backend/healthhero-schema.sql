CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    username    TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    school_id   INT,
    FOREIGN KEY (school_id) REFERENCES schools(id)
);

CREATE TABLE schools (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,  
    image       TEXT,
    location    GEOGRAPHY
);

CREATE TABLE restrictions(
    id          SERIAL PRIMARY KEY,
    name        TEXT,
    type        TEXT, 
);

CREATE TABLE restaurants(
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL, 
    location    GEOGRAPHY,
    school_id   INT, 
    image_url   TEXT,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    username    TEXT NOT NULL,
    password    TEXT NOT NULL  
)