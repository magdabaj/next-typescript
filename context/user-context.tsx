import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {UserProfile} from "../model/UserProfile";
import axios, {AxiosError} from "axios";
import useSWR, {SWRConfig} from "swr";

type UserContext = {
    token?: string
    user?: UserProfile
    login(): void
    logout(): void
}

const initialContext: UserContext = {
    login() { throw Error('No Provider!!')},
    logout() {throw Error('No Provider!!')}
}

export const UserContext = createContext(initialContext)

export const UseUser = () => {
  const { user } = useContext(UserContext)
    return user
}

function isAxiosError(err: any): err is AxiosError {
    return err.isAxiosError
}

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserContext['user']>(undefined)
    const [needsLogin, setNeedsLogin] = useState(false)
    const [token, setToken] = useState<string|undefined>(undefined)


    const { data, error } = useSWR( `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code$redirect_uri=http://localhost:3000&scope=""`, )
    const getToken = async ()=> {
        // const { data, error } = useSWR( `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code$redirect_uri=http://localhost:3000&scope=""`, )
        const response = await axios.get( `https://accounts.spotify.com/authorize?client_id=cf76b9c294774ee2810c399056456945&response_type=code$redirect_uri=http://localhost:3000/callback&scope=`,
            {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}}
    )
        console.log(response, error)

    }
    // const [token, getToken, setToken] = useOAuth2Token({
    //     authorizeUrl: "https://accounts.spotify.com/authorize",
    //     scope: [""],
    //     clientID: "cf76b9c294774ee2810c399056456945",
    //     redirectUri: "http://localhost:3000/"
    // })

    const resetInterceptor = useCallback(() => {
        return axios.interceptors.request.use((config) => {
            config.headers['Authorization'] = 'Bearer ' + token
            return config
        })
    }, [token])

    useState(resetInterceptor)

    useEffect(() =>{
        if (token&&needsLogin) setNeedsLogin(false)
        if (needsLogin) return

        getToken()
    }, [setToken, setUser])

    const login = useCallback(() => {
        console.log("setting needs login" +
            "")
      setNeedsLogin(true)
    }, [getToken])

    const logout = useCallback(() => {
        setToken('')
        setUser(undefined)
    }, [setToken, setUser])

    useMemo(() => {
        axios.interceptors.response.use(config => config, error => {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    login()
                }
            }
            return Promise.reject(error)
        })
    }, [])


    useEffect(() => {
        if (!token) return

        axios.interceptors.request.eject(resetInterceptor())

        axios.get<UserProfile>('')
    }, [token])

    return (
        <UserContext.Provider value={{
            token,
            user,
            logout,
            login,
        }}>
            <SWRConfig value={{
                shouldRetryOnError: false,
                errorRetryCount: 0,
                revalidateOnFocus: false,
            }}>{children}</SWRConfig>
        </UserContext.Provider>
    )
}

