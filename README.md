# Next.js REST API Development

## Overview

This repository is a learning project for developing REST APIs using Next.js and TypeScript. It covers API routing, database integration, CRUD operations, authentication, and deployment.

## Project Setup

1. Create a New Next.js Project

To set up a Next.js project with TypeScript:

```shell
npx create-next-app@latest my-api-project --typescript
cd my-api-project
npm install
```

2. Project Structure

```
.next/
app/
 ├── api/
 │   ├── auth/
 │   │   ├── users/
 │   │   │   ├── route.ts
 │   ├── dashboard/
 │   │   ├── blogs/
 │   │   ├── categories/
 ├── favicon.ico
 ├── globals.css
 ├── layout.tsx
 ├── page.tsx
lib/
 ├── models/
 ├── db.ts
middlewares/
public/
.env
.gitignore
eslint.config.mjs
middleware.ts
next-env.d.ts
next.config.ts
package.json
package-lock.json
postcss.config.mjs
README.md
```

## Database Integration

- **Database**: MongoDB using Mongoose
- **Configuration File**: lib/db.ts

Create a `.env` file and add your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://your_database_url
```

## User APIs

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /api/users     | Fetch all users     |
| POST   | /api/users     | Create a new user   |
| PATCH  | /api/users/:id | Update user details |
| DELETE | /api/users/:id | Remove a user       |

## Create a category

| Method | Endpoint                      | Description        |
| ------ | ----------------------------- | ------------------ |
| GET    | /api/dashboard/categories     | Get all categories |
| POST   | /api/dashboard/categories     | Create a category  |
| PATCH  | /api/dashboard/categories/:id | Update category    |
| DELETE | /api/dashboard/categories/:id | Remove a category  |

## Blog APIs

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| GET    | /api/dashboard/blogs     | Fetch all blogs     |
| POST   | /api/dashboard/blogs     | Create a new blog   |
| GET    | /api/dashboard/blogs/:id | Fetch a single blog |
| PATCH  | /api/dashboard/blogs/:id | Update a blog       |
| DELETE | /api/dashboard/blogs/:id | Remove a blog       |

### Additional Features

- **Search Blogs by Keywords**: `/api/dashboard/blogs?search=query`

- **Filter Blogs by Date**: `/api/dashboard/blogs?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

- **Sort Blogs**: `/api/dashboard/blogs?sort=asc|desc`

- **Pagination**: `/api/dashboard/blogs?page=1&limit=10`

## Middleware and Security

- **API Route Protection**: Ensures only authenticated users can access certain routes.

- **Logging Middleware**: Logs API requests for monitoring and debugging.

## Deployment

To deploy the project on Vercel:

1. Create a Vercel account if you don't have one.
2. Import your project to Vercel from GitHub or your local machine.
3. Configure environment variables for your MongoDB connection string and other sensitive information.
4. Deploy your project.
