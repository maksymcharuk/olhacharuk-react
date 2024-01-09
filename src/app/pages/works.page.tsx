import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../services/projects.service";
import { Project } from "../../interfaces/project.interface";

export default function WorksPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  console.log(projects);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <>
      <>
        <div>Works page</div>
        <Link to={"/"}>Home</Link>
      </>
    </>
  );
}
