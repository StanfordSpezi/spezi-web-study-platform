import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: "Spezi Study Platform" },
      {
        name: "description",
        content:
          "Spezi Study Platform is a web application that allows users to create and manage studies.",
      },
    ],
    links: [{ rel: "icon", href: "favicon.ico" }],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <div className="grid h-svh grid-rows-[1fr]">
        <Outlet />
      </div>
    </>
  );
}
