import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://sovegroup.sytes.net/api/v1";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: NextRequest, context: Context) {
  const authHeader = request.headers.get("authorization");
  const body = await request.json();
  const { id } = await context.params;

  try {
    const response = await fetch(`${API_BASE}/blocks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { detail: "Failed to update block" },
      { status: 500 },
    );
  }
}
