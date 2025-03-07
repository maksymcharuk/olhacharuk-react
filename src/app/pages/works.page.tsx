import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Project from "../components/project.component";
import { getWorkPage } from "../../services/pages.services";
import { IWorkPage } from "../../interfaces/work-page.interface";
import StoreContext from "../contexts/store.context";
import Animated from "../animated";
import { ORIGIN_URL } from "../../configs/constants";
import GridItem from "../libs/masonry-grid/grid-item.component";
import Grid from "../libs/masonry-grid/grid.component";
import ProjectCell from "../components/project-cell.component";

export default function WorksPage() {
  const [workPage, setWorkPage] = useState<IWorkPage | null>(null);
  const [gridView, setGridView] = useState(true);
  const { store, setStore } = useContext(StoreContext);

  const breakpoints = [
    {
      minWidth: 0,
      columnsNumber: 1,
    },
    {
      minWidth: 768,
      columnsNumber: 2,
    },
    {
      minWidth: 992,
      columnsNumber: 3,
    },
  ];

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

      {gridView ? (
        <Grid gap={20} horizontal={true} breakpoints={breakpoints}>
          {workPage.projects.data.map((project) => (
            <ProjectCell key={project.id} project={project} />
          ))}
        </Grid>
      ) : (
        <>
          {workPage.projects.data.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </>
      )}
    </Animated>
  );
}
