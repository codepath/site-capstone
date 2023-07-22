import React from 'react'
import useAuthentication from '../../services/hooks/useAuthentication';

function CreateProject() {
  const [isAuth, user] = useAuthentication();

  return (
    <div>CreateProject</div>
  )
}

export default CreateProject