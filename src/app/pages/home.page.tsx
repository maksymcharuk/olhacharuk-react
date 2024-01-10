import { useEffect, useState } from "react";
import { IHomePage } from "../../interfaces/home-page.interface";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { getHomePage } from "../../services/pages.services";

export default function HomePage() {
  const [homePage, setHomePage] = useState<IBaseStrapiEntity<IHomePage> | null>(
    null
  );

  useEffect(() => {
    getHomePage().then((data) => {
      setHomePage(data);
    });
  }, []);

  if (!homePage) {
    return <>Loading</>;
  }

  return (
    <div className="home-page">
      <h2
        className="home-page__title"
        dangerouslySetInnerHTML={{
          __html: homePage.attributes.content[0].children[0].text,
        }}
      ></h2>
    </div>
  );
}
