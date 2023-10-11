import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import Header from '../../components/Header/Header'
import { AppContext } from '../../contexts/app.context'
import { useContext } from 'react'
function HomeLayoutInner({ children }) {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <div>
      {!isAuthenticated ? <HomeHeader /> : <Header />}
      {children}
      <Outlet />
    </div>
  )
}
const HomeLayout = memo(HomeLayoutInner)
export default HomeLayout
