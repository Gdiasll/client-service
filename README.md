# Client and Voucher Management Project

This project was developed with the purpose of managing the relationship between **Client** and **Voucher**. Initially, a **1:1** relationship is implemented between the two, but in future iterations, this will be adjusted to **1:N**, allowing a client to have multiple vouchers.

Additionally, the documentation for the API endpoints was created using **Swagger**, which can be accessed directly at the `/api` route.

## Features Implemented

- **Client and Voucher Relationship**:
  - Currently, there is a **1:1** relationship between **Client** and **Voucher**. In future versions, this will be changed to a **1:N** relationship (a client can have multiple vouchers).
  
- **Swagger Documentation**:
  - The documentation for the API endpoints is available at the `/api` route. **Swagger** was used to make it easier to understand and use the API.

- **Unit and Integration Tests**:
  - Some improvements, such as the implementation of unit and integration tests, are planned for future versions.

- **Login System and JWT**:
  - In upcoming versions, a login system will be implemented, allowing the client to obtain a **JWT token** to securely access the endpoints.

- **Migrations**:
  - Database migrations, using **Prisma**, can be found in the `prisma` folder within the project.

## Architecture

This project was developed based on best architectural practices, including:

- **Domain-Driven Design (DDD)**: Organizing code around business domains.
- **SOLID Principles**: Fundamental principles for building maintainable and scalable software.
- **Clean Code**: Focusing on writing readable and maintainable code.
- **KISS (Keep It Simple, Stupid)**: Striving for simple and straightforward solutions to problems.

## Setup Instructions

### 1. Environment Configuration

This project integrates with a **.env** file, and you need to create a `.env` file based on the provided `.env.template` file located at the root of the project. To do this:

1. Rename the `.env.template` file to `.env`.
2. Fill in the required environment variables based on your execution environment.

### 2. Running Migrations

To set up the database, you need to run the Prisma migrations. Navigate to the project directory and execute the following command:

```bash
yarn prisma migrate deploy
```
### 3. Starting the Project

After setting up the environment and applying the migrations, start the server using the command:

```bash
yarn start
```