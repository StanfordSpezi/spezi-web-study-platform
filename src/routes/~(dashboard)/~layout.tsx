import { createFileRoute, redirect } from "@tanstack/react-router";
import { currentUserQueryOptions } from "@/lib/queries/currentUser";

// This layout route is used to ensure that the user is authenticated
// before accessing the dashboard.
export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    try {
      await queryClient.ensureQueryData(currentUserQueryOptions());
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          // User is not authenticated, allow the sign-in page to load.
          return redirect({
            to: "/sign-in",
            search: { redirect: location.href },
          });
        }
      }

      console.error("Error checking authentication status:", error);

      const message =
        error instanceof Error ?
          error.message
        : "An unexpected error occurred while checking authentication status";
      return redirect({
        to: "/error",
        search: { message },
      });
    }
  },
});
