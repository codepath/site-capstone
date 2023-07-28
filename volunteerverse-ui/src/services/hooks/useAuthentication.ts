
import React, { useEffect, useState } from 'react'
import { apiClient } from '../ApiClient'
import { useLocalStorage } from '@mantine/hooks';
import { useCallback } from 'react';
// import useLoc
export interface useAuthenticationUserProp {
  password: string,
  email: string,
  id: number,
  userType: string
  // make it return first name and last name too?

}
export interface authProps {
  isAuth: boolean,
    user : {
      password: string,
      email: string,
      id: number,
      userType: string
    }
}

 export const useAuthentication = (): [authProps, (val: string) => void, () => void] => {
  // function returns authentication state  (boolean, and user)
  // and user after fetching user from the token
  // stored in local storga
  const [token, setStorageValue, removeStorageValue] = useLocalStorage({ key: 'user_token', defaultValue: '' });
  const setToken = useCallback((value: string) => {
    setStorageValue(value);
  }, [token])

  const removeToken = useCallback(() => {
    removeStorageValue();
  }, [token])


  const [sessionState, setSessionState] = useState({ 
    isAuth: false,
    user : {
      password: "",
      email: "",
      id: -1,
      userType: ""}
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setSessionState({
          isAuth: false,
          user: {
            password: "",
            email: "",
            id: -1,
            userType: ""
          }
        })
        return // returns if token is undefined
      }
      apiClient.setToken(token);
      const { data, success, statusCode, error } = await apiClient.fetchUserFromToken();
      if (success) {
        // update props if authentication was successful
        console.log("renaming user_type to userType");
        setSessionState(() => ({
          isAuth : true,
          user : {...data.user, userType: data.user.user_type}
        }))
      } else if (statusCode === 401) {
        console.log("unauthenticated user found")
      } else{
        console.log("unexpected error has occured.\n","code: ", statusCode);
        console.log("error: ", error,);
      }
    }
    fetchUser();

  }, [token]);
  console.log("retturnign session state: ", sessionState)
  return [sessionState, setToken, removeToken]
};