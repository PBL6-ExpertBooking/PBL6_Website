import React from 'react'
import { useEffect, useContext } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import useRouteElements from './useRouteElements'
import { AppContext } from './contexts/app.context'
import ThemeProvider from './theme'
import { LocalStorageEventTarget } from './utils/auth'
import { ProSidebarProvider } from "react-pro-sidebar";

const App = () => {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ProSidebarProvider>
        <ThemeProvider>{routeElements}</ThemeProvider>
        </ProSidebarProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App