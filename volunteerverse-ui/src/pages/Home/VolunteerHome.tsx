import React from 'react'
import { useAuthenticationUserProp } from '../../services/hooks/useAuthentication'

function VolunteerHome({ user } : {user: useAuthenticationUserProp}) {
  /**
   * @todo: use effect to get all reccomended volunteer options for a user
   */
  return (
    <div>VolunteerHome</div>
  )
}

export default VolunteerHome