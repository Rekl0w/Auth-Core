# Auth Core

Welcome to Auth Core! This project provides basic user authentication functionalities implemented using Express and Node.js with MongoDB as the database.

## Features

- **User Registration:** Register new users by providing required information.
- **User Login:** Authenticate users by logging in with their credentials.
- **User Logout:** Allow users to log out from their accounts.
- **Token Refresh:** Refresh authentication tokens for better security.
- **Get User Information:** Retrieve user information after successful authentication.

## Tech Stack

- **Express.js:** A fast and flexible web application framework for building web applications and APIs.
- **Node.js:** A JavaScript runtime environment used for building fast and scalable network applications.
- **MongoDB:** A flexible and scalable document-based NoSQL database.
- **bcryptjs:** A library used to securely hash user passwords.
- **jsonwebtoken:** A library used for JSON web token-based authentication.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Rekl0w/Auth-Core.git
```

2. Navigate to the project directory:

```bash
cd Auth-Core
cd server
```

3. Install dependencies:

```bash
npm install
```

4. Set up MongoDB:
   - Install MongoDB on your machine if not already installed.
   - Configure MongoDB connection settings in the `.env` file.

5. Start the server:

```bash
npm run dev
```

6. Access the application at `http://localhost:3000`.

## Endpoints

- **POST /register:** Register a new user.
- **POST /login:** Log in with user credentials.
- **POST /logout:** Log out the authenticated user.
- **POST /refresh:** Refresh authentication tokens.
- **GET /user:** Get user information (requires authentication).
