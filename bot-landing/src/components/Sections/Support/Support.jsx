import React from 'react'
import quess from '../../../assets/img/quess.png'
import telegram from '../../../assets/img/svg/telegram.svg'
import { useTranslation } from 'react-i18next'


const Support = () => {
  const { t } = useTranslation();
  return(
    <div className="support">
      <div className="container">
      <h2 className="text-center">{t("question")}</h2>
      <p className="text-center">{t("questionDescription")}</p>
        <div className="row pt-5">

          <div className="col-md-6">
          <img style={{width:155}} className="img-support" src={quess} alt="@KRRX_support" />
          </div>

          <div className="col-md-6">
          <div style={{ paddingTop: 38}} className="row">
          <img src={telegram} alt="Telegram" />
          <p className="pl-2 quess_hover mb-1">Telegram</p>
          </div>
          <div className="row">
          <a href="https://t.me/KRRX_support" className="quess_description">@KRRX_support</a>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support;
