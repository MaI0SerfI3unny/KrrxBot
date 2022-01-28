import React,{useState} from 'react'

const AboutItemDesc = (props) => {
  const {el,chooseSlide,image,t} = props
  const [state,setState] = useState(false)
  const closeAll = (hook) => {hook(false)}
  const changeStatus = () => {
    chooseSlide(el.id)
  }

  return(
    <label key={el.id} style={{display:'block'}} onClick={() => changeStatus()}>
    <div style={image === el.img ? {border: '1px solid #009D32'}: {}}  className="col-md-12  mb-3 container-about">
      <h3 style={image === el.img ? {color: '#009D32'}: { color: '#3D3D3D'}}>{t(el.title)}</h3>
      <label onClick={() => setState(!state)} className='align-self-center status'><p>{state ? '-' : '+' }</p></label>
      <p style={state? {display: 'block'}:{display: 'none'}}>{t(el.description)}</p>
    </div>
    </label>
  )
}

export default AboutItemDesc
