import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub],
	callbacks: {
		signIn({ profile }) {
			return profile?.email === "caff1nepill@gmail.com";
		}
	}
});
