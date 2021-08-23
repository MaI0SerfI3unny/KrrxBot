import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
import storage from './../../../storage/redux.js'

const About = () => {
  const { t, i18n } = useTranslation();
  const slider_content = storage.slides[0][i18n.language];
  const [image, setImage] = useState(slider_content[0].img);
  const [content, setContent] = useState([slider_content[0].title, slider_content[0].description]);
  const chooseSlide = (id) => {

     const findPath = slider_content.filter(el => el.id === id);
     setContent([findPath[0].title, findPath[0].description]);
    setImage(findPath[0].img);
  }

  const container_slide = slider_content.map(el =>
    <label key={el.id} style={{display:'block'}} onClick={() => chooseSlide(el.id)}>
    <div style={image === el.img ? {border: '1px solid #0082F4'}: {}}  className="col-md-12  mb-3 container-about">
      <h3 style={image === el.img ? {color: '#0082F4'}: { color: '#3D3D3D'}}>{t(el.title)}</h3>
      <label className='align-self-center status'><p>{ image === el.img ? '-' : '+' }</p></label>
      <p style={image === el.img ? {display: 'block'}:{display: 'none'}}>{t(el.description)}</p>
    </div>
    </label>
  )

  const mobile_slide = slider_content.map(el =>
    <div key={el.id}>
    <br/>
    <button  className='MobileChooserButton'
    style={image === el.img ? { backgroundImage: `url(${el.svg}),linear-gradient(180deg, #44ADFF 0%, #0081F0 100%)`} : {backgroundColor: "transparent", backgroundImage: `url(${el.svg})`}}
    onClick={() => chooseSlide(el.id)}>
    </button>
    </div>
    )

  return(
    <div className="container about">
    <h2 className="text-center">{t('about')}</h2>
    <div className="row">
      <div className="col-md-6 mr-3 slider-desktop">
      {container_slide}
      </div>
      <div className="col-md-5 text-center">
      <div className="row justify-content-center">
      <ul className="mobile-panel">
      {mobile_slide}
      </ul>
      <img className="about-content-img" src={image === '' ? slider_content[0].img : image} alt='Slide'/>
      </div>
    <br/>
    <a className="button_about text-white" href="https://t.me/KRRX_bot">{t('try')}</a>
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
