# To-Do App

This is a minimal Next.js to-do list example with drag and drop and PostgreSQL persistence.

## Setup

### Using Podman Compose

If you have Podman and `podman-compose` installed you can bring up a ready-to-use
development environment without installing Node or PostgreSQL locally:

```bash
podman-compose -f ../podman-compose.yml up
```

Add the `--build` flag on the first run to build the local Node image. This
makes the setup work even if you don't have a registry configured.

This starts both PostgreSQL and the Next.js dev server. The application will be
available on [http://localhost:3000](http://localhost:3000). The database data
is persisted in the `pgdata` volume.

### Manual Setup

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
