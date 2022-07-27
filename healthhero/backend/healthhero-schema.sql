CREATE TABLE school(
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,  
    image       TEXT,
    location    INT
);


CREATE TABLE users(
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    username    TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    school_id   INT,
    type        TEXT NOT NULL,
    FOREIGN KEY (school_id) REFERENCES school(id)
);


CREATE TABLE restaurant(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER,
    name        TEXT NOT NULL, 
    location    INTEGER,
    school_id   INTEGER, 
    image_url   TEXT,
    description TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (school_id) REFERENCES school(id)
);

CREATE TABLE restriction(
    id          SERIAL PRIMARY KEY,
    name        TEXT,
    type        TEXT 
);

CREATE TABLE accommodation(
    id            SERIAL PRIMARY KEY,  
    restaurant_id INTEGER,  
    restriction_id INTEGER,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (restriction_id) REFERENCES restriction(id)
);



CREATE TABLE user_restriction(
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER,
    restriction_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restriction_id) REFERENCES restriction(id)
);

CREATE TABLE community(
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    school_id   INTEGER,
    image_url   TEXT NOT NULL,
    FOREIGN KEY (school_id) REFERENCES school(id)
);

CREATE TABLE user_community(
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER, 
    community_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (community_id) REFERENCES community(id)
)