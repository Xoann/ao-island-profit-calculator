import { NextResponse } from "next/server";
import { FARMING_DATA_URL } from "@/utils/constants";

export async function GET() {
  try {
    const res = await fetch(FARMING_DATA_URL);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream request failed", status: res.status },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Cache response on the edge for a short time
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Fetch failed", details: (err as Error).message },
      { status: 500 }
    );
  }
}
