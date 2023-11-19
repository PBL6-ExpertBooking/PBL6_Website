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
    promoteToExpert: `${process.env.REACT_APP_API_ENDPOINT}/users/current/promote-to-expert`
  },
  expert: {
    current: `${process.env.REACT_APP_API_ENDPOINT}/experts/current`,
    topExpert: `${process.env.REACT_APP_API_ENDPOINT}/experts/top`,
    expert: `${process.env.REACT_APP_API_ENDPOINT}/experts`,
    getJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/experts/current/recommended-job-requests`,
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
    updateJobRequests: `${process.env.REACT_APP_API_ENDPOINT}/job_requests`
  },
  transaction: {
    recharge: `${process.env.REACT_APP_API_ENDPOINT}/transactions/deposit`
  },
  certificate: {
    createCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`,
    deleteCertificate: `${process.env.REACT_APP_API_ENDPOINT}/certificates`,
  }
}

export default urlConfig
