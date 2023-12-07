import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import WorkIcon from '@mui/icons-material/Work'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

export default function UserSideNav() {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const { collapseSidebar } = useProSidebar()
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
          <Link to={path.dashboard} style={styleLink}>
            <MenuItem icon={<HomeRoundedIcon />}></MenuItem>
          </Link>
          <Link to={path.profile} style={styleLink}>
            <MenuItem icon={<ManageAccountsIcon />}></MenuItem>
          </Link>
          <Link to={path.historyTransaction} style={styleLink}>
            <MenuItem icon={<CalendarMonthRoundedIcon />}></MenuItem>
          </Link>
          <Link to={path.jobRequest} style={styleLink}>
            <MenuItem icon={<WorkIcon />}></MenuItem>
          </Link>
          <Link to={path.changePassword} style={styleLink}>
            <MenuItem icon={<SyncLockIcon />}></MenuItem>
          </Link>
        </Menu>
      ) : (
        <Menu>
          <Link to={path.dashboard} style={styleLink}>
            <MenuItem icon={<HomeRoundedIcon />}>{t('dashboard')}</MenuItem>
          </Link>
          <Link to={path.profile} style={styleLink}>
            <MenuItem icon={<ManageAccountsIcon />}>{t('profile')}</MenuItem>
          </Link>
          <Link to={path.historyTransaction} style={styleLink}>
            <MenuItem icon={<CalendarMonthRoundedIcon />}>{t('historyTransaction')}</MenuItem>
          </Link>
          <Link to={path.jobRequest} style={styleLink}>
            <MenuItem icon={<WorkIcon />}>{t('jobRequest')}</MenuItem>
          </Link>
          <Link to={path.changePassword} style={styleLink}>
            <MenuItem icon={<SyncLockIcon />}>{t('changePassword')}</MenuItem>
          </Link>
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
