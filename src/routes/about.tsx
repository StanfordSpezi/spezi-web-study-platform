import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => <div>Hello "/about"!</div>;

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});
