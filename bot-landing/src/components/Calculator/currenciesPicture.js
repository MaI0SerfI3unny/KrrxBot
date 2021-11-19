import BTC from "../../assets/currencies/b.svg"
import etherium from "../../assets/currencies/eth.svg"
import tether from "../../assets/currencies/teth.svg"
import xlm from "../../assets/currencies/XLM.svg"
import trx from "../../assets/currencies/trx.svg"
import krrx from "../../assets/currencies/krrx.svg"
import privat from "../../assets/currencies/Privat.png"
import mono from "../../assets/currencies/Mono.png"
import rub from "../../assets/currencies/ruble 1.svg"
import uah from "../../assets/currencies/uah.png"
import kzt from "../../assets/currencies/Tenge.svg"


export const currency = {
        btc: BTC,
        eth: etherium,
        usdt: tether,
        privat: privat,
        mono: mono,
        uah: uah,
        rub: rub,
        xlm: xlm,
        kzt: kzt,
        trx: trx,
        krrx: krrx
}

export const currencyValue = {
        btc: "Bitcoin",
        eth: "Ethereum",
        usdt: "Tether",
        uah: "Ukrainian Hryvnia",
        xlm: "Stellar",
        rub: "Ruble",
        kzt: "Tenge",
        trx:  "Tron",
        krrx: "Kyrrex Token"
}
export default currency;
