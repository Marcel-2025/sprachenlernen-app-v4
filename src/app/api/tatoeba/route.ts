import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") || "deu";
  const to = searchParams.get("to") || "eng";
  const limit = Math.min(Number(searchParams.get("limit") || "50"), 200);

  const url = new URL("https://api.tatoeba.org/unstable/sentences");
  url.searchParams.set("lang", from);
  url.searchParams.set("trans:lang", to);
  url.searchParams.set("trans:is_direct", "yes");
  url.searchParams.set("sort", "random");
  url.searchParams.set("limit", String(limit));
  // Optional: nur “saubere” Sätze, indem du unapproved/orphan rausfilterst:
  url.searchParams.set("is_unapproved", "no");
  url.searchParams.set("trans:is_unapproved", "no");

  const res = await fetch(url.toString(), {
    headers: { "accept": "application/json" },
    // Next: no-cache on server (dev friendly)
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Tatoeba API error: ${res.status}` },
      { status: 500 }
    );
  }

  const json = await res.json();
  return NextResponse.json(json);
}
