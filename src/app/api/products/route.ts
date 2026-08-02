import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/products.server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit = Math.min(48, Math.max(1, Number(searchParams.get("limit") ?? "24")));

  const result = searchProducts({ q, category, page, limit });
  return NextResponse.json(result);
}
