import { useContext, useEffect, useState } from "react";
import { IHomePage } from "../../interfaces/home-page.interface";
import { getHomePage } from "../../services/pages.services";
import StoreContext from "../contexts/store.context";
import Animated from "../animated";

export default function HomePage() {
  const [homePage, setHomePage] = useState<IHomePage | null>(null);
  const { store, setStore } = useContext(StoreContext);

  useEffect(() => {
    if (!store.homePage) {
      getHomePage().then((data) => {
        setHomePage(data.attributes);
        setStore({ ...store, homePage: data.attributes });
      });
    } else {
      setHomePage(store.homePage);
    }
  }, [store, setStore]);

  if (!homePage) {
    return;
  }

  return (
    <Animated>
      <div className="home-page">
        <p
          className="home-page__title"
          dangerouslySetInnerHTML={{
            __html: homePage.content[0].children[0].text,
          }}
        ></p>
      </div>
    </Animated>
  );
}
