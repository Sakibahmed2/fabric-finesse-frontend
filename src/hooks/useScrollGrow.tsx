import { time } from "console";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TScrollProps = {
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  time?: any;
};

const useScrollGrow = ({ x, y, scale, opacity, time }: TScrollProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["0 1", `${time} 1`],
  });

  const scaleValue = useTransform(scrollYProgress, [0, 1], [scale, 1]);
  const opacityValue = useTransform(scrollYProgress, [0, 1], [opacity, 1]);
  const xValue = useTransform(scrollYProgress, [0, 1], [x, 1]);
  const yValue = useTransform(scrollYProgress, [0, 1], [y, 1]);

  const style = {
    scale: scaleValue,
    opacity: opacityValue,
    x: xValue,
    y: yValue,
  };

  return { componentRef, style };
};

export default useScrollGrow;
