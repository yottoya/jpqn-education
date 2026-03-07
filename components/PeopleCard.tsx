"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Person } from "@/app/people/page";
import Link from "next/link";

export default function ProductCard({ person }: { person: Person }) {
  return (
    <Card key={person.id} className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>{person.name}</CardTitle>
        <CardDescription>Data:</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{person.bio}</p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          className="w-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          <Link href={`/people/${person.id}`}>Action</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
