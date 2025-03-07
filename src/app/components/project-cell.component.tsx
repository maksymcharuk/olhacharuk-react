import { Link } from "react-router-dom";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { IProject } from "../../interfaces/project.interface";
import { getProjectDescription } from "../utilities/project-description.util";

interface IProjectProps {
  project: IBaseStrapiEntity<IProject>;
}

export default function ProjectCell({ project }: IProjectProps) {
  const description = getProjectDescription(project.attributes.description)[0];
  const imageUrl = project.attributes.images.data[0].attributes.url;

  return (
    <div className="project-cell">
      <div className="project-cell__main">
        <div className="project-cell__images">
          <img src={imageUrl} />
        </div>
        <h3 className="project-cell__name">
          <Link
            className="project-cell__name-link"
            to={`/work/${project.attributes.slug}`}
          >
            {project.attributes.name}
          </Link>
        </h3>
        <div className="project-cell__description">{description}</div>
      </div>
    </div>
  );
}
