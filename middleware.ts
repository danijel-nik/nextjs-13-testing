import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token);
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    /*
    callbacks: {
      authorized: ({ token }) => {
        return Boolean(token?.user); // token?.role === "admin";
      },
    },
    */
  }
);

export const config = {
    matcher: [
        '/server-actions'
    ]
};