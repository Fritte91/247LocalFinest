import 'next-auth';
import NextAuth from "next-auth"

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    buyerType: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      firstName: string;
      lastName: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      buyerType: string;
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    buyerType: string;
  }
} 