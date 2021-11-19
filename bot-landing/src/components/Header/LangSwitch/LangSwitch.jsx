import React,{useState,useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next'

const LangSwitch = (props) => {
  const { classLang,styleLang }  = props
  const { i18n } = useTranslation();
  const [state,setState] = useState('close');
  let menuref = useRef();

  useEffect(() => {
     document.addEventListener("mousedown", (event="") => {
         try {
           if (!menuref.current.contains(event.target)) {
             setState('close');
           }
         } catch (e) {}
     })
   })

   const handleClick = (lang) => {
      i18n.changeLanguage(lang);
    }

    const lang = ['en', 'ru', 'tr']
  return(
    <div style={styleLang} className={classLang +" col-md-1"}>
        <ul ref={menuref}
        onClick={() => state  === 'open' ? setState('close') : setState('open')}
        style={classLang === 'lang-desktop'?{padding:0,margin:0}:{}}
        className="lang">
        <p className="mb-0 text-uppercase">{i18n.language} <svg style={state === 'open' ? {transform: 'rotate(180deg)'}:{transform: 'rotate(0deg)'}} width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.305288 1.71929L4.30529 5.71929C4.49282 5.90676 4.74712 6.01207 5.01229 6.01207C5.27745 6.01207 5.53176 5.90676 5.71929 5.71929L9.71929 1.71929C9.90145 1.53069 10.0022 1.27808 9.99996 1.01589C9.99768 0.753691 9.89252 0.502878 9.70711 0.31747C9.5217 0.132062 9.27089 0.0268924 9.00869 0.0246139C8.74649 0.0223355 8.49389 0.12313 8.30529 0.305288L5.01229 3.59829L1.71929 0.305288C1.62704 0.209778 1.5167 0.133597 1.39469 0.0811878C1.27269 0.0287788 1.14147 0.00119157 1.00869 3.77571e-05C0.87591 -0.00111606 0.744231 0.0241854 0.621334 0.0744663C0.498438 0.124747 0.386786 0.199001 0.292893 0.292894C0.199 0.386787 0.124747 0.498439 0.0744663 0.621336C0.0241854 0.744232 -0.00111606 0.87591 3.7757e-05 1.00869C0.00119157 1.14147 0.0287779 1.27269 0.0811869 1.39469C0.133596 1.5167 0.209778 1.62704 0.305288 1.71929Z" fill="#009D32"/>
    </svg></p>
    { state === 'open'?
    <div style={{position:'absolute'}}>
    {lang.map((el,i) =>
      <li key={i}><button className="text-uppercase" onClick={() => handleClick(el)}>{el}</button></li>)}
    </div>: ''}
        </ul>
    </div>

  )
}

export default LangSwitch
