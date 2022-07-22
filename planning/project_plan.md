# Project Plan

Pod Members: **Add Pod Members Names**

## Problem Statement and Description

Insert the latest summary of your problem statement and app description.

## User Roles and Personas

Include the most up-to-date user roles and personas.

## User Stories

List the current user stories you will implement.

## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.

## Data Model

Describe your app's data model using diagrams or tables

## Endpoints

List the API endpoints you will need to implement.
# Authentication 🔒

Login

- post(”/login”)
    - creates user JWT

Register 

- post(”/register”)
    - creates user JWT

Me

- get(”/me”)
    - gets data from logged in user

# Restaurants 🍱

- **get**(”/restaurants”)
    - list restaurants
- **get**(”/restaurants/restaurantID”)
    - list specific restaurant
- **post**(”/restaurants/”)
    - adds new restaurants to the database
- **put**(”/restaurants/restaurantID”)
    - changes element in a particular restaurant
- **delete**(”/restaurants/:restaurantID”)
    - deletes all the data of a particular restaurant
    

# Schools 📚

- **get**(”/schools”)
    - lists schools
- **get**(”/schools/:schoolID”)
    - gets specific school

# Restrictions 🚫

Note: I don't think we are gonna let users/us edit or change restrictions so no post request is needed 

- **get**(”/restrictions”)
    - lists restrictions

***Don't forget to set up your Issues, Milestones, and Project Board!***
