import { AnimatePresence, AnimationProps, motion } from "framer-motion";

export const withPresenceAnimation = <
  T extends AnimationProps,
  K extends object
>(
  Component: React.ComponentType<K>
) => {
  const PresenceAnimatedComponent = (props: Pick<T, keyof AnimationProps>) => {
    return (
      <AnimatePresence>
        <motion.div {...(props as AnimationProps)}>
          <Component {...(props as K)} />
        </motion.div>
      </AnimatePresence>
    );
  };
  return PresenceAnimatedComponent;
};
