import path from './constants/path'
import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout'
import ExpertLayout from './pages/Expert/layouts/ExpertLayout'

const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const NotFound = lazy(() => import('./pages/NotFound'))
const DashBoard = lazy(() => import('./pages/DashBoard'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ExpertInfo = lazy(() => import('./pages/Expert/pages/ExpertInfo'))
const TransactionHistory = lazy(() => import('./pages/Expert/pages/TransactionHistory'))
const ShowListPost = lazy(() => import('./pages/Expert/pages/ShowListPost'))
const ExpertBooking = lazy(() => import('./pages/Expert/pages/ExpertBooking'))
const ExpertDetail = lazy(() => import('./pages/ExpertDetail'))
const UserHistoryTransaction = lazy(() => import('./pages/User/pages/HistoryTransaction'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  return <Outlet />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.forgotPassword,
              element: (
                <Suspense>
                  <ForgotPassword />
                </Suspense>
              )
            },
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.expertDetail,
          element: (
            <MainLayout>
              <Suspense>
                <ExpertDetail />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.dashboard,
          element: (
            <MainLayout>
              <Suspense>
                <DashBoard />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.historyTransaction,
                  element: (
                    <Suspense>
                      <UserHistoryTransaction />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }, 
        {
          path: path.expert,
          element: <MainLayout />,
          children: [
            {
            path: '',
            element: <ExpertLayout/>,
            children: [
              {
                path: path.expertProfile,
                element: (
                  <Suspense>
                    <Profile />
                  </Suspense>
                )
              },
              {
                path: path.expertInfo,
                element: (
                  <Suspense>
                    <ExpertInfo />
                  </Suspense>
                )
              },
              {
                path: path.expertTransactionHistory,
                element: (
                  <Suspense>
                    <TransactionHistory />
                  </Suspense>
                )
              },
              {
                path: path.expertShowListPost,
                element: (
                  <Suspense>
                    <ShowListPost />
                  </Suspense>
                )
              },
              {
                path: path.expertBookings,
                element: (
                  <Suspense>
                    <ExpertBooking />
                  </Suspense>
                )
              }
            ] 
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.productDetail,
          element: (
            <Suspense>
            </Suspense>
          )
        },
        {
          path: '',
          index: true,
          element: (
            <Suspense>
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        }
      ]
    }
  ])
  return routeElements
}
