import { useContext, useEffect, useState } from "react";
import Project from "../components/project.component";
import { getWorkPage } from "../../services/pages.services";
import { IWorkPage } from "../../interfaces/work-page.interface";
import { StoreContext } from "../root";

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
    <>
      {workPage.projects.data.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </>
  );
}
