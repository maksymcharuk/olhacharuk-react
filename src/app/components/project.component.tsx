import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { IProject } from "../../interfaces/project.interface";

interface IProjectProps {
  project: IBaseStrapiEntity<IProject>;
}

export default function Project({ project }: IProjectProps) {
  const getDescription = (): [string[], string[]] => {
    const description = project.attributes.description;
    const descriptionMiddle = Math.ceil(description.length / 2);
    const firstDescriptionsPart = description.slice(0, descriptionMiddle);
    const secondDescriptionsPart = description.slice(descriptionMiddle);

    const firstPart = firstDescriptionsPart.map(
      (description) => description.children[0].text
    );

    const secondPart = secondDescriptionsPart.map(
      (description) => description.children[0].text
    );

    return [firstPart, secondPart];
  };

  return (
    <div className="project">
      <div className="project__main">
        <div className="project__images">
          <img src={project.attributes.images.data[0].attributes.url} />
        </div>
        <div className="project__description">
          {getDescription().map((description, i) => (
            <div key={i} className="project__description-column">
              {description.map((paragraph, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="project__sidebar">
        <h4 className="project__name">{project.attributes.name}</h4>
        <div className="project__company">
          <div>DESIGNED AT</div>
          {project.attributes.company}
        </div>
        <div className="project__details">
          {project.attributes.details.map((detail) => (
            <div key={detail.id} className="project__details-item">
              <div className="project__details-item-title">{detail.title}</div>
              <div className="project__details-item-subtitle">
                {detail.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
