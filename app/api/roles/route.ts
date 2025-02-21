import { NextResponse } from "next/server";
import roles from "@/app/data/roles.json";

export async function GET() {
  return NextResponse.json(roles);
}
