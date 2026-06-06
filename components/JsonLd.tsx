import { jsonLdScript } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />;
}
