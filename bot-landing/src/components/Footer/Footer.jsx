import React from 'react'
import logo from './../../assets/img/Footer_green.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t, i18n} = useTranslation();
   let langCommision = i18n.language === 'ru' ? '/krrx_bot_fees_ru.pdf' : '/krrx_bot_fees_en.pdf'
  return(
    <footer>
    <div className="container">
    <div className="row">
    <div className="col-md-2">
    <img src={logo} style={{marginTop: 10}} alt="Krrx bot logo"/>
    </div>
    <div className="col-md-3 pt-2">
        <div className="footer-inline-start">
              <div  className="footer-inline">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#44ADFF"/>
                <path d="M5.49126 11.74L17.0613 7.27896C17.5983 7.08496 18.0673 7.40996 17.8933 8.22196L17.8943 8.22096L15.9243 17.502C15.7783 18.16 15.3873 18.32 14.8403 18.01L11.8403 15.799L10.3933 17.193C10.2333 17.353 10.0983 17.488 9.78826 17.488L10.0013 14.435L15.5613 9.41196C15.8033 9.19896 15.5073 9.07896 15.1883 9.29096L8.31726 13.617L5.35526 12.693C4.71226 12.489 4.69826 12.05 5.49126 11.74Z" fill="white"/>
                </svg>
                <p className='pl-2 footer_hover mb-1' style={{paddingTop: 3}}>{t("telegramBot")}</p>
              </div>
              <div className="footer-inline-end">
              <a href="https://t.me/KRRX_bot" className="pl-2 footer_description">@KRRX_bot</a>
              </div>
        </div>

        <div className="footer-inline-start">
          <div  className="footer-inline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#44ADFF"/>
            <path d="M5.49126 11.74L17.0613 7.27896C17.5983 7.08496 18.0673 7.40996 17.8933 8.22196L17.8943 8.22096L15.9243 17.502C15.7783 18.16 15.3873 18.32 14.8403 18.01L11.8403 15.799L10.3933 17.193C10.2333 17.353 10.0983 17.488 9.78826 17.488L10.0013 14.435L15.5613 9.41196C15.8033 9.19896 15.5073 9.07896 15.1883 9.29096L8.31726 13.617L5.35526 12.693C4.71226 12.489 4.69826 12.05 5.49126 11.74Z" fill="white"/>
            </svg>
            <p className='pl-2 footer_hover mb-1' style={{paddingTop: 3}}>Support</p>
          </div>
          <div className="footer-inline-end">
          <a href="https://t.me/KRRX_support" className="pl-2 footer_description">@KRRX_support</a>
          </div>
        </div>
      </div>
    <div className="col-md-7 align-self-center">
    <ul>
    <li><a href={ langCommision } target="_blank" rel="noreferrer">{t('commision')}</a></li>
    <li><Link to="/agree" target="_blank">{t('term')}</Link></li>
    </ul>
    <p className="copyright">© {new Date().getFullYear()} KKRX Bot. All rights reserved</p>
    </div>
    </div>
    </div>
    </footer>
  )
}

export default Footer;
