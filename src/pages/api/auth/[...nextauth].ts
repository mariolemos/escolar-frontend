import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiPostLogin } from "../../../services/api";

interface ILoginResponse {
  token: string;
  nome: string;
  username: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpf: { label: "CPF", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { cpf, senha } = credentials as { cpf?: string; senha?: string };
        try {
          const data = await apiPostLogin<ILoginResponse>("auth/login", { cpf, password: senha });
          if (!data || !data.token) return null;
          return {
            id: data.username ?? "",
            name: data.nome ?? "",
            username: data.username ?? "",
            token: data.token,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
        if ((user as any).token) token.accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }: any) {
      (session as any).user = (token as any).user;
      (session as any).accessToken = (token as any).accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
