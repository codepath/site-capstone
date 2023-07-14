CREATE TABLE volunteers(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE organizations(
    id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255),
    organization_description TEXT,
    organization_email TEXT NOT NULL UNIQUE CHECK (position('@' IN organization_email) > 1),
    logo_url TEXT
);

CREATE TABLE volunteer_skills(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    skill TEXT NOT NULL
);

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    project_name TEXT NOT NULL,
    project_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    image_url TEXT,
    requested_people INTEGER NOT NULL,
    approved_people INTEGER NOT NULL
);

CREATE TABLE interested_volunteers(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    project_id INTEGER,
    approved BOOLEAN
);

CREATE TABLE project_tags(
    project_id INTEGER,
    tag_name TEXT NOT NULL
);

CREATE TABLE authentication(
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    user_type TEXT NOT NULL
)
