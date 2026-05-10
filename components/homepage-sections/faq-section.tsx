import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is your teaching philosophy?",
    answer:
      "We focus on building genuine confidence through small, steady improvements and mastering fundamentals. Learning is made fun with games and real-life lessons. We celebrate every small win.",
  },
  {
    question: "Do you only work with special needs students?",
    answer:
      "No. We support all students, from regular academics and homeschooling to speech/communication support, as well as learning differences.",
  },
  {
    question: "Where do sessions take place?",
    answer:
      "Sessions are held at our office: 9801 Westheimer Rd, Suite 429, Houston, TX 77042. Limited online sessions are available.",
  },
  {
    question: "Why do you recommend 4-5 hours per week?",
    answer:
      "Consistent weekly hours lead to faster progress and better results. Our pricing also gives the best value at 4-5 hours per week.",
  },
  {
    question: "Is your Speech program the same as speech therapy?",
    answer:
      "No. I am not a licensed Speech-Language Pathologist. This is supportive, play-based communication designed to build confidence and sounds in a nurturing environment.",
  },
  {
    question:
      "What causes no grade improvement despite attending JPQN Education?",
    answer:
      "Every student is different, so are the results. At JPQN Education, we hold students accountable if they fail to let the tutor know of upcoming tests/quizzes, project deadlines, and missing/late assignments. We love our students, and we believe holding them responsible helps them prevent future mistakes. We are here to teach, explain concepts, and apply the topics learned. While we always make sure students understand their work/topics before tests, some students may become overwhelmed on the day of the test. ",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We prefer a 24-hour advance notice for cancellations. We know things happen, so we are flexible. However, if given less than an hour's notice, we will charge a $40 fee. Makeup sessions are scheduled based on availability.",
  },
  {
    question: "How do I get started?",
    answer:
      "Contact us to schedule a $5 initial consultation. This helps us understand your child's needs and recommend the best package. Spots are limited.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-lg border px-4"
            >
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

