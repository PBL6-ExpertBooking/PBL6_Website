import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import ChecklistIcon from '@mui/icons-material/Checklist'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SsidChartIcon from '@mui/icons-material/SsidChart'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

export default function ExpertSideNav() {
  const isMobile = useResponsive('down', 'sm')
  const { collapseSidebar } = useProSidebar()
  const { t } = useTranslation()
  const styleLink = {
    textDecoration: 'none',
    color: 'black'
  }
  const styleMobile = {
    maxWidth: '100vw',
    width: '100vw',
    position: 'fixed',
    zIndex: 1000,
    bottom: 0,
    left: 0,
    backgroundColor: 'white'
  }
  const menuMobile = {
    overflow: 'auto',
    '& ul': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%'
    }
  }
  return (
    <Sidebar style={isMobile ? styleMobile : { height: '100%' }}>
      {isMobile ? (
        <Menu
          rootStyles={menuMobile}
          menuItemStyles={{
            padding: 0
          }}
        >
          <MenuItem
            icon={<SsidChartIcon />}
            component={<Link to={path.expertDashboard} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<ManageAccountsIcon />}
            component={<Link to={path.expertProfile} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<SyncLockIcon />}
            component={<Link to={path.expertChangePassword} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<CalendarMonthRoundedIcon />}
            component={<Link to={path.expertTransactionHistory} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<ChecklistIcon />}
            component={<Link to={path.expertShowListPost} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<ShoppingCartIcon />}
            component={<Link to={path.expertBookings} style={styleLink} />}
          ></MenuItem>
          <MenuItem
            icon={<AccountBalanceWalletIcon />}
            component={<Link to={path.expertWithdraw} style={styleLink} />}
          ></MenuItem>
        </Menu>
      ) : (
        <Menu>
          <MenuItem icon={<SsidChartIcon />} component={<Link to={path.expertDashboard} style={styleLink} />}>
            Thống kê
          </MenuItem>
          <MenuItem icon={<ManageAccountsIcon />} component={<Link to={path.expertProfile} style={styleLink} />}>
            {t('myProfile')}
          </MenuItem>
          <MenuItem icon={<SyncLockIcon />} component={<Link to={path.expertChangePassword} style={styleLink} />}>
            {t('changePassword')}
          </MenuItem>
          <MenuItem
            icon={<CalendarMonthRoundedIcon />}
            component={<Link to={path.expertTransactionHistory} style={styleLink} />}
          >
            {t('historyTransaction')}
          </MenuItem>
          <MenuItem icon={<ChecklistIcon />} component={<Link to={path.expertShowListPost} style={styleLink} />}>
            {t('listJobRequests')}
          </MenuItem>
          <MenuItem icon={<ShoppingCartIcon />} component={<Link to={path.expertBookings} style={styleLink} />}>
            {t('myBookings')}
          </MenuItem>
          <MenuItem icon={<AccountBalanceWalletIcon />} component={<Link to={path.expertWithdraw} style={styleLink} />}>
            Rút tiền
          </MenuItem>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar()
            }}
            style={styleLink}
          >
            {t('collapse')}
          </MenuItem>
        </Menu>
      )}
    </Sidebar>
  )
}
