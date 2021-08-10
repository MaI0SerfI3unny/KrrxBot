import React from 'react'
import { useTranslation } from 'react-i18next'
import storage from './../../../storage/redux.js'
import Slider from "react-slick";

const Banner = () => {
  const { t } = useTranslation();
  const settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1
   };

   const mobile_card_container = storage.card.map(el =>
     <div key={el.title} className="col-md-3">
     <div className="mobileCard text-center">
     <img src={el.link} alt={t(el.title)}/>
     <h4 className="mt-2">{t(el.title)}</h4>
     <p className="pl-3 pr-3">{t(el.description)}</p>
     </div>
   </div>
   )

    const card_container = storage.card.map(el =>
      <div key={el.title} className="col-md-3 pl-0 ">
      <div className="card-banner">
      <img src={el.link} alt={t(el.title)}/>
      <h4 className="mt-2">{t(el.title)}</h4>
      <p className="pl-3 pr-3">{t(el.description)}</p>
      </div>
    </div>)
  return(
    <div className='banner'>
    <div className='container-banner'>
      <div className="hover_banner col-md-12 justify-content-center">
        <h1 className="text-uppercase banner_main_start ">KRRX </h1><h1 className="text-uppercase banner_main_end">bot</h1>
      </div>
    <p className="text-white banner_description">{t("bannerDescription")}</p>
      <div className="mt-5">
        <a className="button_banner text-white mt-5" href='https://t.me/KRRX_bot'>{t("startNow")}</a>
      </div>
    </div>
    <div className="container desktop-banner">
      <div className='row'>
        {card_container}
      </div>
    </div>

    <div  className='text-center slider_banner_mobile mobile'>
      <Slider {...settings}>
      {mobile_card_container}
      </Slider>
      </div>


    </div>
  )
}

export default Banner
