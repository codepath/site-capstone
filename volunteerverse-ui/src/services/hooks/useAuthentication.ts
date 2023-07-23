
import React, { useEffect, useState } from 'react'
import { apiClient } from '../ApiClient'
import { organizationProp, volunteerProp } from '../../props/users';


export interface useAuthenticationUserProp {
  password: string,
  email: string,
  id: number,
  user_type: string

}

 export const useAuthentication = (): [boolean, useAuthenticationUserProp] => {
  // function returns authentication state  (boolean, and user)
  // and user after fetching user from the token
  // stored in local storga
  const [sessionState, setSessionState] = useState({ 
    isAuth: false,
    user : {
      password: "",
      email: "",
      id: -1,
      user_type: ""}
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("user_token");
      console.log("fetched token from storage: ", token);
      if (token){
        // sets token if it is not undefined
        apiClient.setToken(token);
      }
      const { data, success, statusCode } = await apiClient.fetchUserFromToken();
      if (success) {
        // updates appstate if request to backend 
        // was successful
        // if user exists, set isAuth to true if its currently false
        setSessionState(() => ({
          isAuth : true,
          user : data.user
        }))
      } else {
        // set isAuth to false if no token exists in 
        // local storage
        console.log("unauthenticate user or an error has occured", statusCode)
      }
    }
    fetchUser();

  }, []);
  return [sessionState.isAuth, sessionState.user]
};