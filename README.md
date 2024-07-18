
# MERN Stack Coding Challenge

This project implements a MERN (MongoDB, Express.js, React.js, Node.js) stack application to manage product transactions, providing APIs for database initialization, transaction listing, statistics, and chart data. The frontend integrates these APIs to display transaction tables and charts based on user-selected criteria.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- Initialize database with seed data fetched from a third-party API.
- List transactions with support for search and pagination.
- Calculate statistics for total sale amount, number of sold items, and unsold items based on selected month.
- Generate a bar chart displaying price ranges and number of items for the selected month.
- Display a pie chart showing unique categories and the number of items for each category in the selected month.
- Combine data from all APIs to provide a comprehensive JSON response.

## Prerequisites

Ensure you have the following installed:

- Node.js and npm (or yarn)
- MongoDB
- Git

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Prince0000/MERN_PROJECT.git
   cd your_project
   ```

2. Install backend dependencies and configure environment variables:

   ```sh
   cd mern-backend
   npm install
   cp .env.example .env
   # Edit .env file with your configurations (e.g., MongoDB URI, port settings)
   ```

3. Initialize the database with seed data:

   ```sh
   http://localhost:5000/api/initialize
   # This initializes the database using data fetched from the third-party API
   ```

4. Install frontend dependencies:

   ```sh
   cd ../mern-frontend
   npm install
   ```

## Backend Setup

Start the backend server:

```sh
cd ../mern-backend
node index.js
# Server will run on http://localhost:5000/
```

## Frontend Setup

Start the frontend development server:

```sh
cd ../mern-frontend
npm start
# Frontend will run on http://localhost:3000/
```

## Usage

- Open your browser and navigate to:
  - Frontend: `http://localhost:3000/`

## API Endpoints

### Backend API Endpoints:

- **GET /api/initialize**
  - Initialize the database with data fetched from a third-party API.
  - Example: `http://localhost:5000/api/initialize`

- **GET /api/transactions**
  - List all transactions with support for search and pagination.
  - Example: `http://localhost:5000/api/transactions?month=3&search=keyword&page=1&perPage=10`

- **GET /api/statistics**
  - Retrieve total sale amount, total sold items, and total unsold items for a selected month.
  - Example: `http://localhost:5000/api/statistics?month=3`

- **GET /api/bar-chart**
  - Fetch data for generating a bar chart displaying price ranges and the number of items in each range for a selected month.
  - Example: `http://localhost:5000/api/bar-chart?month=3`

- **GET /api/pie-chart**
  - Fetch data for generating a pie chart displaying unique categories and the number of items in each category for a selected month.
  - Example: `http://localhost:5000/api/pie-chart?month=3`

- **GET /api/combined**
  - Combine data from all APIs and send a final JSON response.
  - Example: `http://localhost:5000/api/combined?month=3`

## Frontend Components

### Frontend Components:

- **Transactions Table**
  - Display transactions based on selected month and search criteria.
  - Implement pagination to load next and previous page data.

- **Transactions Statistics**
  - Display total amount of sales, total sold items, and total unsold items for the selected month.

- **Transactions Bar Chart**
  - Display a bar chart showing price ranges and number of items in each range for the selected month.

## Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests to contribute to this project.

## Contact

- Prince Raj
- princer6450@gmail.com
- Project Link: [Project Repository](https://github.com/Prince0000/MERN_PROJECT)
