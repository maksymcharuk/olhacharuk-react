import { useContext, useEffect, useState } from "react";
import { getInfoPage } from "../../services/pages.services";
import { IInfoPage } from "../../interfaces/info-page.interface";
import Experience from "../components/experience.component";
import { StoreContext } from "../root";

export default function InfoPage() {
  const [infoPage, setInfoPage] = useState<IInfoPage | null>(null);
  const { store, setStore } = useContext(StoreContext);

  useEffect(() => {
    if (!store.infoPage) {
      getInfoPage().then((data) => {
        setInfoPage(data.attributes);
        setStore({ ...store, infoPage: data.attributes });
      });
    } else {
      setInfoPage(store.infoPage);
    }
  }, [store, setStore]);

  if (!infoPage) {
    return <>Loading</>;
  }

  return (
    <div className="info-page">
      <div className="info-page__row">
        <div className="info-page__column info-page__column--fixed">
          <ul>
            {infoPage.links.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="info-page__column">
          <p
            dangerouslySetInnerHTML={{
              __html: infoPage.description[0].children[0].text,
            }}
          ></p>
        </div>
      </div>
      <div className="info-page__row">
        <div className="info-page__column info-page__column--fixed">
          <h4 className="info-page__column-title">Experience</h4>
          <div className="info-page__experience-list">
            {infoPage.experience.map((experience) => (
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
          <ul className="info-page__work-list">
            {infoPage.published_work.map((work) => (
              <li key={work.id} className="info-page__work-list-item">
                <a href={work.url} target="_blank">
                  {work.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="info-page__column">
          <h4 className="info-page__column-title">Clients</h4>
          <ul className="info-page__clients-list">
            {infoPage.clients.map((client) => (
              <li key={client.id} className="info-page__clients-list-item">
                {client.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
