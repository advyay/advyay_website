import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/domain/products";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/primitives/Button";
import { CTA } from "@/components/sections/CTA";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return {};
  const path = `/products/${product.slug}`;
  return buildMetadata({
    title: `${product.name} — ${product.oneLiner}`,
    description: product.description,
    path
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();
  const jsonLd = productJsonLd({
    name: product.name,
    description: product.description,
    url: `https://www.advyay.com/products/${product.slug}`
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <section className="pt-32 md:pt-40 pb-16">
          <Container>
            <p className="eyebrow">{product.category} · {product.status}</p>
            <h1 className="display-heading mt-6 text-[2.5rem] sm:text-h1 md:text-display text-paper-50 max-w-4xl">
              {product.name}
              <span className="block text-paper-200 mt-2 text-h5 md:text-h4 font-normal">
                {product.oneLiner}
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-body-lg text-paper-200">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" size="lg">Request a pilot</Button>
              <Button href="/demo" variant="secondary" size="lg">See it work</Button>
            </div>
          </Container>
        </section>

        <div className="section-divider" />

        <section className="section">
          <Container>
            <SectionHeader
              eyebrow="WHAT IT DOES"
              title="Capabilities that survive a security review."
              description="Each capability is exposed with explicit contracts — model, latency, evaluators, audit hooks."
            />
            <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {product.capabilities.map((c, idx) => (
                <li key={c} className="card p-5 flex items-start gap-3">
                  <span className="font-mono text-micro text-paper-300 mt-1">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body-sm text-paper-100">{c}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <CTA />
      </article>
    </>
  );
}
