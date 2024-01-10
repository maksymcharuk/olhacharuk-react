import { IExperience } from "../../interfaces/experience.interface";
import Position from "./postition.component";

interface IExperienceProps {
  experience: IExperience;
}

export default function Experience({ experience }: IExperienceProps) {
  return (
    <div className="experience">
      <div className="experience__company">
        {experience.company}
        {experience.location ? `, ${experience.location}` : ""}
      </div>
      <ul className="experience__position-list">
        {experience.positions.map((position) => (
          <li key={position.id} className="experience__position-list-item">
            <Position position={position} />
          </li>
        ))}
      </ul>
    </div>
  );
}
