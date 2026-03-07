import { Person } from "@/app/people/page";
import { NextRequest, NextResponse } from "next/server";

const people = [
  { id: 1, name: "Smith", age: 15, bio: "Nothing", gender: "Male" },
  { id: 2, name: "Mary", age: 18, bio: "Seems", gender: "Female" },
  { id: 3, name: "Joe", age: 17, bio: "to work", gender: "Male" },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // Type params as a Promise for Next.js 15
): Promise<NextResponse> {
  // 1. Await the params to get the ID from the URL
  const { id } = await params;

  const person = people.find((p) => p.id === parseInt(id));

  // 3. Return a 404 if not found
  if (!person) {
    return NextResponse.json({ error: "Person not found" }, { status: 404 });
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // 4. Return the singular person object
  return NextResponse.json(person);
}
