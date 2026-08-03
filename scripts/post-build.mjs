import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../out");

// ─── _redirects لـ Cloudflare Pages ─────────────────────────
const redirects = `/products/* /products/index/index.html 200
/* /index.html 200
`;

fs.writeFileSync(path.join(OUT_DIR, "_redirects"), redirects, "utf8");
console.log("✓ _redirects written to out/");
