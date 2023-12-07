import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
export default function AdminSideNav() {
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
          <Link to={path.adminProfile} style={styleLink}>
            <MenuItem icon={<AccountBoxIcon />}></MenuItem>
          </Link>
          <Link to={path.adminListUser} style={styleLink}>
            <MenuItem icon={<ManageAccountsIcon />}></MenuItem>
          </Link>
          <Link to={path.adminListMajor} style={styleLink}>
            <MenuItem icon={<ManageSearchIcon />}></MenuItem>
          </Link>
          <Link to={path.adminVerifyExpert} style={styleLink}>
            <MenuItem icon={<VerifiedUserIcon />}></MenuItem>
          </Link>
        </Menu>
      ) : (
        <Menu>
          <Link to={path.dashboard} style={styleLink}>
            <MenuItem icon={<HomeRoundedIcon />}>{t('dashboard')}</MenuItem>
          </Link>
          <Link to={path.adminProfile} style={styleLink}>
            <MenuItem icon={<AccountBoxIcon />}>{t('profile')}</MenuItem>
          </Link>
          <Link to={path.adminListUser} style={styleLink}>
            <MenuItem icon={<ManageAccountsIcon />}>{t('usersManagement')}</MenuItem>
          </Link>
          <Link to={path.adminListMajor} style={styleLink}>
            <MenuItem icon={<ManageSearchIcon />}>{t('majorsManagement')}</MenuItem>
          </Link>
          <Link to={path.adminVerifyExpert} style={styleLink}>
            <MenuItem icon={<VerifiedUserIcon />}>Xác thực chuyên gia</MenuItem>
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
