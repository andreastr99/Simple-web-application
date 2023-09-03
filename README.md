# Simple-web-application README

## Overview

Simple-web-application is a web-based employee management system that allows users to perform CRUD (Create, Read, Update, Delete) operations on an employee table stored in a MySQL database. It also incorporates user authentication using JSON Web Tokens (JWT) for secure access. This application is built with a React.js frontend for the user interface and a Node.js backend for handling API requests. Axios is used for making HTTP requests between the frontend and backend.

## Features

- **User Authentication:** Users can create an account, log in, and securely access the employee management system. JWT tokens are used for authentication.

- **Token-Based Access Control:** Upon successful login, users receive an access token that is valid for 15 minutes. After expiration, a refresh token stored in cookies is used to generate a new access token for an additional 15 minutes.

- **CRUD Operations:** Authenticated users can perform CRUD operations on the employee table, including creating, reading, updating, and deleting employee records.

- **React.js Frontend:** The user interface is built using React.js, providing a responsive and interactive experience.

- **Node.js Backend:** The backend is implemented in Node.js, which handles authentication, authorization, and database operations.

- **MySQL Database:** Employee data is stored in a MySQL database, ensuring data persistence.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system.
- MySQL database server installed and running.
- Basic knowledge of React.js, Node.js, MySQL, and Axios.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/Simple-web-application.git
   ```

2. Navigate to the project directory:

   ```
   cd Simple-web-application
   ```

3. Install frontend dependencies:

   ```
   cd client/simple-web-application
   npm install
   ```

4. Install backend dependencies:

   ```
   cd server
   npm install
   ```

5. Configure the database connection:!!!!!!!
   - Create a MySQL database for the application.
   - Update the database configuration in the `server/config/db.js` file with your database credentials.

6. Start the frontend and backend servers:

   - Frontend (React.js):
     ```
     cd client/simple-web-application
     npm start
     ```

   - Backend (Node.js):
     ```
     cd server
     npm run dev
     ```

7. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. Register a new account or log in with your existing credentials.

2. After logging in, you will receive an access token and a refresh token.

3. Use the access token to make authorized API requests to perform CRUD operations on the employee table.

4. When the access token expires (after 15 minutes) or missing, the refresh token will automatically generate a new access token without requiring the user to log in again.

5. If both are missing then the user redirects to the login page. 

## API Endpoints

The backend API provides the following endpoints:

- `GET /api/Employees`: Retrieve a list of all employees.
- `POST /api/Employees`: Create a new employee record.
- `PUT /api/Employees/:EmployeeId`: Update an employee record by ID.
- `DELETE /api/Employees/:EmployeeId`: Delete an employee record by ID.

## Configuration

You can customize the application by modifying the configuration files in the `server/config` directory for the backend and the `client/src/config` directory for the frontend.

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the open-source community for providing the tools and libraries used in this project.
- Special thanks to [Your Name] for your contributions and support.

## Contact

If you have any questions or need assistance, please contact [Your Email Address].

---

Thank you for using Simple-web-application! We hope this project helps you manage employee data efficiently and securely.
