const urlConfig = {
    authentication: {
        login: `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
        register: `${process.env.REACT_APP_API_ENDPOINT}/auth/register`,
        logout: `${process.env.REACT_APP_API_ENDPOINT}/auth/logout`,
        refreshToken: `${process.env.REACT_APP_API_ENDPOINT}/auth/refresh-token`,
    },
    user: {
        info: `${process.env.REACT_APP_API_ENDPOINT}/users/current`,
        users: `${process.env.REACT_APP_API_ENDPOINT}/users`
    }

}

export default urlConfig