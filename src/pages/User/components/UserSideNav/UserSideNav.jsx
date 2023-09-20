import { useContext } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { AppContext } from '../../../../contexts/app.context'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SyncLockIcon from '@mui/icons-material/SyncLock';
export default function UserSideNav() {
  const navigate = useNavigate()
  const logOut = async () => {
    navigate("/login");
  };
  const { collapseSidebar } = useProSidebar();
  useEffect(() => {
    collapseSidebar();
  }, [])

  return (
    <Sidebar backgroundColor="white" style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          {" "}
          <h3>Expert Booking</h3>
        </MenuItem>
        <Link to={path.dashboard}>
          <MenuItem icon={<HomeRoundedIcon />}>DashBoard</MenuItem>
        </Link>
        <Link to={path.profile}>
          <MenuItem icon={<ManageAccountsIcon />}>Profile</MenuItem>
        </Link>
        <Link to={path.changePassword}>
          <MenuItem icon={<SyncLockIcon />}>Change Password</MenuItem>
        </Link>
        <Link to={path.historyPurchase}>
          <MenuItem icon={<CalendarMonthRoundedIcon />}>History Transaction</MenuItem>
        </Link>
         <MenuItem icon={<LogoutRoundedIcon />} onClick={logOut}>Sign Out</MenuItem>
      </Menu>
    </Sidebar>
  );
}