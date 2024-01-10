import { useEffect, useState } from "react";
import Project from "../components/project.component";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";
import { getWorkPage } from "../../services/pages.services";
import { IWorkPage } from "../../interfaces/work-page.interface";

export default function WorksPage() {
  const [workPage, setWorkPage] = useState<IBaseStrapiEntity<IWorkPage> | null>(
    null
  );

  useEffect(() => {
    getWorkPage().then((data) => {
      setWorkPage(data);
    });
  }, []);

  if (!workPage) {
    return <>Loading</>;
  }

  if (workPage.attributes.projects.data.length === 0) {
    return <>No projects</>;
  }

  return (
    <>
      {workPage.attributes.projects.data.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </>
  );
}
