import ProductShell from "./shell";

export function generateStaticParams() {
  return [{ slug: "index" }];
}

export default function ProductPage() {
  return <ProductShell />;
}
