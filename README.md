# 247LocalFinest - Premium Cannabis E-commerce Platform

A modern e-commerce platform for premium cannabis products, built with Next.js, TypeScript, and MongoDB.

## Features

- User authentication and authorization
- Admin dashboard for product management
- Member area with premium products
- Responsive design with modern UI
- Secure payment processing
- Age verification system

## Tech Stack

- Next.js 14
- TypeScript
- MongoDB
- NextAuth.js
- Tailwind CSS
- Shadcn UI Components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/247localfinest.git
cd 247localfinest
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `NEXTAUTH_URL`: Base URL of your application

## Deployment

The project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and add the required environment variables.

## License

This project is licensed under the MIT License. 