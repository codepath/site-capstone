import { createContext } from "react";
import { AuthenicationProp } from "../services/hooks/useAuthentication";


export const AuthenticationContext = createContext<AuthenicationProp>({
    isValidVolunteer: undefined,
    isValidOrg: undefined,
    isAuth: undefined,
    user: undefined,
    setToken: undefined,
    removeToken: undefined
});