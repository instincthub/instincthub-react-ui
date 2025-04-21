import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Define your credentials interface for clarity (optional)
interface CredentialsType {
  username: string;
  password: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | { token: string; [key: string]: any }; // Allow name to be string or object
    accessToken?: string; // Optional: if you use this property
  }
}

export const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"username" | "password", unknown>>,
        request: Request
      ): Promise<User | null> {
        // Type guard to ensure username exists and is a string
        if (
          !credentials?.username ||
          typeof credentials.username !== "string"
        ) {
          return null;
        }

        try {
          // Parse username as JSON
          const objects = JSON.parse(credentials.username);
          if (objects.token) {
            // Return a User-compatible object
            return {
              name: objects.name || objects, // Adjust based on your needs
              email: objects.email,
            };
          }
          return null;
        } catch (error) {
          console.error("Failed to parse credentials.username:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
    async session({ session, token }) {
      if (typeof token.id === "string") {
        session.user.id = token.id; // Now type-safe
      }
      return session;
    },
    jwt: async ({ token, trigger, session, account }) => {
      if (account?.provider && account.provider !== "credentials") {
        const credentials = {
          name: token.name,
          email: token.email,
          picture: token.picture,
        };
        // Validation logic here if needed
      }
      if (trigger === "update" && session?.info) {
        token.name = session.info;
      }
      if (
        token &&
        token.name &&
        typeof token.name === "object" &&
        "token" in token.name
      ) {
        token.accessToken = token.name.token; // Now type-safe
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt", // Ensure this is a literal "jwt"
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
