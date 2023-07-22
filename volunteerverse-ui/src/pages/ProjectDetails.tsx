import useAuthentication from '../services/hooks/useAuthentication';

function ProjectDetails() {
  const [isAuth, user] = useAuthentication();

  return (
    <div>ProjectDetails</div>
  )
}

export default ProjectDetails