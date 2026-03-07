import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <Card>
            <CardHeader>
              <CardTitle>Individualized Homeschool Instruction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Ideal for:</p>
              <ul className="space-y-2">
                <li>• Families homeschooling full or part-time</li>
                <li>
                  • Children who benefit from smaller learning environments
                </li>
                <li>
                  • Students who need flexible pacing and routine-based
                  instruction
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Tutoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                One-on-one and in small groups, designed to support students
                across a range of abilities and learning styles.
              </p>
              <p className="mb-4">Best supports:</p>
              <ul className="space-y-2">
                <li>
                  • General education students who need more help outside of
                  school
                </li>
                <li>
                  • Students with learning differences who learn differently
                  from the method taught at school
                </li>
                <li>• Neurodivergent learners</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Developmental Learning and Communication Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                For children with autism and other learning differences in an
                educational setting.
              </p>
              <p className="mb-4">Focuses on:</p>
              <ul className="space-y-2">
                <li>• Learning readiness and engagement</li>
                <li>• Functional communication support</li>
                <li>• Social learning through structured activities</li>
                <li>• Sensory-informed learning strategies</li>
                <li>• Routine-based instruction</li>
              </ul>
              <p className="text-sm italic mt-4">
                All services are educational and developmental in nature and are
                designed to support learning, not replace therapeutic or medical
                services.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
