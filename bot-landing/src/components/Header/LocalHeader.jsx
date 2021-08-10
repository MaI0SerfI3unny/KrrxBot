import React from 'react'
import { Link } from 'react-router-dom';
import logo from './../../assets/img/logo.png'
import { useTranslation } from 'react-i18next'


const LocalHeader = () => {
   const { t } = useTranslation();
  return(
    <header style={{ position: 'fixed', background: 'linear-gradient(180deg, #271942 0%, #222E5D 100%)'}} className='pb-3'>
    <div className="container pt-3">
    <div className="row">
    <div className="col-md-2">
    <Link to='/'>
    <img src={logo} width="74,6px" height="65px" alt="Krrx bot logo"/>
    </Link>
    </div>
    <div className="col-md-7 links text-center pl-0 pr-0">
    </div>
    <div className="col-md-2 button-start">
    <a className="text-white button_header" href="https://t.me/KRRX_bot">{t("start")}</a>
    </div>

    </div>
    </div>


    </header>
  )
}

export default LocalHeader
