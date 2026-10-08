# Client

React + TypeScript frontend for the application.

The client provides the user interface, authentication flow, routing, and communication with the backend API.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Icons

## Features

- User registration
- User login
- Authentication state management
- Protected dashboard
- Logout
- Authenticated API requests
- Responsive UI
- Custom light theme

## Project Structure

```text
src/
├── components/
│   ├── pageContianer/
│   │   └── PageContainer.tsx
│   └── ...
│
├── pages/
│   ├── auth/
│   │   ├── login/
│   │   │   └── LoginPage.tsx
│   │   └── register/
│   │       └── RegisterPage.tsx
│   │
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   └── ...
│
├── utils/
│   └── contexts/
│       └── auth/
│           └── AuthContext.tsx
│
├── api.ts
├── App.tsx
└── main.tsx
```
