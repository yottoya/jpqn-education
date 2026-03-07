import { NextResponse } from "next/server";
import { Person } from "@/app/people/page";
import { data } from "./data";

export async function GET(): Promise<NextResponse<Person[]>> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return NextResponse.json(data);
}
