# To-Do App

This is a minimal Next.js to-do list example with drag and drop and PostgreSQL persistence.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set `DATABASE_URL` environment variable to your PostgreSQL connection string.
3. Create table:
   ```sql
   CREATE TABLE todos (
     id serial PRIMARY KEY,
     title text NOT NULL,
     tags text[] DEFAULT ARRAY[]::text[],
     position int NOT NULL
   );
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
