import { MouseEvent, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getProject } from "../../services/projects.service";
import { IProject } from "../../interfaces/project.interface";
import StoreContext from "../contexts/store.context";
import Animated from "../animated";
import useAnalyticsEventTracker from "../../hooks/useAnalyticsEventTracker";
import { ORIGIN_URL } from "../../configs/constants";
import { getProjectDescription } from "../utilities/project-description.util";
import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const [project, setProject] = useState<IProject | null>(null);
  const { store, setStore } = useContext(StoreContext);
  const gaEventTracker = useAnalyticsEventTracker("project");
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) {
      return;
    }

    if (store.project && store.project.slug === slug) {
      setProject(store.project);
      return;
    }

    getProject(slug).then((data) => {
      setProject(data.attributes);
      setStore({ ...store, project: data.attributes });
    });
  }, [slug]);

  const onProjectLinkClick = (event: MouseEvent) => {
    gaEventTracker("link_clicked", event.currentTarget.textContent || "");
  };

  if (!project) {
    return;
  }

  return (
    <Animated>
      <Helmet>
        <title>Olha Charuk | {project.name}</title>
        <link rel="canonical" href={`${ORIGIN_URL}/work/${project.slug}`} />
      </Helmet>
      <div className="project-page">
        <div className="project-page__wrapper">
          <div className="project-page__main">
            <div className="project-page__description">
              {getProjectDescription(project.description).map(
                (description, i) => (
                  <div key={i} className="project-page__description-column">
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
          <div className="project-page__sidebar">
            <div className="project-page__sidebar-inner">
              <h3 className="project-page__name">{project.name}</h3>
              <div className="project-page__company">
                <div>DESIGNED AT</div>
                {project.company}
              </div>
              <div className="project-page__details">
                {project.details.map((detail) => (
                  <div key={detail.id} className="project-page__details-item">
                    <div className="project-page__details-item-title">
                      {detail.title}
                    </div>
                    <div className="project-page__details-item-subtitle">
                      {detail.subtitle}
                    </div>
                  </div>
                ))}
              </div>
              <div className="project-page__links">
                {project.links.map((link) => (
                  <div key={link.id} className="project-page__links-item">
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
        <div className="project-page__images">
          {project.images.data.map((image) => (
            <img
              className="project-page__image"
              key={image.id}
              src={image.attributes.url}
              alt={image.attributes.alternativeText}
            />
          ))}
        </div>
      </div>
    </Animated>
  );
}
