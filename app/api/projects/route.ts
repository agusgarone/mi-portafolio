import { NextResponse } from "next/server";
import projects from "@/app/data/projects.json";

export async function GET() {
  return NextResponse.json(projects);
}
