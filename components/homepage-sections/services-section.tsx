import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import services from "@/data/services.json";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <p className="text-center text-lg mb-8">
          To provide educational and developmental programs designed to support
          confidence, communication, and academic growth.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <Card>
              <CardHeader>
                <CardTitle>{s.name}</CardTitle>
              </CardHeader>
              <CardContent>{s.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
