import jwt from "jsonwebtoken"
import {validateToken} from "../utils/token"
import {UnauthorizedError, ExpressError} from "../utils/errors"
import {Auth} from "../models/auth"

export function getJWT(request){
    console.log('GET JWT')
    const authToken = request.headers["bearer"];
    console.log("processed token: ", authToken);
    if (!authToken || authToken == "undefined" || authToken == "null"){
        console.log("invalid header: ", request.headers)
        throw new UnauthorizedError("Invalid header found");
    }
    console.log("getting bearer", authToken);
    return authToken;
};

export async function getUserFromToken(request){
    try{
        const userToken = getJWT(request);
        console.log("user token: ", userToken);
        const decodedToken = await validateToken(userToken);
        if (!decodedToken)
            throw new ExpressError("something went wrong", 404)
        return decodedToken;
    } catch (error){
        if (error instanceof UnauthorizedError){
            throw error
        }else{
            console.warn("Unexpected error: ", error);
            throw new ExpressError("unexpected error in getUserFromToken function: ", 404);
        }
    }
}

export async function requireAuthenticatedUser(request, response, next){
    // if token exists, check user exists 
    try {
        const user = await getUserFromToken(request)
        console.log("retrieved user: ", user)
        if (!user){
            console.log("access forbidden page");
            return next(new UnauthorizedError);
        }

        response.locals.user = user;
        console.log("valid users. access granted", user);
        return next();

    } catch (error){
        // otherwise throw error
        if (error instanceof UnauthorizedError){
            console.log("Unauthorized user");
            return next(error);
        } else{
            console.log("Unexpected error occured trying to verify user");
            return next(error);
        }
    }
}
