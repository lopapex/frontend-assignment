// AnimatedLayout.tsx

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedLayoutProps = {
  children: ReactNode;
}

// I want a fade in bottom-up - fade out top-down animation
// so these are my variants
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const AnimatedLayout = ({ children }: AnimatedLayoutProps) => (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{duration: 0.5, type: "easeInOut"}}
      className="relative"
    >
      {children}
    </motion.div>
  );

export default AnimatedLayout;