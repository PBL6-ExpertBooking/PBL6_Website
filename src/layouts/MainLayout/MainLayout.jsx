import { memo } from 'react'
import { Outlet } from 'react-router-dom'
function MainLayoutInner({ children }) {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
