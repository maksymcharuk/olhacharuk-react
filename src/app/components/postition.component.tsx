import { IPosition } from "../../interfaces/position.interface";
import { format } from "date-fns";

interface IPositionProps {
  position: IPosition;
}

export default function Position({ position }: IPositionProps) {
  const formatDate = (date: string) => {
    return format(new Date(date), "MMM yyyy");
  };

  return (
    <div className="position">
      <div className="position__name">{position.name}</div>
      <div className="position__dates">
        {formatDate(position.start)} -{" "}
        {position.until_now ? "Now" : formatDate(position.end)}
      </div>
    </div>
  );
}
