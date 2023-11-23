import React from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import MajorsTable from './MajorsTable'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
const MajorsManagement = () => {
  const { t } = useTranslation()
  const [majorsOrder, setMajorsOrder] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
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
  }, [refresh])
  return (
    <div style={{ width: '100%', padding: '20px 100px' }}>
      <Helmet>
        <title>{t('majorsManagement')}</title>
      </Helmet>
      <MajorsTable majorsOrder={majorsOrder} fetchData={fetchData} />
    </div>
  )
}

export default MajorsManagement
