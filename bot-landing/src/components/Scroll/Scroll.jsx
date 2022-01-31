import React,{useState,useEffect} from 'react'
import arrow from '../../assets/img/arrow.svg'
import { useWindowScroll } from "react-use"

const Scroll = () => {

  const {y: pageYOffset} = useWindowScroll()
  const [visible,setVisible] = useState(false)

  useEffect(() => {
    if (pageYOffset > 1000) {
      setVisible(true)
    }else {
      setVisible(false)
    }
  },[pageYOffset])

  const scrollTop = () => window.scrollTo({top: 0, behavior: "smooth"})

  if (!visible) {return false}

  return(
    <div className="scrollContainer" onClick={() => scrollTop()}>
      <img style={{width: 30}} src={arrow} alt="scroll" />
    </div>
  )
}

export default Scroll
