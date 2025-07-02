import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/influencers/:path*", "/"],
};
