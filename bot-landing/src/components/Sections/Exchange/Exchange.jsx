import React from 'react'
import { useTranslation } from 'react-i18next'

const Exchange = () => {
  const { t } = useTranslation();

  return(
    <div className="exchange">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <p style={{ marginBottom: '3rem' }}>{t('tradeDescFirst')} <a href="https://t.me/KRRX_bot">KRRX Bot</a>. {t('tradeDescLast')}</p>
        </div>
        <div className="col-md-4 text-center align-self-center">
          <a href="https://t.me/KRRX_bot" className="button_exchange ">{t('open')}</a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Exchange;
