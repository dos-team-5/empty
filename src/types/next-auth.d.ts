import { Session, User, JWT } from 'next-auth';
import { BackendTokens } from '@/app/(auth)/actions/token';

interface CustomUser extends User {
  id: string;
  email: string;
  name: string;
  role: string;
  backendTokens: BackendTokens;
}

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  backendTokens: BackendTokens;
}

interface CustomJWT extends JWT {
  id: string;
  email: string;
  name: string;
  role: string;
  backendTokens: BackendTokens;
}

declare module 'next-auth' {
  interface Session {
    backendTokens: BackendTokens;
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    backendTokens: BackendTokens;
    id: string;
    role: string;
  }
}
