import { useRef, useState } from 'react'

import { NavLink } from 'react-router-dom'

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material'
import path from '../../constants/path'
import { styled } from '@mui/material/styles'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone'
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone'
import { useCookies } from 'react-cookie'

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: 12px;
        padding-right:  12px;
`
)

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.background.paper};
        padding:  20px;
`
)

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: 20px;
`
)

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.text.primary};
        display: block;
`
)

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.text.primary, 0.4)};
`
)

function HeaderUserbox() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const logOut = async () => {
    removeCookie('access_token', { path: '/' })
    removeCookie('refresh_token', { path: '/' })
    removeCookie('user', { path: '/' })
    localStorage.removeItem('profile')
    window.location.reload()
  }
  const user = JSON.parse(localStorage.getItem('profile'))

  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <UserBoxButton color='secondary' ref={ref} onClick={handleOpen}>
        <Avatar variant='rounded' alt={user.first_name} src={user.photo_url} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant='body1'>
              {user.first_name} {user.last_name}
            </UserBoxLabel>
            <UserBoxDescription variant='body2'>{user.role}</UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display='flex'>
          <Avatar variant='rounded' alt={user.first_name} src={user.photo_url} />
          <UserBoxText>
            <UserBoxLabel variant='body1'>
              {user.first_name} {user.last_name}
            </UserBoxLabel>
            <UserBoxDescription variant='body2'>{user.role}</UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component='nav'>
          <ListItem button to={path.profile} component={NavLink}>
            <AccountBoxTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
            <ListItemText primary='My Profile' />
          </ListItem>
          <ListItem button to={path.historyTransaction} component={NavLink}>
            <CalendarMonthRoundedIcon fontSize='small' sx={{ mr: 1 }} />
            <ListItemText primary='History Transaction' />
          </ListItem>
          <ListItem button to={path.changePassword} component={NavLink}>
            <AccountTreeTwoToneIcon fontSize='small' sx={{ mr: 1 }} />
            <ListItemText primary='Change Password' />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            color='primary'
            fullWidth
            onClick={logOut}
            sx={{
              color: 'red'
            }}
          >
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default HeaderUserbox