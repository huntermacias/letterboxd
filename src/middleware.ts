import { authMiddleware } from "@clerk/nextjs";

// This configuration protects all routes except for the specified public routes.
// The '/api/webhooks/clerk' route is included in publicRoutes to allow webhook handling without authentication.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/", // home route is public
    "/api/webhooks/clerk", // Allow unauthenticated access to the webhook endpoint
   
  ]
});

export const config = {
  // The matcher is configured to apply the middleware to all routes except for static files and '_next' build artifacts.
  // Adjust as necessary for your application's routing structure.
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
