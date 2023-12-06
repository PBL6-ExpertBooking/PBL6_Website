import { useState } from 'react'
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Fab,
  IconButton
} from '@mui/material'
// utils
import MenuPopover from './MenuPopover'
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone'
import moment from 'moment/moment'
import { memo } from 'react'
import SimpleBar from 'simplebar-react'
// components
// ----------------------------------------------------------------------
const NotificationsPopover = memo(function NotificationsPopover() {
  const [notifications, setNotifications] = useState([
    {
      _id: '656fe9b4424761e41243b886',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: false,
      __v: 0,
      createdAt: '2023-12-06T03:25:40.049Z',
      updatedAt: '2023-12-06T03:25:40.049Z'
    },
    {
      _id: '656fe34333236244968cde86',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: true,
      updatedAt: '2023-12-06T03:18:59.087Z'
    },
    {
      _id: '656fe34333236244968cde86',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: true,
      updatedAt: '2023-12-06T03:18:59.087Z'
    },
    {
      _id: '656fe34333236244968cde86',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: true,
      updatedAt: '2023-12-06T03:18:59.087Z'
    },
    {
      _id: '656fe34333236244968cde86',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: true,
      updatedAt: '2023-12-06T03:18:59.087Z'
    },
    {
      _id: '656fe34333236244968cde86',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: true,
      updatedAt: '2023-12-06T03:18:59.087Z'
    },
    {
      _id: '656fe34333236244968cde86',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: true,
      updatedAt: '2023-12-06T03:18:59.087Z'
    },
    {
      _id: '656fe34333236244968cde86',
      user: '652fac2c2e03d8c6639e1026',
      message: 'New job request: test',
      is_seen: true,
      updatedAt: '2023-12-06T03:18:59.087Z'
    }
  ])

  const totalUnRead = notifications.filter((item) => item.is_seen === false).length

  const [open, setOpen] = useState(null)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        is_seen: false
      }))
    )
  }

  return (
    <>
      <Fab size='small' aria-label='notifi' onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color='error'>
          <NotificationsIcon />
        </Badge>
      </Fab>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='body1' fontWeight='bold'>
              Notifications
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=' Mark all as read'>
              <IconButton onClick={handleMarkAllAsRead} sx={{ color: 'green' }}>
                <DoneAllTwoToneIcon onClick={handleMarkAllAsRead} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <SimpleBar style={{ maxHeight: 340 }} timeout={500} clickOnTrack={false}>
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  New
                </ListSubheader>
              }
            >
              {notifications.slice(0, totalUnRead).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>

            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Before that
                </ListSubheader>
              }
            >
              {notifications.slice(totalUnRead, 5).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>
          </SimpleBar>
        </div>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color='secondary'>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
})

export default NotificationsPopover

// ----------------------------------------------------------------------

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification)

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.is_seen && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant='caption'
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            {/* <Iconify icon='eva:clock-outline' sx={{ mr: 0.5, width: 16, height: 16 }} /> */}
            <AccessTimeTwoToneIcon sx={{ mr: 0.5, width: 16, height: 16 }} />
            {moment(notification.createdAt).fromNow()}
          </Typography>
        }
      />
    </ListItemButton>
  )
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant='subtitle1'>
      {notification.message}
      <Typography component='span' variant='subtitle2' sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  )

  //   if (notification.type === 'order_placed') {
  return {
    avatar: <img alt={notification.title} src={notification.user.photo_url} />,
    title
  }
  //   }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src='https://minimal-assets-api.vercel.app/assets/icons/ic_notification_shipping.svg'
        />
      ),
      title
    }
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src='https://minimal-assets-api.vercel.app/assets/icons/ic_notification_mail.svg'
        />
      ),
      title
    }
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src='https://minimal-assets-api.vercel.app/assets/icons/ic_notification_chat.svg'
        />
      ),
      title
    }
  }
  //   return {
  // avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
  // title
  //   }
}
