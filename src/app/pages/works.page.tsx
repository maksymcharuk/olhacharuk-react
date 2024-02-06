import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Project from "../components/project.component";
import { getWorkPage } from "../../services/pages.services";
import { IWorkPage } from "../../interfaces/work-page.interface";
import StoreContext from "../contexts/store.context";
import Animated from "../animated";
import { ORIGIN_URL } from "../../configs/constants";

export default function WorksPage() {
  const [workPage, setWorkPage] = useState<IWorkPage | null>(null);
  const { store, setStore } = useContext(StoreContext);

  useEffect(() => {
    if (!store.workPage) {
      getWorkPage().then((data) => {
        setWorkPage(data.attributes);
        setStore({ ...store, workPage: data.attributes });
      });
    } else {
      setWorkPage(store.workPage);
    }
  }, [store, setStore]);

  if (!workPage) {
    return;
  }

  if (workPage.projects.data.length === 0) {
    return <>No projects</>;
  }

  return (
    <Animated>
      <Helmet>
        <title>Olha Charuk | Work</title>
        <link rel="canonical" href={`${ORIGIN_URL}/work`} />
      </Helmet>
      {workPage.projects.data.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </Animated>
  );
}
