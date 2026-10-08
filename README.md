# Full-Stack Authentication App

A full-stack TypeScript application with a React frontend and Express backend, currently focused on authentication, protected routes, and a clean light-themed UI.

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- React Icons
- Vite

### Backend

- Node.js
- Express
- TypeScript
- Zod
- JWT authentication
- Cookie-based refresh tokens
- CORS
- `cookie-parser`
- dotenv

### Database

- Configured through `DATABASE_URL`
- Database implementation is currently integrated through the backend configuration.

---

## Project Structure

```text
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   │   └── contexts/
│   │   │       └── auth/
│   │   │           └── AuthContext.tsx
│   │   ├── api.ts
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── middleware.ts
│   │   │   ├── routes.ts
│   │   │   └── ...
│   │   ├── config.ts
│   │   └── server.ts
│   ├── package.json
│   └── ...
│
└── README.md
```
