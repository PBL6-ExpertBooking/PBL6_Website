import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import MajorsTable from './MajorsTable'
import urlConfig from '../../../../config/UrlConfig'
const MajorsManagement = () => {
  const [majorsOrder, setMajorsOrder] = React.useState([])
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.majors.getMajors)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.majors) {
            setMajorsOrder(res.data.majors)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  return (
    <div style={{ width: '100%', padding: '20px 100px' }}>
      <MajorsTable majorsOrder={majorsOrder} />
    </div>
  )
}

export default MajorsManagement
