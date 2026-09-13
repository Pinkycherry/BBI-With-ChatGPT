import { createFileRoute } from "@tanstack/react-router";
import { BlueprintPage, createBlueprintPlaceholder } from "@/components/bbi/blueprint";

export const Route = createFileRoute("/idea/$slug")({
  head: () => ({
    meta: [
      { title: "Business idea blueprint | BBI" },
      { name: "description", content: "A BBI blueprint template for reading who pays, how the money works, what hurts in year one, and founder fit." },
    ],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  // PLACEHOLDER: all research columns are intentionally template slots until supplied as props.
  return <BlueprintPage {...createBlueprintPlaceholder({ slug })} />;
}
