# Project Plan

Pod Members: Courtney Fenderson, Christian Bryan, Yasmin Senior

## Problem Statement and Description

Problem: College Students not being able to find restaurants that fit their dietary requirements near or on their campus.
Description: HealthHero is an app that helps students find commmunity groups and restaurants that fit their dietary needs/restrictions 

## User Roles and Personas
**User role 1:**  “**student**”: a user who is looking for affordable healthy food options near their campus.

**User role 2:**  “**Restaurant** **owner**”: a user who is looking to display their restaurant, directions, and prices on our app to attract students.

**User role 3:**  “**commentators**”: a user who is looking to update the community on different places and review the current tasty spots (stretch)

## **User Personas**

Include at least 2 personas per User Role

Student

- Dena is a new college student in NYC. Coming from a small town, Dena is used to eating from her family’s farm. She is vegetarian and also is having a hard time on finding healthy options on her huge campus. SHe’s hoping to find restaurants after canceling her meal plan.
- Sam is a new college student at USC. Sam is severely allergic to tree nuts and constantly worries about cross-contamination at restaurants which makes it difficult for him to eat out despite his busy schedule. Sam is hoping to find a resource that can help him determine which restaurants are safe for him to eat out at.

Restaurant owner:

- Joe is a 40 year old owner of “Eat Good, Feel Good”, an affordable healthy vegan own eatery. As the world eats unhealthier, less traction is brought to his restaurant. He is looking to attract more college students with his student deals.
- Helen owner of “Helen’s Bagels” is famous for her gluten-free chain bagel company located close to many college campuses. Helen knows how important it is for people with gluten sensitivity and celiac disease to find tasty gluten-free food so she is looking for ways to better market her bagel company to find individuals who may benefit from her gluten-free menu.

commentators (stretch)

- Alina is a 23 year old girl who enjoys spending time on her phone. She is very mobile and visits many locations in the city on a daily basis. She is very friendly and likes to help out her community by sharing her experiences around town.
- Observant, pain point of having difficulty finding specific types of healthy food and therefore posts about it since they know how hard that can be.

## User Stories

- “As a **health-conscious student**, I want to search for healthy food options so that I can meet my specific dietary requirements.”
- “As an **individual with food allergies,** I want to search for safe food options so that I can meet my dietary restrictions.”
- “As a **restaurant owner**, I want to share specific information about my restaurant’s ****menu options ****that may be beneficial to students”
- “As a **commentator**, I want to comment on both good and bad experiences at restaurants ****so that students can make informed decisions about where they want to buy their meals.
- “As a **student**, I want to be able to find my school on my app, where I can find the best options if my school doesn’t”
- “As a **student and commentator**, I want to be able to find the new buzz on restaurants nearby and see what restaurants would have the best options”
- “As a **restaurant owner**, I want to be able to see what different food groups the app may have in order to place my restaurant in a food group.”
- “As a **restaurant owner**, I want to see what potential customers are interested in and view their opinions to improve their experience.”
- “As a student,  I want to have different food groups I can join and find restaurants that cater to them.”
- “As a **commentator**, I want to see reviews from other students like me who share common interests.”


## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.
https://www.figma.com/file/dfYnyyD6OiVA4g9uOlqG7Z/low-fidelity-wireframes?node-id=0%3A1

## Data Model
[Data Tables - Update (1).pdf](https://github.com/CYC-pod/site-capstone/files/9172194/Data.Tables.-.Update.1.pdf)


## Endpoints

List the API endpoints you will need to implement:
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
