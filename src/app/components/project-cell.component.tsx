import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { IProject } from "../../interfaces/project.interface";

interface IProjectProps {
  project: IBaseStrapiEntity<IProject>;
}

export default function ProjectCell({ project }: IProjectProps) {
  const imageUrl = project.attributes.images_grid.data[0].attributes.url;

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
        <div className="project-cell__description markdown">
          <Markdown>{project.attributes.description_short}</Markdown>
        </div>
      </div>
    </div>
  );
}
