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
      {/* <Grid columnWidth={200} gap={20} horizontal={true}>
        <div style={{ height: "200px", backgroundColor: "red" }}>Item 1</div>
        <div style={{ height: "150px", backgroundColor: "blue" }}>Item 2</div>
        <div style={{ height: "250px", backgroundColor: "green" }}>Item 3</div>
        <div style={{ height: "200px", backgroundColor: "yellow" }}>Item 4</div>
        <div style={{ height: "170px", backgroundColor: "purple" }}>Item 5</div>
        <div style={{ height: "230px", backgroundColor: "orange" }}>Item 6</div>
        <div style={{ height: "190px", backgroundColor: "pink" }}>Item 7</div>
        <div style={{ height: "220px", backgroundColor: "gray" }}>Item 8</div>
        <div style={{ height: "180px", backgroundColor: "brown" }}>Item 9</div>
        <div style={{ height: "240px", backgroundColor: "#454642" }}>
          Item 10
        </div>
      </Grid> */}

      {gridView ? (
        <Grid columnWidth={300} gap={20} horizontal={true}>
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

      {/* <Grid columnWidth={300} gap={20} horizontal={true}>
          {workPage.projects.data.map((project) => (
            <ProjectCell key={project.id} project={project} />
          ))}
        </Grid>

        
        {workPage.projects.data.map((project) => (
          <Project key={project.id} project={project} />
        ))} */}
    </Animated>
  );
}
