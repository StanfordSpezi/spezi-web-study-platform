import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => <div>Hello "/"!</div>;

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
