import ProductCard from "@/components/PeopleCard";
import { Suspense } from "react";

export interface Person {
  id: number;
  name: string;
  bio: string;
  age: number;
  gender: string;
}

export default async function TestPage() {
  const res = await fetch("http://localhost:3000/api/people");

  const data = await res.json();

  return (
    <div className="flex flex-wrap gap-8 justify-start">
      {data.map((person: Person) => (
        <Suspense key={person.id}>
          <ProductCard key={person.id} person={person} />
        </Suspense>
      ))}
    </div>
  );
}
