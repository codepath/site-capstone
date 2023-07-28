import React, { useEffect, useState } from 'react'
import { apiClient } from '../ApiClient'
import { useLocalStorage } from '@mantine/hooks';
import { useCallback } from 'react';
// import useLoc
export interface useAuthenticationUserProp {
  password: string,
  email: string,
  id: number,
  userType: "volunteer" | "organization"
  // make it return first name and last name too?

}
export interface AuthenicationProp {
  setToken?: (val: string) => void
  removeToken?: () => void,
  isAuth?: boolean,
  isValidVolunteer?: boolean,
  isValidOrg?: boolean,
  user?: useAuthenticationUserProp,
}

 export const useAuthentication = (): AuthenicationProp => {
  // function returns authentication state  (boolean, and user)
  // and user after fetching user from the token
  // stored in local storga
  console.log("running auth hook")
  const [tokenValue, setTokenValue] = useState(localStorage.getItem("user_token") || "");
  const setToken = useCallback((value: string) => {
    console.log("setting local storage token");
    localStorage.setItem("user_token", tokenValue);
    setTokenValue(value);
  }, [])

  const removeToken = useCallback(() => {
    console.log("removing token")
    localStorage.removeItem("user_token");
    setTokenValue("");
  }, [])


   const [sessionState, setSessionState] = useState<AuthenicationProp>({
     isValidVolunteer: undefined,
     isValidOrg: undefined,
     isAuth: undefined,
     user: undefined,
     setToken: undefined,
     removeToken: undefined
   });

  useEffect(() => {
    const fetchUser = async () => {
      
      console.log("found token: ", tokenValue)
      if (!tokenValue) {
        setSessionState({
          isValidVolunteer: false,
          isValidOrg: false,
          isAuth: false,
          user: undefined,
          setToken: setToken,
          removeToken: removeToken
        })
        return // returns if token is undefined
      }
      apiClient.setToken(tokenValue);
      const { data, success, statusCode, error } = await apiClient.fetchUserFromToken();
      if (success) {
        // update props if authentication was successful
        console.log("renaming user_type to userType");
        setSessionState(() => ({
          isValidVolunteer: data.user.user_type === "volunteer",
          isValidOrg: data.user.user_type === "organization",
          isAuth: true,
          user : {...data.user, userType: data.user.user_type},
          setToken: setToken,
          removeToken: removeToken,
        }))
      } else if (statusCode === 401) {
        console.log("unauthenticated user found")
      } else{
        console.log("unexpected error has occured.\n","code: ", statusCode);
        console.log("error: ", error,);
      }
    }
    fetchUser();

  }, [tokenValue]);
  console.log("returning session state: ", sessionState)
  return sessionState
};