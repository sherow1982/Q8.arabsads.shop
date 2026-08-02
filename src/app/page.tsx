import { featuredProducts } from "@/data/products";

const highlights = [
  "منتجات حقيقية من ملف TSV",
  "واجهة عربية جاهزة للتسويق",
  "تصميم مناسب لـ Cloudflare Pages",
  "قابل للتوسعة لاحقًا في السلة والدفع",
];

const features = [
  {
    title: "عرض احترافي",
    text: "الصفحة تظهر منتجات حقيقية من متجر Matajer مع أسعار وصور مباشرة قابلة للتعديل لاحقًا.",
  },
  {
    title: "تصميم مناسب للشراء",
    text: "تم بناء الواجهة على أسلوب متجر عربي واضح، مع معلومات المنتج في قسم مميز وسهل القراءة.",
  },
  {
    title: "جاهز للنشر",
    text: "تم ضبط المشروع ليكون قابلًا للنشر على Cloudflare Pages كتصميم ثابت مع export Next.js.",
  },
];

const specRows = [
  ["المنتجات", "قائمة من ملف بيانات المنتجات"],
  ["الطريقة", "تصميم متجر عربي لعرض المنتجات"],
  ["الحالة", "جاهز للرفع السريع"],
  ["النشر", "Cloudflare Pages"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="text-2xl font-black tracking-tight text-amber-700">GStore</div>
          <nav className="hidden gap-6 text-sm font-semibold text-slate-700 md:flex">
            <a href="#home">الرئيسية</a>
            <a href="#products">المنتجات</a>
            <a href="#details">الميزات</a>
            <a href="#faq">الأسئلة</a>
          </nav>
          <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white">
            ابدأ الطلب
          </button>
        </div>
      </header>

      <section id="home" className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
        <div className="rounded-[28px] bg-gradient-to-br from-amber-50 via-white to-stone-100 p-6 shadow-sm ring-1 ring-black/5">
          <div className="rounded-[24px] bg-[radial-gradient(circle_at_top,_#f8d88a,_#f59e0b_45%,_#56514f_100%)] p-10 text-center text-white shadow-inner">
            <div className="mx-auto flex h-80 max-w-md items-center justify-center rounded-[20px] border border-white/40 bg-black/10 backdrop-blur-sm">
              <img
                src={featuredProducts[0].image}
                alt={featuredProducts[0].title}
                className="h-full w-full rounded-[20px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="text-sm font-bold text-amber-700">منتجات تم استردادها من الملف</div>
          <h1 className="text-4xl font-black leading-tight text-slate-900 lg:text-5xl">
            {featuredProducts[0].title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-700">
              4.8/5
            </span>
            <span>منتجات مختارة من بيانات متجر حقيقية</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{featuredProducts[0].price}</div>
          <p className="text-lg leading-8 text-slate-600">
            {featuredProducts[0].description}
          </p>

          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={featuredProducts[0].url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-amber-600 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-amber-600/20"
            >
              أضف إلى السلة الآن
            </a>
            <button className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900">
              طلب سريع
            </button>
          </div>
        </div>
      </section>

      <section id="details" className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="mb-3 text-xl font-black text-slate-900">{feature.title}</h3>
              <p className="text-base leading-7 text-slate-600">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="rounded-[28px] bg-slate-900 p-6 text-white">
          <h2 className="mb-4 text-2xl font-black">مواصفات الصفحة</h2>
          <ul className="space-y-3">
            {specRows.map(([key, value]) => (
              <li key={key} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <span className="text-slate-300">{key}</span>
                <span className="font-bold">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-2xl font-black text-slate-900">لماذا هذه الصفحة مناسبة؟</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] bg-amber-50 p-5">
              <div className="mb-2 text-sm font-bold text-amber-700">صور واقعية</div>
              <p className="text-sm leading-7 text-slate-600">تستند إلى روابط الصور الخاصة بالمنتجات المستخرجة من الملف.</p>
            </div>
            <div className="rounded-[20px] bg-stone-100 p-5">
              <div className="mb-2 text-sm font-bold text-stone-700">قابلية التوسع</div>
              <p className="text-sm leading-7 text-slate-600">يمكنك توسيع قائمة المنتجات لاحقًا مع زر السلة والدفع بسهولة.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">منتجات مختارة من الملف</h2>
          <span className="text-sm font-semibold text-slate-500">{featuredProducts.length} منتجات</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <article key={product.title} className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 overflow-hidden rounded-[18px] bg-stone-100">
                <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
              </div>
              <div className="mb-2 text-xs font-bold text-amber-700">{product.badge}</div>
              <h3 className="line-clamp-2 text-lg font-black text-slate-900">{product.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-base font-bold text-slate-900">{product.price}</div>
                  {product.oldPrice ? <div className="text-xs text-slate-400 line-through">{product.oldPrice}</div> : null}
                </div>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white"
                >
                  تفاصيل
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 text-2xl font-black text-slate-900">الأسئلة الشائعة</h2>
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            <p><strong>هل يمكن توسيع القائمة؟</strong> نعم، كل منتج يُدرج في ملف بيانات منفصل بسهولة.</p>
            <p><strong>هل المشروع قريب من النشر؟</strong> نعم، المشروع جاهز بالفعل لـ Cloudflare Pages.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
