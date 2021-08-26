import {createContext} from "react";
import {UserProfile} from "../model/UserProfile";

type UserContext = {
    token?: string
    user?: UserProfile
    login(): void
    logout(): void
}

const UserContext = createContext({
    user: null,
    token: null,
    hasSession: false,
})