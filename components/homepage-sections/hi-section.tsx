"use client";

import { motion } from "framer-motion";

interface HelloProps {
  idName: string;
}

export default function Hello({ idName }: HelloProps) {
  return (
    <section
      id={idName}
      className="min-h-dvh grid grid-cols-1 md:grid-cols-2"
    >
      <div className="relative h-[50dvh] md:h-full overflow-hidden bg-neutral-100">
        <motion.img
          src="/images/julia-pt.webp"
          alt="Julia"
          className="absolute inset-0 h-full w-full object-cover object-top"
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center justify-center bg-white px-8 py-16 md:py-0">
        <motion.div
          className="max-w-md space-y-6"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="w-12 h-1 bg-primary rounded-full" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
            Hi, I&apos;m Julia
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Helping your children excel beyond what you and they think is
            possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}