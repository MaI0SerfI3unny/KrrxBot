import React,{useState} from 'react'
import logo from './../../assets/img/logo.png'
import { useTranslation } from 'react-i18next'
import NavLink from './NavLink/NavLink'
import '../../assets/scss/menu.scss'
import logoBlack from './../../assets/img/logoBlack.png'
import { Link } from 'react-router-dom';


const Header = () => {
 const { t, i18n } = useTranslation();
 const [state,setState] = useState('close');
  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  }
  return(
    <header>

    <div className="container pt-3">
    <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>

        <ul className="menu__box">
        <div className="text-center">
        <img src={logoBlack} alt="Krx Bot Black Logo"/>
        </div>
        <NavLink t={t}/>

        <div className="lang-mobile align-self-center">
            <ul onClick={() => state  === 'open' ? setState('close') : setState('open')} className="lang">
            <p className="mb-0 text-uppercase">{i18n.language} <svg style={state === 'open' ? {transform: 'rotate(180deg)'}:{transform: 'rotate(0deg)'}} width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.305288 1.71929L4.30529 5.71929C4.49282 5.90676 4.74712 6.01207 5.01229 6.01207C5.27745 6.01207 5.53176 5.90676 5.71929 5.71929L9.71929 1.71929C9.90145 1.53069 10.0022 1.27808 9.99996 1.01589C9.99768 0.753691 9.89252 0.502878 9.70711 0.31747C9.5217 0.132062 9.27089 0.0268924 9.00869 0.0246139C8.74649 0.0223355 8.49389 0.12313 8.30529 0.305288L5.01229 3.59829L1.71929 0.305288C1.62704 0.209778 1.5167 0.133597 1.39469 0.0811878C1.27269 0.0287788 1.14147 0.00119157 1.00869 3.77571e-05C0.87591 -0.00111606 0.744231 0.0241854 0.621334 0.0744663C0.498438 0.124747 0.386786 0.199001 0.292893 0.292894C0.199 0.386787 0.124747 0.498439 0.0744663 0.621336C0.0241854 0.744232 -0.00111606 0.87591 3.7757e-05 1.00869C0.00119157 1.14147 0.0287779 1.27269 0.0811869 1.39469C0.133596 1.5167 0.209778 1.62704 0.305288 1.71929Z" fill="#0A88F5"/>
        </svg>
        </p>

          <div  style={state === 'open' ? {display: 'block'}:{display: 'none'}}>
            <li>
            <button className="text-uppercase" onClick={() => handleClick('en')}>En</button>
            </li>
            <li>
            <button className="text-uppercase" onClick={() => handleClick('ru')}>Ru</button>
            </li>
          </div>
            </ul>
        </div>
        </ul>
      </div>
    <div className="row">
    <div className="col-md-2">
    <Link to='/'>
    <img src={logo} width="74,6px" height="65px" alt="Krrx bot logo"/>
    </Link>
    </div>
    <div className="col-md-7 links text-center pl-0 pr-0">

    <NavLink t={t}/>

    </div>
    <div className="col-md-2 button-start">
    <a className="text-white button_header" href="https://t.me/KRRX_bot">{t("start")}</a>
    </div>
<div className="col-md-1 lang-desktop mt-2">
    <ul onClick={() => state  === 'open' ? setState('close') : setState('open')} className="lang">
    <p className="mb-0 text-uppercase">{i18n.language} <svg style={state === 'open' ? {transform: 'rotate(180deg)'}:{transform: 'rotate(0deg)'}} width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.305288 1.71929L4.30529 5.71929C4.49282 5.90676 4.74712 6.01207 5.01229 6.01207C5.27745 6.01207 5.53176 5.90676 5.71929 5.71929L9.71929 1.71929C9.90145 1.53069 10.0022 1.27808 9.99996 1.01589C9.99768 0.753691 9.89252 0.502878 9.70711 0.31747C9.5217 0.132062 9.27089 0.0268924 9.00869 0.0246139C8.74649 0.0223355 8.49389 0.12313 8.30529 0.305288L5.01229 3.59829L1.71929 0.305288C1.62704 0.209778 1.5167 0.133597 1.39469 0.0811878C1.27269 0.0287788 1.14147 0.00119157 1.00869 3.77571e-05C0.87591 -0.00111606 0.744231 0.0241854 0.621334 0.0744663C0.498438 0.124747 0.386786 0.199001 0.292893 0.292894C0.199 0.386787 0.124747 0.498439 0.0744663 0.621336C0.0241854 0.744232 -0.00111606 0.87591 3.7757e-05 1.00869C0.00119157 1.14147 0.0287779 1.27269 0.0811869 1.39469C0.133596 1.5167 0.209778 1.62704 0.305288 1.71929Z" fill="#0A88F5"/>
</svg></p>
{ state === 'open'?
<>
    <li>
    <button className="text-uppercase" onClick={() => handleClick('en')}>En</button>
    </li>
    <li>
    <button className="text-uppercase" onClick={() => handleClick('ru')}>Ru</button>
    </li>
</>: ''}
    </ul>
</div>

    </div>
    </div>
    </header>
  )
}

export default Header;
