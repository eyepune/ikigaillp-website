# Ikigai LLP - Website & Admin Panel

This project has been migrated from Base44 to a modern stack using **Supabase** and **Vercel**.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide React
- **Backend**: Supabase (Auth, Database)
- **Deployment**: Vercel

## Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd <project-directory>
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
Run the SQL commands found in `SUPABASE_SETUP.sql` in your Supabase SQL Editor. This will create the necessary tables and Row Level Security (RLS) policies.

### 4. Run Development Server
```bash
npm run dev
```

## Administrative Access
To access the Admin Panel:
1. Navigate to `/AdminLogin`.
2. Log in using a Supabase Auth user.
3. If successful, you will be redirected to `/AdminPanel`.

## Folder Structure
- `src/components/admin`: Dashboard modules (Programs, Blogs, Enquiries, etc.)
- `src/components/home`: Sections for the landing page
- `src/lib/supabaseClient.js`: Centralized Supabase configuration
- `src/pages`: Main application pages

## Deployment
Any push to the `main` branch will automatically trigger a deployment to Vercel (if configured). Ensure environment variables are set in the Vercel dashboard.
