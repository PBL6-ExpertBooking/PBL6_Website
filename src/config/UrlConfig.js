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
    updatePassword: `${process.env.REACT_APP_API_ENDPOINT}/users/current/password`
  },
  expert: {
    current: `${process.env.REACT_APP_API_ENDPOINT}/experts/current`
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
  }
}

export default urlConfig
