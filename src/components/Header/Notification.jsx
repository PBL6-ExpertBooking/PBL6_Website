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
import SimpleBar from 'simplebar-react'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import pusher from '../../common/utils/pusher'
import useSnackbar from '../../contexts/snackbar.context'
import { useState } from 'react'
import { useEffect } from 'react'
import { memo } from 'react'
// ----------------------------------------------------------------------
const NotificationsPopover = memo(function NotificationsPopover() {
  const { snack, setSnack } = useSnackbar()
  const [notifications, setNotifications] = useState([])
  const totalUnRead = notifications.filter((item) => item.is_seen === false).length
  const [open, setOpen] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'))
  const channel = pusher.subscribe(`user-${user._id}`)
  channel.bind('notification', function (data) {
    if (user && data.notification) {
      setSnack({
        ...snack,
        open: true,
        message: 'Bạn có thông báo mới!',
        type: 'info'
      })
      setRefresh(!refresh)
    }
  })

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleMarkAllAsRead = async () => {
    Promise.all(
      notifications.map((notification) => {
        AxiosInterceptors.put(urlConfig.user.updateNotification + `/${notification._id}/seen`)
      })
    )
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        is_seen: true
      }))
    )
  }
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.user.getNotification)
      .then((res) => {
        if (res && res.status === 200) {
          setNotifications(res.data.notifications)
        }
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [refresh])

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
                <DoneAllTwoToneIcon />
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
                <NotificationItem key={notification._id} notification={notification} />
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
                <NotificationItem key={notification._id} notification={notification} />
              ))}
            </List>
          </SimpleBar>
        </div>
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
      {notification.ref.job_request.user.first_name} {notification.ref.job_request.user.last_name} -{' '}
      {notification.ref.job_request.title}
      <Typography component='span' variant='subtitle2' sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.ref.job_request.descriptions}
      </Typography>
    </Typography>
  )

  if (notification.type === 'NEW_JOB_REQUEST') {
    return {
      avatar: <img alt={notification.user} src={notification.ref.job_request.user.photo_url} />,
      title
    }
  }
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
