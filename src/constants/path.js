const path = {
  home: '/',
  forgotPassword: '/forgotPassword',
  dashboard: '/dashboard',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/changepassword',
  historyTransaction: '/user/transaction-history',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  expertDetail: '/expertDetail/:nameId',

  //Expert
  expert: '/expert',
  expertProfile: '/expert/profile',
  expertChangePassword: '/expert/changepassword',
  expertTransactionHistory: '/expert/transaction-history',
  expertAnalytics: '/expert/analytics',
  expertBookings: '/expert/bookings',
  expertShowListPost: '/expert/list-post',
  expertBookings: '/expert/bookings',

  //Admin
  admin: '/admin',
  adminListUser: '/admin/users-management'
} 

export default path
