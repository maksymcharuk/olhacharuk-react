import { Link } from "react-router-dom";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { IProject } from "../../interfaces/project.interface";
import Gallery from "./gallery.component";
import useAnalyticsEventTracker from "../../hooks/useAnalyticsEventTracker";
import { MouseEvent } from "react";
import { getProjectDescription } from "../utilities/project-description.util";
import { getGalleryImages } from "../utilities/gallery-images.util";
interface IProjectProps {
  project: IBaseStrapiEntity<IProject>;
}

export default function Project({ project }: IProjectProps) {
  const gaEventTracker = useAnalyticsEventTracker("project");

  const onProjectLinkClick = (event: MouseEvent) => {
    gaEventTracker("link_clicked", event.currentTarget.textContent || "");
  };

  return (
    <div className="project">
      <div className="project__main">
        <div className="project__images project__images--desktop">
          <Gallery images={getGalleryImages(project.attributes.images)} />
        </div>
        <div className="project__description">
          {getProjectDescription(project.attributes.description).map(
            (description, i) => (
              <div key={i} className="project__description-column">
                {description.map((paragraph, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <div className="project__sidebar">
        <div className="project__sidebar-inner">
          <h3 className="project__name">
            <Link
              className="project__name-link"
              to={`/work/${project.attributes.slug}`}
            >
              {project.attributes.name}
            </Link>
          </h3>
          <div className="project__images project__images--mobile">
            <Gallery images={getGalleryImages(project.attributes.images)} />
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
