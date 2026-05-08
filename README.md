# Next.js + Headless WordPress Project Structure

This project is a Headless WordPress architecture using **Next.js** for the frontend and **WordPress** as a headless CMS via the REST API or GraphQL.

## Directory Structure

- `frontend/`: Next.js application (App Router, Tailwind CSS, TypeScript).
- `cms/`: WordPress installation files, custom themes, and plugins.
- `docker-compose.yml`: Local development setup for WordPress and MySQL.

## Getting Started

### 1. WordPress (Backend)
- Configure WordPress to act as a Headless CMS.
- Recommended Plugins:
  - **WPGraphQL**: To use GraphQL instead of REST API.
  - **Advanced Custom Fields (ACF)**: For custom data structures.
  - **WPGraphQL for ACF**: To expose ACF fields to GraphQL.

### 2. Next.js (Frontend)
- Navigate to the `frontend` directory.
- Install dependencies: `npm install`.
- Set up environment variables in `.env.local` pointing to your WP URL.

## Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS, TypeScript.
- **Backend**: WordPress (Headless), MySQL.
- **Data Fetching**: Apollo Client (for GraphQL) or Fetch API (for REST).
