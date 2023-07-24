CREATE TABLE volunteers(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT,
    skills TEXT NOT NULL
);

CREATE TABLE organizations(
    id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255),
    organization_description TEXT,
    organization_email TEXT NOT NULL UNIQUE CHECK (position('@' IN organization_email) > 1),
    logo_url TEXT,
    founders TEXT,
    website TEXT
);


CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    org_id INTEGER NOT NULL,
    project_name TEXT NOT NULL UNIQUE,
    project_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    image_url TEXT,
    requested_people INTEGER NOT NULL,
    approved_people INTEGER NOT NULL,
    tags TEXT NOT NULL,
    FOREIGN KEY (org_id) REFERENCES organizations (id) ON DELETE CASCADE
    
);

CREATE TABLE interested_volunteers(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    project_id INTEGER,
    approved BOOLEAN,
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
   
);


CREATE TABLE authentication(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    user_type TEXT NOT NULL
)
