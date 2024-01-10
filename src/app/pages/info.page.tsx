import { useEffect, useState } from "react";
import { getInfoPage } from "../../services/pages.services";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { IInfoPage } from "../../interfaces/info-page.interface";
import Experience from "../components/experience.component";

export default function InfoPage() {
  const [infoPage, setInfoPage] = useState<IBaseStrapiEntity<IInfoPage> | null>(
    null
  );

  useEffect(() => {
    getInfoPage().then((data) => {
      setInfoPage(data);
    });
  }, []);

  if (!infoPage) {
    return <>Loading</>;
  }

  return (
    <div className="info-page">
      <div className="info-page__row">
        <div className="info-page__column info-page__column--fixed">
          <ul>
            {infoPage.attributes.links.map((link) => (
              <li key={link.id}>
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="info-page__column">
          <p
            dangerouslySetInnerHTML={{
              __html: infoPage.attributes.description[0].children[0].text,
            }}
          ></p>
        </div>
      </div>
      <div className="info-page__row">
        <div className="info-page__column info-page__column--fixed">
          <h4 className="info-page__column-title">Experience</h4>
          <div className="info-page__experience-list">
            {infoPage.attributes.experience.map((experience) => (
              <div
                key={experience.id}
                className="info-page__experience-list-item"
              >
                <Experience experience={experience} />
              </div>
            ))}
          </div>
        </div>
        <div className="info-page__column">
          <h4 className="info-page__column-title">Published work</h4>
          <ul>
            {infoPage.attributes.published_work.map((work) => (
              <li key={work.id}>
                <a href={work.url}>{work.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="info-page__column">
          <h4 className="info-page__column-title">Clients</h4>
          <ul>
            {infoPage.attributes.clients.map((client) => (
              <li key={client.id}>{client.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
