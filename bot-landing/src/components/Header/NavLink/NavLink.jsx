import React from 'react'
import {Link} from 'react-scroll';

const NavLink = (props) => {
  const {t,setState} = props
  return(
    <ul style={{marginBottom:0}}>
    <li>
    <Link
    activeClass = "active"
    to="about"
    spy={true}
    smooth={true}
    offset={70}
    onClick={() => setState(false)}
    duration={500}>{t("functional")}</Link>
    </li>
    <li>
    <Link
    activeClass = "active"
    to="limit-row"
    spy={true}
    smooth={true}
    offset={70}
    onClick={() => setState(false)}
    duration={500}>{t("limit")}</Link>
    </li>
    <li>
    <Link
    activeClass = "active"
    to="deposit-program"
    spy={true}
    smooth={true}
    offset={70}
    onClick={() => setState(false)}
    duration={500}>{t("deposit")}</Link>
    </li>
    <li>
    <Link
    activeClass = "active"
    to="support"
    spy={true}
    smooth={true}
    offset={70}
    onClick={() => setState(false)}
    duration={500}>{t("faq")}</Link>
    </li>
    </ul>
  )
}

export default NavLink
