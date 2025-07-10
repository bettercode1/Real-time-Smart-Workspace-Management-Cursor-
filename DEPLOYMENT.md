# Deployment Guide - Real-time Smart Workspace Management

## Environment Variables Setup

### Required Environment Variables

#### 1. Firebase Configuration (Required)
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### 2. Database Configuration (Optional)
```bash
DATABASE_URL=postgresql://username:password@host:port/database_name
```
**Note**: If DATABASE_URL is not provided, the app will use in-memory storage (data will be lost on server restart).

### Optional Environment Variables
```bash
PORT=5000
NODE_ENV=production
SESSION_SECRET=your_very_long_random_secret_key_here
```

## How to Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on your web app
6. Copy the config values from the provided configuration object

## Database Setup Options

### Neon Database
```bash
DATABASE_URL=postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database_name
```

### Supabase
```bash
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Railway
```bash
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/[database]
```

## Deployment Platforms

### Vercel
1. Create `.env.local` file in root directory
2. Add all environment variables
3. Deploy using Vercel CLI or GitHub integration

### Netlify
1. Go to Site Settings > Environment Variables
2. Add all required environment variables
3. Deploy using Netlify CLI or GitHub integration

### Railway
1. Add environment variables in Railway dashboard
2. Connect your GitHub repository
3. Railway will automatically deploy

### Render
1. Add environment variables in Render dashboard
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set start command: `npm start`

## Important Notes

- **VITE_ prefix**: Variables starting with `VITE_` are exposed to client-side code
- **Security**: Never commit `.env` files to version control
- **Database**: Ensure your database is accessible from deployment platform
- **Firebase**: Set up proper authentication and database rules

## Build Commands

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm start
```

## Development

```bash
# Start development server
npm run dev
``` 