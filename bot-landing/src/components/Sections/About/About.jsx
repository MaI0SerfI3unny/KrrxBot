import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
import storage from './../../../storage/redux.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import Calculator from "../../Calculator/Calculator";
import AboutItemDesc from './AboutItemDesc/AboutItemDesc.jsx'

const About = () => {
  const { t, i18n } = useTranslation();
  const slider_content = storage.slides[0][i18n.language];
  const [image, setImage] = useState(slider_content[0].img);
  const [content, setContent] = useState([slider_content[0].title, slider_content[0].description]);

  const queryClient = new QueryClient()

  const chooseSlide = (id) => {
     const findPath = slider_content.filter(el => el.id === id);
     setContent([findPath[0].title, findPath[0].description]);
    setImage(findPath[0].img);
  }

  const container_slide = slider_content.map(el =>
    <AboutItemDesc el={el} image={image} t={t} chooseSlide={chooseSlide}/>
  )

  const mobile_slide = slider_content.map(el =>
    <div key={el.id}>
    <br/>
    <button  className='MobileChooserButton'
    style={image === el.img ? { backgroundImage: `url(${el.svg})`, fill:'white' ,backgroundColor: 'green'} : {backgroundColor: "transparent", backgroundImage: `url(${el.svg})`}}
    onClick={() => chooseSlide(el.id)}>
    </button>
    </div>
    )

  return(
    <div className="container about">
    <h2 className="text-center" style={{color:'#009D32'}}>{t('about')}</h2>
    <div className="row">
      <div className="col-md-6 mr-3 slider-desktop">
      {container_slide}
      </div>
      <div className="col-md-5 text-center">
      <div className="row justify-content-center">
      <ul className="mobile-panel">
      {mobile_slide}
      </ul>
      {image === '/static/media/exchange.398261d9.gif' || image === '/static/media/exchange.1858f54b.gif'
       ?
      <QueryClientProvider client={queryClient}>
      <Calculator />
      </QueryClientProvider>
        :
       <img className="about-content-img" src={image === '' ? slider_content[0].img : image} alt='Slide'/>}


      </div>
    <br/>
    {image === '/static/media/exchange.398261d9.gif' || image === '/static/media/exchange.1858f54b.gif'? '' : <a className="button_about text-white" href="https://t.me/KRRX_bot">{t('try')}</a>}
    <div className="mobile-content-area">
    <h3>{t(content[0])}</h3>
    <p>{t(content[1])}</p>
    </div>
      </div>
    </div>
    </div>
  )
}

export default About;
