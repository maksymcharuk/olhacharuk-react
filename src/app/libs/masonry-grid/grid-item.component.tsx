import { PropsWithChildren, useEffect } from "react";
import { Rect } from "./types";
import useMeasure from "react-use-measure";

interface IGridItemProps {
  rect?: Rect;
  onMeasure: (height: number) => void;
}

export default function GridItem({
  rect,
  onMeasure,
  children,
}: PropsWithChildren<IGridItemProps>) {
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    onMeasure(bounds.height);
  }, [bounds.height]);

  function buildStyles(rect?: Rect) {
    if (!rect) {
      return {};
    }

    return {
      width: `${rect.width}px`,
      transform: `translate(${rect.left}px, ${rect.top}px)`,
    };
  }

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: `0`,
        left: `0`,
        ...buildStyles(rect),
        transition: "transform 0.2s",
      }}
    >
      {children}
    </div>
  );
}
