export const fadeAnimations = {
  visible: {
    opacity: 1,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
};

export const opacityAnimations = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

export const transitionMd = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
};

export const transitionLg = {
  type: "spring",
  duration: 0.5,
  bounce: 0,
};

export const transitionXl = {
  type: "spring",
  duration: 1.0,
  bounce: 0,
};

export const transitionDampingMd = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};
