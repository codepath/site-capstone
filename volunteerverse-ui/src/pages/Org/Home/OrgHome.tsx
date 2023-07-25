import React from 'react'
import { useAuthenticationUserProp } from '../../../services/hooks/useAuthentication'

function OrgHome({ user } : {user: useAuthenticationUserProp}) {
  /**
   * @todo - display dashboard for orgs to view/create/delete projects they've posted
   */
  return (
    <div>OrgHome</div>
  )
}

export default OrgHome