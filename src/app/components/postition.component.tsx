import { IPosition } from "../../interfaces/position.interface";

interface IPositionProps {
  position: IPosition;
}

export default function Position({ position }: IPositionProps) {
  return (
    <div className="position">
      <div className="position__name">{position.name}</div>
      <div className="position__dates">
        {position.start} - {position.until_now ? "Now" : position.end}
      </div>
    </div>
  );
}
