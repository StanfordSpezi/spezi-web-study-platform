import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";

const RootComponent = () => {
  return (
    <>
      <HeadContent />
      <div className="grid h-svh grid-rows-[1fr]">
        <Outlet />
      </div>
    </>
  );
};

export const Route = createRootRouteWithContext()({
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
