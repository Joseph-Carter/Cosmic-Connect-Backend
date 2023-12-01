# Cosmic Connect Backend

This repository contains the backend implementation for Cosmic Connect, a platform focused on sharing space-related content and discussions.

## Table of Contents

- [Overview](#overview)
  - [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [Future Development](#future-development)
- [Contributing](#contributing)
- [Frontend](https://github.com/Joseph-Carter/Cosmic-Connect-Frontend)
- [Deployed Site](https://cosmicconnect.netlify.app/)

## Overview

The backend is built using Node.js with the Express.js framework and PostgreSQL as the database. It provides endpoints for managing users and posts related to space exploration topics.

### Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg-promise
- bcryptjs
- validator
- cors

## Setup

### Prerequisites

- Node.js installed
- PostgreSQL database

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Install dependencies:**

    ```bash
    cd cosmic-connect-backend
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and configure the following environment variables:

    ```plaintext
    DATABASE_URL=your_postgresql_database_url
    PG_HOST=your_postgresql_host
    PG_PORT=your_postgresql_port
    PG_DATABASE=your_postgresql_database_name
    PG_USER=your_postgresql_username
    PG_PASSWORD=your_postgresql_password
    ```

4. **Create and seed the database:**

    Execute the SQL script in `db_init.sql` to create the database and seed it with sample data.

## Usage

Run the server:

```bash
npm start
```

The server will start on http://localhost:8080.

## API Endpoints
Users:

/users: Manages users (registration, login)
/users/:userId: Fetch user details
Posts:

/users/:userId/posts: CRUD operations for user posts
/users/:userId/posts/:postId: Get, update, delete specific user post
Comments:

Note: Comment feature is a future implementation and is not currently available in the live product.

## Future Development
The implementation of comments feature is planned for a future release. This feature will allow users to comment on posts, enhancing engagement and discussions on Cosmic Connect.

## Contributing
Contributions are welcome! If you encounter any issues or wish to enhance the functionality, feel free to open a pull request.