# Personal Finance Manager API

A Spring Boot backend application for managing personal finances including user authentication, transactions, savings goals, and financial reports.

---

# Tech Stack

- Java 17
- Spring Boot 4
- Spring Data JPA
- H2 Database
- Maven
- REST APIs

---

# Features

## Authentication
- User Registration
- User Login
- Password Encryption using BCrypt

## Transactions
- Create Transaction
- Get Transactions
- Update Transaction
- Delete Transaction

## Savings Goals
- Create Goal
- View Goals

## Reports
- Financial Summary
- Total Income
- Total Expense
- Balance Calculation

---

# Project Structure

```text
src/main/java/com/syfe/financemanager

controller/
service/
repository/
entity/
dto/
exception/
config/
security/
```

---

# API Endpoints

## Auth APIs

### Register
POST `/api/auth/register`

Sample Request:

```json
{
  "name": "Manu",
  "email": "manu@example.com",
  "password": "123456"
}
```

---

### Login
POST `/api/auth/login`

```json
{
  "email": "manu@example.com",
  "password": "123456"
}
```

---

## Transaction APIs

### Create Transaction
POST `/api/transactions/{userId}`

```json
{
  "title": "Salary",
  "amount": 50000,
  "type": "INCOME",
  "category": "Job",
  "transactionDate": "2026-05-25"
}
```

---

### Get Transactions
GET `/api/transactions/{userId}`

---

### Update Transaction
PUT `/api/transactions/{transactionId}`

---

### Delete Transaction
DELETE `/api/transactions/{transactionId}`

---

### Transaction Summary
GET `/api/transactions/summary/{userId}`

---

## Goal APIs

### Create Goal
POST `/api/goals/{userId}`

```json
{
  "goalName": "Buy Laptop",
  "targetAmount": 100000,
  "savedAmount": 25000
}
```

---

### Get Goals
GET `/api/goals/{userId}`

---

# Database Configuration

H2 Database is used.

H2 Console:
```text
http://localhost:8080/h2-console
```

JDBC URL:
```text
jdbc:h2:file:./data/finance-db
```

Username:
```text
sa
```

Password:
```text
(empty)
```

---

# Run Project

## Clone Repository

```bash
git clone <repository-url>
```

## Open Project

Open project in IntelliJ IDEA.

## Run Application

Run:

```text
PersonalFinanceManagerApplication.java
```

Application runs on:

```text
http://localhost:8080
```

---

# Build Project

```bash
mvn clean install
```

---

# Future Improvements

- JWT Authentication
- Advanced Analytics
- Monthly Reports
- Category Management
- Deployment with PostgreSQL

---

# Author

Manaswini Reddy