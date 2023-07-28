CREATE TABLE volunteers(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT
);

CREATE TABLE organizations(
    id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255),
    organization_description TEXT,
    organization_email TEXT NOT NULL UNIQUE CHECK (position('@' IN organization_email) > 1),
    logo_url TEXT,
    founders TEXT NOT NULL, 
    website TEXT
);

CREATE TABLE volunteer_skills(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    skill TEXT NOT NULL,
    FOREIGN KEY (email) REFERENCES volunteers (email)
);

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL,
    org_name TEXT NOT NULL,
    project_name TEXT NOT NULL UNIQUE,
    project_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    image_url TEXT,
    requested_people INTEGER NOT NULL,
    approved_people INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE interested_volunteers(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    project_id INTEGER,
    approved BOOLEAN DEFAULT FALSE
   
);

CREATE TABLE project_tags(
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    tag_name TEXT NOT NULL
    
);

CREATE TABLE authentication(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    user_type TEXT NOT NULL
)
