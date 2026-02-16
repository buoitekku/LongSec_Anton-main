import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function FadeInSection({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ""
}: FadeInSectionProps) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -40 },
    right: { x: 40 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 20
      }}
      animate={{ 
        opacity: 1, 
        y: 0
      }}
      transition={{
        duration: 0.6,
        delay: 0.6 + delay, // Wait for page transition to complete
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}