import { Person } from "../page";
import { Skeleton } from "@/components/ui/skeleton";

export default async function TestDetails({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/people/${id}`);

  const person: Person = await res.json();

  return (
    <div>
      {person.id}

      <h1>{person.name}</h1>

      <span>Details:</span>

      <ul>
        <li>{person.gender}</li>
        <li>{person.bio}</li>
      </ul>
    </div>
  );
}
