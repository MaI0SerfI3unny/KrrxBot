import React, {useState} from 'react'
import logo from './../../assets/img/logo.png'
import { useTranslation } from 'react-i18next'
import NavLink from './NavLink/NavLink'
import '../../assets/scss/menu.scss'
//import logoBlack from './../../assets/img/logoBlack.png'
import logoGreen from './../../assets/img/logo_green.svg'
import logoMobile from './../../assets/img/logo_green_mobile.svg'
import { Link } from 'react-router-dom';
import LangSwitch from './LangSwitch/LangSwitch'

const Header = () => {
 const { t } = useTranslation();
 const [state, setState] = useState(false);

  return(
    <header>
    <div className="container" style={{paddingTop:18,paddingBottom: 18}}>
    <div className="hamburger-menu">
        <label className="menu__btn" htmlFor="menu__toggle" onClick={() => state? setState(false): setState(true)}>
          <span className={!state? "span": 'checkedspan'}></span>
        </label>

        <ul className="menu__box" style={state ? {left: 0, visibility: 'visible'} : {left: '-100%',visibility: 'hidden' }}>
        <div className="text-center">
        <img src={logoGreen} alt="Krx Bot Black Logo"/>
        </div>
        <NavLink t={t}/>
        <div className='mobile-button'>
        <a style={{float:'left', marginBottom: 15}} className="text-white button_header" href="https://t.me/KRRX_bot">{t("start")}</a>
        </div>

        <LangSwitch
        classLang={"lang-mobile"}
        styleLang={{paddingLeft: 0, cursor: 'pointer'}}
        />

        </ul>
      </div>
    <div className="row align-items-center">
    <div className="col-md-2">
    <Link to='/'>
      <img className="main_logo_desktop" src={logoGreen} alt="Krrx bot logo"/>
      <img className="main_logo_mobile" src={logoMobile} alt="Krx Bot White Logo"/>
    </Link>
    </div>
    <div className="col-md-7 links text-center pl-0 pr-0">

    <NavLink t={t}/>

    </div>
    <div className="col-md-2 button-start">
    <a className="text-white button_header" href="https://t.me/KRRX_bot">{t("start")}</a>
    </div>

    <LangSwitch
    classLang={"lang-desktop"}
    styleLang={{cursor: 'pointer'}}
    />


    </div>
    </div>
    </header>
  )
}

export default Header;
