import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.6 + delay, // Wait for page transition to complete
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}