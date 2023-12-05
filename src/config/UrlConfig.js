const urlConfig = {
  authentication: {
    login: `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
    register: `${process.env.REACT_APP_API_ENDPOINT}/auth/register`,
    logout: `${process.env.REACT_APP_API_ENDPOINT}/auth/logout`,
    refreshToken: `${process.env.REACT_APP_API_ENDPOINT}/auth/refresh-token`,
    validateEmail: `${process.env.REACT_APP_API_ENDPOINT}/auth/activate`
  },
  user: {
    info: `${process.env.REACT_APP_API_ENDPOINT}/users/current`,
    users: `${process.env.REACT_APP_API_ENDPOINT}/users`,
    updatePassword: `${process.env.REACT_APP_API_ENDPOINT}/users/current/password`,
    getJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/users/current/job_requests`,
    searchExpert: `${process.env.REACT_APP_API_ENDPOINT}/experts`,
    promoteToExpert: `${process.env.REACT_APP_API_ENDPOINT}/users/current/promote-to-expert`,
    getTransaction: `${process.env.REACT_APP_API_ENDPOINT}/users/current/transactions`
  },
  expert: {
    current: `${process.env.REACT_APP_API_ENDPOINT}/experts/current`,
    expertUnverified: `${process.env.REACT_APP_API_ENDPOINT}/experts/unverified`,
    topExpert: `${process.env.REACT_APP_API_ENDPOINT}/experts/top`,
    expert: `${process.env.REACT_APP_API_ENDPOINT}/experts`,
    getJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/recommended-job-requests`,
    deleteJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/recommended-job-requests`,
    acceptJobRequest: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/accepted-job-requests`,
    majors: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/majors`
  },
  majors: {
    getMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`,
    createMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`,
    deleteMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`,
    updateMajors: `${process.env.REACT_APP_API_ENDPOINT}/majors`
  },
  job_requests: {
    getJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    createJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    deleteJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    updateJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`,
    doneJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`
  },
  transaction: {
    recharge: `${process.env.REACT_APP_API_ENDPOINT}/transactions/deposit`,
    createPayment: `${process.env.REACT_APP_API_ENDPOINT}/transactions/payment`,
    executePayment: `${process.env.REACT_APP_API_ENDPOINT}/transactions/payment`
  },
  certificate: {
    createCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`,
    deleteCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`,
    verifyCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`
  },
  review: {
    createReview: `${process.env.REACT_APP_API_ENDPOINT}/reviews`
  }
}

export default urlConfig
