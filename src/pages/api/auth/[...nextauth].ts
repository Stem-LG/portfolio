import NextAuth, { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    // session: {
    //     strategy: "jwt",

    // },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ user, session }) {
            session.user.role = user.role
            return session
        }
    },
    pages: {
        signIn: "/login",
    }
}


export default NextAuth(authOptions);
