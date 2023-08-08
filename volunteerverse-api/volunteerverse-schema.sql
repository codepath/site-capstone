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
    public_email TEXT NOT NULL UNIQUE CHECK (position('@' IN organization_email) > 1),
    public_number TEXT DEFAULT NULL,
    logo_url TEXT NOT NULL,
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
    org_id INTEGER,
    org_name TEXT NOT NULL,
    project_name TEXT NOT NULL UNIQUE,
    project_description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    image_url TEXT,
    requested_people INTEGER,
    approved_people INTEGER DEFAULT 0 CHECK (approved_people >= 0),
    active BOOLEAN DEFAULT TRUE,
    external BOOLEAN DEFAULT FALSE,
    public_email TEXT NOT NULL,
    external_link TEXT,
    public_number TEXT
);

CREATE TABLE interested_volunteers(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    project_id INTEGER,
    approved BOOLEAN DEFAULT NULL
);

CREATE TABLE project_tags(
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    project_name TEXT,
    tag_name TEXT NOT NULL
    
);

CREATE TABLE authentication(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    user_type TEXT NOT NULL
)
