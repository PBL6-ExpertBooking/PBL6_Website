import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import React from 'react'
export default function AdminSideNav() {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
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
    <Sidebar style={isMobile ? styleMobile : { height: '100%' }} collapsed={isCollapsed}>
      {isMobile ? (
        <Menu rootStyles={menuMobile}>
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
          <MenuItem icon={<HomeRoundedIcon />} component={<Link to={path.dashboard} style={styleLink} />}>
            {t('dashboard')}
          </MenuItem>
          <MenuItem icon={<AccountBoxIcon />} component={<Link to={path.adminProfile} style={styleLink} />}>
            {t('profile')}
          </MenuItem>
          <MenuItem icon={<ManageAccountsIcon />} component={<Link to={path.adminListUser} style={styleLink} />}>
            {t('usersManagement')}
          </MenuItem>
          <MenuItem icon={<ManageSearchIcon />} component={<Link to={path.adminListMajor} style={styleLink} />}>
            {t('majorsManagement')}
          </MenuItem>
          <MenuItem icon={<VerifiedUserIcon />} component={<Link to={path.adminVerifyExpert} style={styleLink} />}>
            Xác thực chuyên gia
          </MenuItem>
          <MenuItem icon={<FindInPageIcon />} component={<Link to={path.adminListDocument} style={styleLink} />}>
            Quản lý tài liệu
          </MenuItem>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              setIsCollapsed(!isCollapsed)
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
