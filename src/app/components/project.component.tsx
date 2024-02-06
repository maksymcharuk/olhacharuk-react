import { ReactImageGalleryItem } from "react-image-gallery";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { IProject } from "../../interfaces/project.interface";
import Gallery from "./gallery.component";
import useAnalyticsEventTracker from "../../hooks/useAnalyticsEventTracker";
import { MouseEvent } from "react";

interface IProjectProps {
  project: IBaseStrapiEntity<IProject>;
}

export default function Project({ project }: IProjectProps) {
  const gaEventTracker = useAnalyticsEventTracker("project");

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

  const getImages = (): ReactImageGalleryItem[] => {
    return project.attributes.images.data.map((image) => ({
      original: image.attributes.url,
    }));
  };

  const onProjectLinkClick = (event: MouseEvent) => {
    gaEventTracker("link_clicked", event.currentTarget.textContent || "");
  };

  return (
    <div className="project">
      <div className="project__main">
        <div className="project__images project__images--desktop">
          <Gallery images={getImages()} />
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
        <div className="project__sidebar-inner">
          <h3 className="project__name">{project.attributes.name}</h3>
          <div className="project__images project__images--mobile">
            <Gallery images={getImages()} />
          </div>
          <div className="project__company">
            <div>DESIGNED AT</div>
            {project.attributes.company}
          </div>
          <div className="project__details">
            {project.attributes.details.map((detail) => (
              <div key={detail.id} className="project__details-item">
                <div className="project__details-item-title">
                  {detail.title}
                </div>
                <div className="project__details-item-subtitle">
                  {detail.subtitle}
                </div>
              </div>
            ))}
          </div>
          <div className="project__links">
            {project.attributes.links.map((link) => (
              <div key={link.id} className="project__links-item">
                <a
                  href={link.url}
                  onClick={onProjectLinkClick}
                  target="_blank"
                  rel="nofollow"
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
