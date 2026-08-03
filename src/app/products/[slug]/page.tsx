import ProductShell from "./shell";

export function generateStaticParams() {
  return [{ slug: "_" }];
}

export default function ProductPage() {
  return <ProductShell />;
}
