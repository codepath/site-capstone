
import React, { useEffect, useState } from 'react'
import { apiClient } from '../ApiClient'
import { organizationProp, volunteerProp } from '../../props/users';


export default function useAuthentication() {
  // function returns authentication state 
  // and user after fetching user from the token
  // stored in local storga
  const [sessionState, setSessionState] = useState({ 
    isAuth: false,
    user : undefined
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
        setSessionState((initialData) => ({
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