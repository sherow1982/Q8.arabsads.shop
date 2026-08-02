import Link from "next/link";
import { ceilPrice, formatPrice, getProductPath, hasDiscount } from "@/types/product";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const discounted = hasDiscount(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-[#eee] bg-white transition hover:border-[#ddd] hover:shadow-md">
      <Link href={getProductPath(product)} prefetch={false} className="relative block aspect-square overflow-hidden bg-[#fafafa]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-80 items-center justify-center text-sm text-[#999]">بدون صورة</div>
        )}
        {discounted ? (
          <span className="absolute left-2 top-2 rounded bg-[#e53935] px-2 py-0.5 text-[11px] font-bold text-white">
            خصم
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <Link href={getProductPath(product)} prefetch={false}>
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-[#333] group-hover:text-[#e53935]">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto pt-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-black text-[#333]">
              <span className="text-xs font-bold">KD</span> {formatPrice(product)}
            </span>
            {discounted && product.price != null ? (
              <span className="text-xs text-[#999] line-through">
                KD {ceilPrice(product.price).toFixed(3)}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-[11px] text-[#888]">{product.category}</p>
        </div>

        <Link
          href={getProductPath(product)}
          prefetch={false}
          className="mt-3 block rounded bg-[#333] py-2 text-center text-xs font-bold text-white opacity-0 transition group-hover:opacity-100 hover:bg-[#e53935]"
        >
          عرض التفاصيل
        </Link>
      </div>
    </article>
  );
}
