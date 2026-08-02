import Link from "next/link";
import { loadCatalog } from "@/lib/products.server";

const mainCategories = [
  { label: "الصفحة الرئيسية", href: "/" },
  { label: "العروض", href: "/products?q=عرض" },
  { label: "إلكترونيات", href: "/products?category=إلكترونيات" },
  { label: "صحة وجمال", href: "/products?category=صحة وجمال" },
  { label: "المنزل والحديقة", href: "/products?category=المنزل والحديقة" },
  { label: "أدوات منزلية", href: "/products?category=أدوات واجهزة منزلية" },
  { label: "ألعاب وهوايات", href: "/products?category=ألعاب وهوايات" },
  { label: "ملابس", href: "/products?category=ملابس وإكسسوارات" },
  { label: "السيارات", href: "/products?category=مستلزمات السيارات" },
];

export default function CategoryMenu() {
  const catalog = loadCatalog();

  return (
    <nav className="border-b border-[#ebebeb] bg-white">
      <div className="mx-auto max-w-[1400px] overflow-x-auto px-4 lg:px-6">
        <ul className="flex min-w-max items-center gap-1 py-0">
          {mainCategories.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block whitespace-nowrap px-3 py-3 text-sm font-bold text-[#333] hover:bg-[#f5f5f5] hover:text-[#e53935]"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {catalog.categories.slice(0, 4).map((cat) => (
            <li key={cat} className="hidden xl:block">
              <Link
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="block whitespace-nowrap px-3 py-3 text-sm text-[#555] hover:text-[#e53935]"
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
