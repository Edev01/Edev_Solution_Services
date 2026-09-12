"use client";

import React from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "transition" | "viewport">;

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = "up",
  ...props
}: StaggerContainerProps) {
  const reduced = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? React.cloneElement(child as React.ReactElement<any>, { variants: itemVariants })
          : child
      )}
    </motion.div>
  );
}