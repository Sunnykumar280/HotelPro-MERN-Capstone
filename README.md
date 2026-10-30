# HotelPro (MERN) - v2

## Run
Backend:  cd backend  && npm install && npm run seed && npm run dev
Frontend: cd frontend && npm install && npm run dev
Check backend + database: http://localhost:5000/api/health  (should show database: connected)

## Admin
Register with admin@hotelpro.com (ADMIN_EMAIL in backend/.env). An Admin link appears.

## Login problems
npm run resetusers (in backend) deletes all users so you can register fresh.

## Google sign-in (optional)
1. console.cloud.google.com -> create a project.
2. APIs & Services -> OAuth consent screen: External, fill app name and your email, add your own Gmail as a Test user.
3. Credentials -> Create credentials -> OAuth client ID -> Web application.
4. Authorized JavaScript origins: http://localhost:5173 and http://localhost:5174
5. Copy the Client ID into backend/.env (GOOGLE_CLIENT_ID=...) and frontend/.env (VITE_GOOGLE_CLIENT_ID=...).
6. Restart both servers. A "Sign in with Google" button appears on Login and Register.
