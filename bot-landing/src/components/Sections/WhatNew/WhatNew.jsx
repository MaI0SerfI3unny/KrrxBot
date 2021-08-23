import React from 'react'
import img from '../../../assets/img/new-limit.png'
import { useTranslation } from 'react-i18next'
import storage from './../../../storage/redux.js'
import Slider from "react-slick"

const WhatNew = () => {
  const { t } = useTranslation();

  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  const exchange_table = storage.currency.map(el =>
    <div key={el.name} className="col-md-12 table-currency mb-4">
      <div className="row">
        <div style={{ display: 'inline-flex'}} className='col-md-4 justify-content-center align-self-center'>
          <img src={el.link} className='mr-2' alt={el.name.toLowerCase()}/>
          <p className="text-uppercase type mb-0">{el.name.toLowerCase()}</p>
        </div>

        <div className='col-md-4 justify-content-center '>
        <p className="mb-2">30 {t("days")} = <p className='percent'>{el.first}</p></p>
        <p className="mb-2">90 {t("days")} = <p className='percent'>{el.second}</p></p>
        </div>

        <div className='col-md-4 justify-content-center'>
        <p className="mb-2">180 {t("days")} = <p className='percent'>{el.third}</p></p>
        <p className="mb-2">360 {t("days")} = <p className='percent'>{el.fourth}</p></p>
        </div>
    </div>
  </div>)
  return(
    <div className="what-new">
    <div className="container">
    <h2 className="text-center">{t("new")}</h2>
      <div style={{marginTop: 80 }} className='row deposit-program'>

        <div className="col-md-7 align-self-center desktop">
          <h3 className="hover_exchange">{t("deposit")}</h3>
          <p className="description_exchange">{t("depositDescription")}</p>
          <a href="https://t.me/KRRX_bot" className="button_what_new">{t("open")}</a>
        </div>

        <div className="col-md-5 pl-0 pr-0">
<div className="mobileSliderCurrency">
        <Slider {...settings}>
      {exchange_table}
       </Slider>
       <div className="col-md-7 align-self-center">
       <div>
         <h3 className="hover_exchange">{t("deposit")}</h3>
         <p style={{ marginBottom: '3rem' }} className="description_exchange">{t("depositDescription")}</p>
         <a href="https://t.me/KRRX_bot" className="button_what_new">{t("open")}</a>
         </div>
       </div>
</div>
          {exchange_table}
        <p style={{float: 'right', color: '#A0ACB6', fontWeight: 500, fontSize: 14}} className="mt-4 rates">* {t("rates")}</p>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }} className="row limit-row" >
        <div className="col-md-5">
          <img className="img-fluid" src={img} alt="Limit orders" />
        </div>
        <div className="col-md-7">
        <h3 className="hover_exchange">{t("limit")}</h3>
        <p style={{ marginBottom: '3rem' }} className="description_exchange">{t("limitDescription")}</p>
        <a  href="https://t.me/KRRX_bot" className="button_what_new">{t("try")}</a>
        </div>
      </div>

    </div>
    </div>
  )
}

export default WhatNew
