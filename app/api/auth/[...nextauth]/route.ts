import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from "@/lib-server/prisma";
import { compare } from "bcryptjs";
import { LoginFormSchema } from "@/schemas/auth.schema";
import { z } from 'zod';

type Credentials = z.infer<typeof LoginFormSchema>;

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			// @ts-ignore
			async authorize(credentials: Credentials) {
				const validation = LoginFormSchema.safeParse(credentials);
				if (validation.success) {
					try {
						const user = await prisma.user.findUnique({
							where: {
								email: credentials.email
							}
						});
						if (user) {
							const passwordResult = await compare(credentials.password, user.password!)
							if (passwordResult === true) {
								return {
									id: user.id,
									email: user.email,
									name: user.name,
									role: user.role,
									createdAt: user.createdAt
								};
							} else {
								return null;
							}
						}
					} catch (error) {
						return null;
					}
				} else {
					return null;
				}
			}
		})
	],
	callbacks: {
		// @ts-ignore
		async jwt({ token, user, account }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		// @ts-ignore
		async session({ session, token }) {
			const user = token.user;
			if (user) {
				return {
					user: { ...user },
					expires: session.expires,
					token: token.jti
				}
			}
		}
	},
	session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
		maxAge: 60 * 60 * 24 * 30
	},
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/login'
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }