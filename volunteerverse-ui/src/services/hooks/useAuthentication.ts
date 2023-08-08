import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { OrgUserProp, VolunteerUserProp } from '../../props/users';
import { apiClient } from '../ApiClient';
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
  user?: VolunteerUserProp | OrgUserProp,
}

 export const useAuthentication = (): AuthenicationProp => {
  // function returns authentication state  (boolean, and user)
  // and user after fetching user from the token
  // stored in local storga
  console.log("running auth hook");
  const [tokenValue, setToken, removeToken] = useLocalStorage({
    key: 'user_token',
    defaultValue: '',
  });
  
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
          isValidVolunteer: data.user.userType === "volunteer",
          isValidOrg: data.user.userType === "organization",
          isAuth: true,
          user : data.user,
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