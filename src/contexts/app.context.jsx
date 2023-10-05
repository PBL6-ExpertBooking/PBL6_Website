import { createContext, useState } from 'react'
import { getProfileFromLS } from '../utils/auth'
import {useCookies } from "react-cookie";

export const getInitialAppContext = () => ({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
})  

const initialAppContext = getInitialAppContext()

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}) => {
  const [ cookies, setCookie ] = useCookies(['user']);
  const [isAuthenticated, setIsAuthenticated] = useState(cookies.access_token ? true : false)
  const [extendedPurchases, setExtendedPurchases] = useState(defaultValue.extendedPurchases)
  const [profile, setProfile] = useState(defaultValue.profile)

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchases([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
