# SmartQ Queue Management System — Complete Full Stack

This ZIP contains the complete SmartQ project based on the requested specification.

## User journey

1. Open `/`
2. Choose **User** or **Admin**
3. Register a new account
4. Login using the registered account
5. User → `/dashboard`
6. Admin → `/admin`
7. User selects Hospital/Bank, State, District, Facility, Service and 15-minute slot
8. User books a token
9. Admin clicks **CALL NEXT TOKEN**
10. User sees the current token, people ahead and estimated waiting time
11. When the called token reaches the user's token, **IT'S YOUR TURN!** appears

## Authentication

- Separate User registration/login
- Separate Admin registration/login
- Passwords are hashed with bcrypt in the backend
- JWT authentication
- Role checks on backend endpoints
- Dashboard/admin routes check the login session
- Logout support

## Queue engine

- SQLite persistence
- Token issuance
- Admin next-token control
- Reset queue
- Socket.IO live updates
- Browser localStorage synchronization
- 500ms polling fallback
- People Ahead = My Token - Current Called Token
- Estimated Wait = People Ahead × 5 minutes

## Frontend

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Responsive dark slate + teal UI
- `/admin-dashboard` permanently redirects to `/admin`

## Backend

- Node.js
- Express
- SQLite
- bcryptjs
- JWT
- Socket.IO

## Run

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Then open:
`http://localhost:3000`

The backend runs on:
`http://localhost:5000`

## Production note

For a production deployment, use environment secrets for JWT, HTTPS, secure HttpOnly cookies, rate limiting, CSRF protection, validation, audit logging and a managed database.


## Combined Package
This ZIP combines the SmartQ authentication/UI project with the complete full-stack backend. Duplicate files are kept from the complete full-stack version so the backend, JWT auth, SQLite database, Socket.IO real-time queue sync, User/Admin flows, and dashboards remain in one project.
