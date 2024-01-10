import { useEffect, useState } from "react";
import { getProjects } from "../../services/projects.service";
import { IProject } from "../../interfaces/project.interface";
import Project from "../components/project.component";
import { IBaseStrapiEntity } from "../../interfaces/base-strapi-entity.interface";

export default function WorksPage() {
  const [projects, setProjects] = useState<
    IBaseStrapiEntity<IProject>[] | null
  >(null);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  if (!projects) {
    return <>Loading</>;
  }

  if (projects.length === 0) {
    return <>No projects</>;
  }

  return (
    <>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </>
  );
}
