import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const variants = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.2,
    },
  },
};

export default function Animated({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="animated"
      initial="initial"
      animate="final"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
