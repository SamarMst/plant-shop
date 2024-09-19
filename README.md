# 🌿 Plant Shop Website

## Overview 
PlantShop is a full-stack web application designed to manage and sell plants online. The application allows sellers to manage their plant inventory and buyers to explore and purchase plants. This project uses modern technologies like React, Prisma, Express, Node.js, Docker, and Tailwind CSS to ensure a robust, scalable, and user-friendly platform.

-----------------------------------------------------------

## Technologies Used
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MySQL (Prisma)
- Containerization: Docker
- Authentication: JWT (JSON Web Token)
- Validation: Yup

## Features
### 🛒 Buyer Features
* Browse  plants.
* View detailed information about plants (name, price, type).
* Place orders and track the order history.
### 🛍️ Seller Features
* Manage plants (add, update, restock, or delete plants ).
* View sales history.
* Manage plant categories.  

## Setup and Installation
### Prerequisites
* Node.js and npm installed
* Docker installed
* MySQL server running
  
### Environment Variables
Create a `.env` file in the root directory of the server with the following variables:

Server `.env`:

```bash
# .env file

# Database connection string
DATABASE_URL="mysql://user:password@localhost:3306/plantshop"

# JWT Secret Key (used for authentication)
JWT_SECRET="your_jwt_secret"

# Server port
PORT=4000
```

### Running Locally
##### 1. Clone the repository:
```bash
git clone https://github.com/your-username/plantshop.git
cd plant-shop
```
#### 2. Run the app using Docker:
```bash
docker-compose up --build
```

#### 3. Run locally without Docker:

* Server:

    ```bash
    cd backend
    npm install
    npx prisma migrate dev
    npm start
    ```
* Client:
  ```bash
  cd frontend
  npm install
  npm start
  ```
#### Database Migrations
To apply Prisma migrations:
```bash
cd backend
npx prisma migrate dev
```
