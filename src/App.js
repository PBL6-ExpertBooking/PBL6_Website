import React from 'react'
import { useEffect, useContext } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import useRouteElements from './useRouteElements'
import { AppContext } from './contexts/app.context'
import { SnackbarContextProvider } from './contexts/snackbar.context'
import ThemeProvider from './theme'
import { LocalStorageEventTarget } from './utils/auth'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { CookiesProvider } from 'react-cookie'
import { MajorProvider } from './contexts/major.context'
import 'simplebar-react/dist/simplebar.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChartStyle } from './components/chart'

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
        <MajorProvider>
          <CookiesProvider>
            <SnackbarContextProvider>
              <ProSidebarProvider>
                <ThemeProvider>
                  {routeElements}
                  <ChartStyle />
                </ThemeProvider>
              </ProSidebarProvider>
            </SnackbarContextProvider>
          </CookiesProvider>
        </MajorProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
