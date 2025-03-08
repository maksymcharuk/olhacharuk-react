import React, { PropsWithChildren, useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import GridItem from "./grid-item.component";
import { Rect, Breakpoint } from "./types";

interface IGridProps {
  columnWidth?: number | string;
  gap: number;
  horizontal?: boolean;
  breakpoints?: Breakpoint[];
}

export default function Grid({
  columnWidth,
  gap,
  horizontal,
  breakpoints,
  children,
}: PropsWithChildren<IGridProps>) {
  const [ref, bounds] = useMeasure();
  const [rects, setRects] = useState<Rect[]>([]);
  const [gridHeight, setGridHeight] = useState(0);
  const [childHeights, setChildHeights] = useState<number[]>([]);
  const [currentColumnWidth, setCurrentColumnWidth] = useState<
    number | string | undefined
  >(columnWidth);

  useEffect(() => {
    updateLayout();
  }, [bounds.width, children, childHeights]);

  useEffect(() => {
    if (breakpoints) {
      const sortedBreakpoints = [...breakpoints].sort(
        (a, b) => a.minWidth - b.minWidth
      );
      const matchedBreakpoint = sortedBreakpoints
        .reverse()
        .find((bp) => bounds.width >= bp.minWidth);
      if (matchedBreakpoint) {
        setCurrentColumnWidth(
          columnWidth
            ? columnWidth
            : `${Math.round(100 / matchedBreakpoint.columnsNumber)}%`
        );
      }
    }
  }, [bounds.width, breakpoints, columnWidth]);

  function getColumnLengthAndWidth(
    containerWidth: number,
    value: number | string,
    gutter: number
  ): [number, number] {
    if (typeof value === "number") {
      const columnWidth = parseFloat(value.toString());

      return [
        Math.floor(
          (containerWidth - (containerWidth / columnWidth - 1) * gutter) /
            columnWidth
        ),
        columnWidth,
      ];
    }

    const columnPercentage = parseFloat(value) / 100;
    const maxColumn = Math.floor(1 / columnPercentage);
    const columnWidth = (containerWidth - gutter * (maxColumn - 1)) / maxColumn;

    return [maxColumn, columnWidth];
  }

  function createArray<T>(v: T, l: number): T[] {
    const array = [];
    for (let i = 0; i < l; i += 1) array.push(v);
    return array;
  }

  function updateLayout() {
    const containerWidth = bounds.width;
    const [maxColumn, singleColumnWidth] = getColumnLengthAndWidth(
      containerWidth,
      currentColumnWidth || columnWidth || 1,
      gap
    );
    const columnHeights = createArray(0, maxColumn);

    let currentColumn = 0;
    let rects;

    if (horizontal) {
      rects = childHeights.map((height) => {
        const column = columnHeights.indexOf(Math.min(...columnHeights));
        const left = column * singleColumnWidth + column * gap;
        const top = columnHeights[column];

        columnHeights[column] += Math.round(height) + gap;

        return { top, left, width: singleColumnWidth, height };
      });
    } else {
      rects = childHeights.map((height) => {
        const column =
          currentColumn >= maxColumn - 1 ? maxColumn - 1 : currentColumn;
        const left = column * singleColumnWidth + column * gap;
        const top = columnHeights[column];

        columnHeights[column] += Math.round(height) + gap;
        if (columnHeights[column] >= Math.max(...columnHeights)) {
          currentColumn += 1;
        }

        return { top, left, width: singleColumnWidth, height };
      });
    }

    const width = maxColumn * singleColumnWidth + (maxColumn - 1) * gap;
    const height = Math.max(...columnHeights) - gap;
    const finalRects = rects.map((o) => ({
      ...o,
      left: o.left + (containerWidth - width) / 2,
    }));

    if (Number.isFinite(height)) {
      setGridHeight(height);
    }
    setRects(finalRects);
    return { rects: finalRects, actualWidth: width, height, singleColumnWidth };
  }

  function handleMeasure(index: number, height: number) {
    setChildHeights((prevHeights) => {
      const newHeights = [...prevHeights];
      newHeights[index] = height;
      return newHeights;
    });
  }

  return (
    <div ref={ref} style={{ position: "relative", height: gridHeight }}>
      {React.Children.map(children, (child, i) => (
        <GridItem
          key={i}
          rect={rects[i]}
          onMeasure={(height) => handleMeasure(i, height)}
        >
          {child}
        </GridItem>
      ))}
    </div>
  );
}
