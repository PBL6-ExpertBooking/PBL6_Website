const path = {
  home: '/',
  forgotPassword: '/forgotPassword',
  dashboard: '/dashboard',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/changepassword',
  historyTransaction: '/user/transaction-history',
  jobRequest: '/user/job-request',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  expertDetail: '/expertDetail/:nameId',
  validateEmail: '/validate-email/:token',
  promoteToExpert: '/promote-to-expert',

  //Expert
  expert: '/expert',
  expertProfile: '/expert/profile',
  expertChangePassword: '/expert/changepassword',
  expertTransactionHistory: '/expert/transaction-history',
  expertAnalytics: '/expert/analytics',
  expertBookings: '/expert/bookings',
  expertShowListPost: '/expert/list-post',

  //Admin
  admin: '/admin',
  adminProfile: '/admin/profile',
  adminListUser: '/admin/users-management',
  adminListMajor: '/admin/major-management',
  adminVerifyExpert: '/admin/verify-expert'
}

export default path
