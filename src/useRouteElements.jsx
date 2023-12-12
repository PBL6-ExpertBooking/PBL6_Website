import path from './constants/path'
import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
// layout
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import HomeLayout from './layouts/HomeLayout'
import UserLayout from './pages/User/layouts/UserLayout'
import ExpertLayout from './pages/Expert/layouts/ExpertLayout'
import AdminLayout from './pages/Admin/layouts/AdminLayout'
// common pages
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const DashBoard = lazy(() => import('./pages/DashBoard'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ValidateEmail = lazy(() => import('./pages/ValidateEmail'))
const Promote = lazy(() => import('./pages/Promote'))
const HomePage = lazy(() => import('./pages/HomePage'))
const PayMent = lazy(() => import('./pages/PayMent'))
// user page
const UserHistoryTransaction = lazy(() => import('./pages/User/pages/HistoryTransaction'))
const JobRequest = lazy(() => import('./pages/User/pages/JobRequest'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
// expert page
const ShowListPost = lazy(() => import('./pages/Expert/pages/ShowListPost'))
const TransactionHistory = lazy(() => import('./pages/Expert/pages/HistoryTransaction'))
const ExpertProfile = lazy(() => import('./pages/Expert/pages/ExpertProfile'))
const ExpertBooking = lazy(() => import('./pages/Expert/pages/ExpertBooking'))
const ExpertDetail = lazy(() => import('./pages/ExpertDetail'))
const ExpertChangePassword = lazy(() => import('./pages/Expert/pages/ChangePassword'))
// admin page
const UsersManagement = lazy(() => import('./pages/Admin/pages/UsersManagement'))
const MajorsManagement = lazy(() => import('./pages/Admin/pages/MajorsManagement'))
const CertificateManagement = lazy(() => import('./pages/Admin/pages/CertificateManagement'))
const DocumentManagement = lazy(() => import('./pages/Admin/pages/DocumentManagement'))
const TransactionManagement = lazy(() => import('./pages/Admin/pages/HistoryTransaction'))
const ReportManagement = lazy(() => import('./pages/Admin/pages/ReportManagement'))
const AdminDashboard = lazy(() => import('./pages/Admin/pages/DashBoard/DashBoard'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/dashboard' />
}

function AdminRoute() {
  const { role } = useContext(AppContext)
  return role === 'ADMIN' ? <Outlet /> : <Navigate to='/dashboard' />
}

function ExpertRoute() {
  const { role } = useContext(AppContext)
  return role === 'EXPERT' ? <Outlet /> : <Navigate to='/dashboard' />
}

function UserRoute() {
  const { role } = useContext(AppContext)
  return role === 'USER' ? <Outlet /> : <Navigate to='/dashboard' />
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
          path: path.user,
          element: <UserRoute />,
          children: [
            {
              path: '',
              element: <MainLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <UserLayout>
                        <Profile />
                      </UserLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <UserLayout>
                        <ChangePassword />
                      </UserLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.historyTransaction,
                  element: (
                    <Suspense>
                      <UserLayout>
                        <UserHistoryTransaction />
                      </UserLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.jobRequest,
                  element: (
                    <Suspense>
                      <UserLayout>
                        <JobRequest />
                      </UserLayout>
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: path.expert,
          element: <ExpertRoute />,
          children: [
            {
              path: '',
              element: <MainLayout />,
              children: [
                {
                  path: path.expertProfile,
                  element: (
                    <Suspense>
                      <ExpertLayout>
                        <ExpertProfile />
                      </ExpertLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.expertTransactionHistory,
                  element: (
                    <Suspense>
                      <ExpertLayout>
                        <TransactionHistory />
                      </ExpertLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.expertShowListPost,
                  element: (
                    <Suspense>
                      <ExpertLayout>
                        <ShowListPost />
                      </ExpertLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.expertBookings,
                  element: (
                    <Suspense>
                      <ExpertLayout>
                        <ExpertBooking />
                      </ExpertLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.expertChangePassword,
                  element: (
                    <Suspense>
                      <ExpertLayout>
                        <ExpertChangePassword />
                      </ExpertLayout>
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: path.admin,
          element: <AdminRoute />,
          children: [
            {
              path: '',
              element: <MainLayout />,
              children: [
                {
                  path: path.adminProfile,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <Profile />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminListUser,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <UsersManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminListMajor,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <MajorsManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminVerifyExpert,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <CertificateManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminListDocument,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <DocumentManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminListTransaction,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <TransactionManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminListReport,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <ReportManagement />
                      </AdminLayout>
                    </Suspense>
                  )
                },
                {
                  path: path.adminDashBoard,
                  element: (
                    <Suspense>
                      <AdminLayout>
                        <AdminDashboard />
                      </AdminLayout>
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
      element: <HomeLayout />,
      children: [
        {
          path: path.paymentResponse,
          element: (
            <Suspense>
              <PayMent />
            </Suspense>
          )
        },
        {
          path: path.validateEmail,
          element: (
            <Suspense>
              <ValidateEmail />
            </Suspense>
          )
        },
        {
          path: path.promoteToExpert,
          element: (
            <Suspense>
              <Promote />
            </Suspense>
          )
        },
        {
          path: '',
          index: true,
          element: (
            <Suspense>
              <HomePage />
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
