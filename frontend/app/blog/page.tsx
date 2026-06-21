import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ComingSoon } from "@/components/PageScaffold";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Engineering, design, and applied research posts from the Advyay team.",
  path: "/blog"
});

export default function BlogIndex() {
  return (
    <ComingSoon
      eyebrow="BLOG"
      title="Long-form writing on Agentic AI in production."
      body="We ship the blog quarterly. Topics you'll see first: eval-driven agent development, structured memory for production agents, and the business case for Agentic AI."
    />
  );
}
