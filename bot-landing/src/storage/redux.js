import first from './../assets/img/svg/aml.svg'
import second from './../assets/img/svg/commision.svg'
import third from './../assets/img/svg/activ.svg'
import fourth from './../assets/img/svg/ligvid.svg'
import btc from './../assets/img/svg/btc.svg'
import eth from './../assets/img/svg/eth.svg'
import trx from './../assets/img/svg/trx.svg'
import tether from './../assets/img/svg/tether.svg'
import ltc from './../assets/img/svg/ltc.svg'
import xrp from './../assets/img/svg/xrp.svg'

// FOR SLIDERS ABOUT ON EN
import phone5EN  from "./../assets/img/en/autoconvert.gif"
import phone4EN  from "./../assets/img/en/aml check.gif"
import phone3EN  from "./../assets/img/en/savings.gif"
import phone2EN  from "./../assets/img/en/exchange.gif"
import phone1EN from "./../assets/img/en/wallet.gif"

// FOR SLIDERS ABOUT ON RU
import phone5RU  from "./../assets/img/ru/autoconvert.gif"
import phone4RU  from "./../assets/img/ru/aml check.gif"
import phone3RU  from "./../assets/img/ru/savings.gif"
import phone2RU  from "./../assets/img/ru/exchange.gif"
import phone1RU from "./../assets/img/ru/wallet.gif"

// SVG FOR SLIDERS ABOUT
import walletMobile from './../assets/img/svg/walletMobile.svg'
import exchangeMobile from './../assets/img/svg/exchangeMobile.svg'
import safeMobile from './../assets/img/svg/safeMobile.svg'
import amlMobile from './../assets/img/svg/amlMobile.svg'
import autoMobile from './../assets/img/svg/autoMobile.svg'

const storage = {
  card : [
    {
    link: first,
    title: 'aml',
    description: 'amlDescription',
  },
  {
    link: second,
    title: 'commision',
    description: 'commisionDescription',
  },
  {
    link: third,
    title: 'assets',
    description: 'assetsDescription',
  },
  {
    link: fourth,
    title: 'liquidity',
    description: 'liquidityDescription',
  }
  ],
  currency : [
    {
      link : btc,
      name: 'btc',
      first: '5.5%',
      second: '7%',
      third: '8.5%',
      fourth: '10.5%'
    },
    {
      link : eth,
      name: 'eth',
      first: '6%',
      second: '7.5%',
      third: '9.5%',
      fourth: '12%'
    },
    {
      link : tether,
      name: 'usdt',
      first: '7%',
      second: '9.6%',
      third: '11.5%',
      fourth: '13.5%'
    },
  ],
slides :[
{
  en:[
    {
      id: 1,
      title: 'wallet',
      description: 'whatWallet',
      img: phone1EN,
      svg: walletMobile,
    },
    {
      id: 2,
      title: 'exchange',
      description: 'whatExchange',
      img: phone2EN,
      svg: exchangeMobile,
    },
    {
      id: 3,
      title: 'storage',
      description: 'whatSafe',
      img: phone3EN,
      svg: safeMobile,
    },
    {
      id: 4,
      title: 'aml',
      description: 'whatAml',
      img: phone4EN,
      svg: amlMobile,
    },
    {
      id: 5,
      title: 'auto',
      description: 'whatAuto',
      img: phone5EN,
      svg: autoMobile,
    }
  ],
  ru:[
    {
      id: 1,
      title: 'wallet',
      description: 'whatWallet',
      img: phone1RU,
      svg: walletMobile,

    },
    {
      id: 2,
      title: 'exchange',
      description: 'whatExchange',
      img: phone2RU,
      svg: exchangeMobile,

    },
    {
      id: 3,
      title: 'storage',
      description: 'whatSafe',
      img: phone3RU,
      svg: safeMobile,

    },
    {
      id: 4,
      title: 'aml',
      description: 'whatAml',
      img: phone4RU,
      svg: amlMobile,

    },
    {
      id: 5,
      title: 'auto',
      description: 'whatAuto',
      img: phone5RU,
      svg: autoMobile,

    }
  ],
  tr:[
    {
      id: 1,
      title: 'wallet',
      description: 'whatWallet',
      img: phone1EN,
      svg: walletMobile,
    },
    {
      id: 2,
      title: 'exchange',
      description: 'whatExchange',
      img: phone2EN,
      svg: exchangeMobile,
    },
    {
      id: 3,
      title: 'storage',
      description: 'whatSafe',
      img: phone3EN,
      svg: safeMobile,
    },
    {
      id: 4,
      title: 'aml',
      description: 'whatAml',
      img: phone4EN,
      svg: amlMobile,
    },
    {
      id: 5,
      title: 'auto',
      description: 'whatAuto',
      img: phone5EN,
      svg: autoMobile,
    }
  ],
}
],
dataCommision : [
  {
    currency: 'USDT TRC20',
    deposit: '-',
    windrawl: '2 USDT',
    exchage:'0.10%',
    aml:'-',
    gif: tether
  },
  {
    currency: 'USDT ERC20',
    deposit: '1 USDT',
    windrawl: '16 USDT',
    exchage:'0.10%',
    aml:'1 USDT',
    gif: tether
  },
  {
    currency: 'BTC',
    deposit: '0.00003 BTC',
    windrawl: '0.00053 BTC',
    exchage:'0.10%',
    aml:'0.00003 BTC',
    gif: btc
  },
  {
    currency: 'ETH',
    deposit: '0.001 ETH',
    windrawl: '0.008 ETH',
    exchage:'0.10%',
    aml:'0.001 ETH',
    gif: eth
  },
  {
    currency: 'TRX',
    deposit: '-',
    windrawl: '2 TRX',
    exchage:'0.10%',
    aml:'-',
    gif: trx
  },
  {
    currency: 'LTC',
    deposit: '-',
    windrawl: '0.05 LTC',
    exchage:'0.10%',
    aml:'-',
    gif: ltc
  },
  {
    currency: 'XRP',
    deposit: '-',
    windrawl: '0.05 LTC',
    exchage:'0.10%',
    aml:'-',
    gif: xrp
  }
]
}

export default storage;
