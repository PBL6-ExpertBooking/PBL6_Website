import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
function HomeLayoutInner({ children }) {
  return (
    <div>
      <HomeHeader />
      {children}
      <Outlet />
    </div>
  )
}
const HomeLayout = memo(HomeLayoutInner)
export default HomeLayout
