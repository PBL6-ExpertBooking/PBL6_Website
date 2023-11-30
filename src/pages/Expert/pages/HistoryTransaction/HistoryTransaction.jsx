import React from 'react'

import { Helmet } from 'react-helmet-async'
import Transaction from './Transaction'
import { useTranslation } from 'react-i18next'

const HistoryTransaction = () => {
  const { t } = useTranslation()
  return (
    <div style={{ width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }}>
      <Helmet>
        <title>{t('historyTransaction')}</title>
      </Helmet>
      <Transaction />
    </div>
  )
}

export default HistoryTransaction
