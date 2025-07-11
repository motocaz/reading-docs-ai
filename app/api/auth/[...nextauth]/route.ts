import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            email: "user@example.com",
            name: "Jane Smith",
            username: "janesmith",
            image: "/placeholder.svg?height=40&width=40",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.username as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
