import { useEffect, useState } from "react"
import { useAuthenticationUserProp } from "../services/hooks/useAuthentication"
import { useParams } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks";
import { apiClient } from "../services/ApiClient";

interface ProjectProp {
  title: string,
  createdAt: number | undefined,
  description: string,
  orgName: string,
  orgUrl: string,
  imageUrl: string,
  orgDesc: string,
  founders: string,
  tags: string,
}

function VolunteerProjectDetails({ isAuth, user }: { isAuth: boolean, user: useAuthenticationUserProp }) {
  const params = useParams();
  const { projectId } = params
  const [project, setProject] = useState<ProjectProp | undefined>({
    title: "",
    createdAt: undefined,
    description: "",
    orgName: "",
    orgUrl: "",
    imageUrl: "",
    orgDesc: "",
    founders: "",
    tags: "",
  });

  useEffect(() => {
    const fetchProjectById = async (projectId) => {
      const {data, success, statusCode, error} =  await apiClient.fetchProjectById(projectId);

    }
    fetchProjectById();
    /**
     * @todo: make request to fetch project details
     */
  }, [])
  // const [isAuth, user] = useAuthentication(); \\ uncomment later

  return (
    <div>VolunteerProjectDetails</div>
  )
}

export default VolunteerProjectDetails