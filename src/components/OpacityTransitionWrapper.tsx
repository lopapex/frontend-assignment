import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type OpacityTransitionWrapperProps = {
  children: ReactNode;
};

export const OpacityTransitionWrapper = ({ children }: OpacityTransitionWrapperProps) => {
  const animationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  };

  return (
    <motion.div {...animationProps}>
      {children}
    </motion.div>
  );
};
