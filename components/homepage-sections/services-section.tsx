import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import services from "@/data/services.json";
import {
  GraduationCap,
  MessageCircle,
  Globe,
  Brain,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Academic Support": GraduationCap,
  "Speech Support": MessageCircle,
  ESL: Globe,
  "Online Support": Globe,
  "Academic Support with Learning Differences": Brain,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          To provide educational and developmental programs designed to support
          confidence, communication, and academic growth.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = iconMap[s.type] || GraduationCap;
            return (
              <Card
                key={s.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{s.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {s.type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}