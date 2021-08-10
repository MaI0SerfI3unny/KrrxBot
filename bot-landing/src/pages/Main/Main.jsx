import React from 'react'
import Support from '../../components/Sections/Support/Support'
import Exchange from '../../components/Sections/Exchange/Exchange'
import WhatNew from '../../components/Sections/WhatNew/WhatNew'
import About from '../../components/Sections/About/About'
import Banner from '../../components/Sections/Banner/Banner'
import Header from '../../components/Header/Header'


const Main = () => {
  return(
    <main style={{ minHeight: 1600}}>
    <Header/>
    <Banner/>
    <About/>
    <WhatNew/>
    <Exchange/>
    <Support/>
    </main>
  )
}

export default Main;
