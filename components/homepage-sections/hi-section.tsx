"use client";

import { motion } from "framer-motion";

interface HelloProps {
  idName: string;
}

export default function Hello({ idName }: HelloProps) {
  return (
    <section
      id={idName}
      // 1. overflow-hidden kills the side-scroll
      // 2. flex flex-col + justify-between keeps text top, image bottom
      className="relative min-h-dvh bg-red-400 flex flex-col items-center justify-between overflow-hidden"
    >
      <h1 className="text-5xl font-bold text-white pt-20 z-10">
        Hi, I'm Julia
      </h1>

      {/* This Container is the "Crop Window" 
        h-[70dvh] means it takes up 70% of the screen height
      */}
      <div className="relative w-full h-[70dvh] flex justify-center items-end">
        <motion.img
          src="/images/julia-pt.webp"
          alt="Julia"
          // h-[110%] or h-[120%] makes it "zoomed in" relative to the window
          // max-w-none allows it to be wider than the screen
          // object-top ensures we see your face, not just your stomach!
          className="h-[120%] w-auto max-w-none object-cover object-top origin-bottom"
          // Animation: Pop up and grow from the floor
          initial={{ y: 100, scale: 0.9, opacity: 0 }}
          whileInView={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
