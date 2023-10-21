// import { authenticate } from "@/services/authService"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from "@/lib-server/prisma";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			// @ts-ignore
			async authorize(credentials, req) {
				if (typeof credentials !== "undefined") {
					// const res = await authenticate(credentials.email, credentials.password)
					const res = {
						user: {
							id: 1,
							username: "john.doe@mailinator.com",
							email: "john.doe@mailinator.com",
							fullname: "John Doe",
							role: "SUPER",
							createdAt: "2021-05-30T06:45:19.000Z",
							name: "John Doe"
						},
						token: 'eyasdfasdf12334543435asdfsa'
					};
					if (typeof res !== "undefined") {
						return { ...res.user, apiToken: res.token }
					} else {
						return null
					}
				} else {
					return null
				}
			}
		})
	],
	callbacks: {
		// @ts-ignore
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		// @ts-ignore
		async session({ session, token }) {
			const user = token.user
			if (user) {
				return {
					user: { ...user },
					expires: session.expires
				}
			}
		}
	},
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
	// adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/login'
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }