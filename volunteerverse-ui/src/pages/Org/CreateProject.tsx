import React from 'react'
import { useAuthenticationUserProp } from '../../services/hooks/useAuthentication'

function CreateProject({isAuth, user} : {isAuth : boolean, user : useAuthenticationUserProp}) {

  return (
    <div>CreateProject</div>
  )
}

export default CreateProject