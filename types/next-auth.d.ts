import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
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
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
  }
} 