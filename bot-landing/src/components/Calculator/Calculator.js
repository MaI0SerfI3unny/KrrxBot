import React, {useCallback, useEffect, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import { Grid, InputAdornment, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CustomSelect from "./CustomSelect";
import * as config from "../../config";
import axios from 'axios';
import arrowBtn from "../../../src/assets/calculator/arrowButton.svg"
import "./StylesCalculator.scss";
import {BeatLoader} from "react-spinners";
import {useQuery} from "react-query";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";

export const btnStyless = {
    color: "white",
    fontFamily: "Roboto, sans-serif",
    fontSize: "21px",
    fontWeight: 500,
    lineHeight: "16px",
    textTransform: "initial",
    textDecoration: "none"
}

const useStyles =  makeStyles({
    root: {
        width: "240px",
        padding: "0 15px",
        margin: "0 auto 15px",
        display: "flex",
        background: "white",
        ['@media(min-width: 1280px)']: { // eslint-disable-line no-useless-computed-key
            width: '470px',
            padding: "0",
            margin: "0 auto 15px",
            display: "flex",
        },
    },
    inputInput: {
        color: "#009D32",           // input text color
        width: "100%",
        margin: "9px 0 0 0",
        height: "60px",
        ['@media(min-width:1280px)']: {  // eslint-disable-line no-useless-computed-key
            width: '215px',
            margin: "9px 0 0 0",
            height: "64px",
        },
        // "&:hover $notchedOutline": {
        //     borderColor: "#FFAC00",
        // },
        "& fieldset": {
            borderColor: "#009D32",     // border-color of input
            borderRadius: "5px",
        },
        // '&$disabled': {
        //     color: '#202020',
        // },
    },
    inputInput2: {
        color: "#009D32",           // input text color
        width: "100%",
        margin: "9px 0 0 0",
        height: "60px",
        pointerEvents: "none",
        cursor: "not-allowed",
        ['@media(min-width:1280px)']: {  // eslint-disable-line no-useless-computed-key
            width: '215px',
            margin: "2px 0 0 0",
            height: "64px",
        },
        // "&:hover $notchedOutline": {
        //     borderColor: "#FFAC00",
        // },
        "& fieldset": {
            borderColor: "#009D32",     // border-color of input
            borderRadius: "5px",
        },
        // '&$disabled': {
        //     color: '#202020',
        // },
    },
    numberGrid: {
        height: "100px",
        display: "grid",
    },
    inputsContainer: {
        ['@media(min-width:1280px)']: {   // eslint-disable-line no-useless-computed-key
            alignItems: "flex-start",
        },
    },
    inputsContainer2: {
        ['@media(min-width:1280px)']: {   // eslint-disable-line no-useless-computed-key
            alignItems: "flex-start",
            marginTop: "15px"
        },
    },
    TextField2: {
        margin: "9px 0",
        ['@media(min-width:1280px)']: {  // eslint-disable-line no-useless-computed-key
            width: '215px',
            marginBottom: "9px",
        },
    },
    TextField1: {
        margin: "9px 0",
        ['@media(min-width:1280px)']: {  // eslint-disable-line no-useless-computed-key
            width: '215px',
            margin: "2px 0",
        },
    },
    title: {                             // sell-buy title
        fontSize: "21px",
        color: "#4F4F4F",
        fontWeight: 500,
        lineHeight: "24px",
        textAlign: "start",
        ['@media(min-width:1280px)']: {   // eslint-disable-line no-useless-computed-key
            margin: '0',
        },
    },
    rate: {                               // exchange rate
        fontSize: "16px",
        color: "#828282",
        fontWeight: "300",
        margin: "30px auto 0",
        lineHeight: "24px",
        textTransform: "uppercase",
        textAlign: "center",
    },
    calcButton: {
        padding: "15px 22px",
        margin: "15px auto 30px",
        "&:hover": {
            backgroundColor: "#FFAC00"
        }
    },
})


const Calculator = () => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    const [markets, setMarkets] = useState([]);
    const [minValue, setMinValue] = useState(0.001);

    const [exchangeFrom, setExchangeFrom] = useState([]);
    const [exchangeTo, setExchangeTo] = useState([]);

    const [initSellValue, setInitSellValue] = useState('btc');
    const [initBuyValue, setInitBuyValue] = useState('uah');

    const [amount, setAmount] = useState(1.00);
    const [fiat, setFiat] = useState([]);
    const [rate, setRate] = useState(0);

    const [initRate, setInitRate] = useState(initSellValue);
    const [initGetRate, setInitGetRate] = useState(initBuyValue);

    const [placeholderGetValue, setPlaceholderGetValue] = useState(" ");

    const [inputPrecisions, setInputPrecisions] = useState(6);
    const [outputPrecisions, setOutputPrecisions] = useState(2);

    let exchangeList = {};
    let output;

  const convertExponentialToDecimal = (exponentialNumber) => {
      const str = exponentialNumber.toString();
      if (str.indexOf('e') !== -1) {
          const exponent = parseInt(str.split('-')[1], 10);
          const result = exponentialNumber.toFixed(exponent);
          return result;
      } else {
          return exponentialNumber;
      }
  }

    const getExchangeValues = async () => {
        if (amount === 0 || isNaN(amount) || amount === undefined || !amount) {
            setError(true)
            setErrorMessage(t("calculatorError5") + " " + minValue)
            return
        }
        await axios({
            method: 'GET',
            url: config.apiServer + 'api/wl1/web/v1/landing/estimate',
            params: {
                "input_asset": initSellValue,
                "output_asset": initBuyValue,
                "amount": Number(amount),
            }
        })
            .then(res => {
                setRate(res.data.rate)
                setMinValue(+res.data.input.minimum_amount);
                let valueWithCorrectPrecisions = res.data.output.amount;
                // let valueWithCorrectPrecisions = `${+res.data.output.amount}`;
                const getAmount = res.data.output.amount.split(".");
                const preDecimal = getAmount[0];
                const postDecimal = getAmount[1];
                if (postDecimal.length > Number(output)) {
                    const afterDot = `${postDecimal}`.slice(0, Number(output));
                    valueWithCorrectPrecisions = preDecimal.concat(".").concat(afterDot);
                }
                const checkExponential = convertExponentialToDecimal(Number(valueWithCorrectPrecisions))
                setPlaceholderGetValue(`${checkExponential}`)
                // setPlaceholderGetValue(`${+valueWithCorrectPrecisions}`)
                if (amount < +res.data.input.minimum_amount) {
                    setError(true)
                    setErrorMessage(t("calculatorError5") + " " + +res.data.input.minimum_amount)
                } else {
                    setError(false)
                    setErrorMessage("")
                }
            }).catch(e => setFetchError(true))
    }

    const getSellOptions = useCallback((allData) => {
        // let arr = allData;
        let sell = [];
        let resArr = {};
        for (let el of allData) {
            let obj = {
                [el.input.code]: el,
            }
            sell.push(obj);
        }
        for (let el of sell) {
            // let obj = Object.entries(el)[0];
            let key = Object.keys(el)[0];
            let value = Object.values(el)[0];
            if (resArr[key]) {
                resArr[key].push(value);
            } else {
                resArr[key] = [value];
            }
            if (sell.indexOf(el) === sell.length - 1) {
                exchangeList = resArr;
                let sellArr = Object.entries(resArr);
                return sellArr.map(el => {
                    let pair = [];
                    pair.push(el[0]);
                    let type = el[1].map(i => i.input.type);
                    pair.push(type[0]);
                    return pair;
                });
            }
        }
        return []
    }, [exchangeList])

    const getFiatOptions = (markets) => {
        if (markets) {
            const getAllFiatSellPairs = markets.filter(el => el.input.type === "fiat")
            const getAllFiatBuyPairs = markets.filter(el => el.input.type === "fiat")
            const allFiatPairs = [...getAllFiatSellPairs, ...getAllFiatBuyPairs]
            const allCode = allFiatPairs.map(el => el.input.code)
            const uniqueCode = [...new Set(allCode)]
            setFiat(uniqueCode)
        }
    }

    const getBuyOptions = useCallback(() => {
        if (exchangeList[initSellValue]) {
            let a = exchangeList[initSellValue];
            const sellOptions = a.map(el => {
                let pair = [];
                pair.push(el.output.code);
                pair.push(el.output.type);
                return pair;
            })
            const canExchange = sellOptions.filter(el => el[0] === initBuyValue)
            if (canExchange.length > 0) {
                setInitBuyValue(initBuyValue)
            } else {
                setInitBuyValue(sellOptions[0][0])
                setInitRate(sellOptions[0][0])
            }
            return sellOptions
        }
        return []
    }, [initSellValue, exchangeList, initBuyValue])

    const reverseRate = (sell, buy) => {
        const isFiat = fiat.includes(buy);
        const isNotFiat = fiat.includes(sell);
        if (sell === "eth" || isFiat && sell === "usdt" || sell === "xlm" || (isFiat && !isNotFiat && sell !== "usdt") || (buy === "usdt" && !isNotFiat)) {
            setInitRate(sell)
            setInitGetRate(buy)
        }
        if ((sell === "usdt" && isNotFiat) || buy === "eth" || sell === "rub") {
            setInitRate(buy)
            setInitGetRate(sell)
        }
    }

    // if reverce value cut input sell number if precision not accept
    const checkAmount = useCallback((input) => {
        const dot = "."
        const includesDot = `${amount}`.includes(dot);
        if (includesDot) {
            const value = `${amount}`.split(".");
            const preDecimal = value[0];
            const postDecimal = value[1];
            if (postDecimal.length > Number(input)) {
                const afterDot = `${postDecimal}`.slice(0, Number(input));
                setAmount(+preDecimal.concat(".").concat(afterDot))
                return document.getElementById("input2").value = +preDecimal.concat(".").concat(afterDot)
            }
        }
    }, [amount])

    useEffect(() => {
        axios({
            method: 'GET',
            url: config.apiServer + 'api/wl1/web/v1/landing/markets',
        }).then((res) => {
            setFetchError(false)
            let allData = res.data;
            setMarkets(allData);
            getFiatOptions(allData)

            markets.forEach(el => {
                if (el.input.code === initSellValue && el.output.code === initBuyValue) {
                    setInputPrecisions(el.input.precision)
                    setOutputPrecisions(el.output.precision)
                    output = el.output.precision;
                    checkAmount(el.input.precision)
                }
            })
            const currencySellArr = getSellOptions(allData);
            const filterRepeatable = currencySellArr.filter(i => i[0] !== initBuyValue)

            setExchangeFrom(filterRepeatable);
            const currency_buy = getBuyOptions();
            setExchangeTo(currency_buy);

        }).catch(e => setFetchError(true));

        reverseRate(initSellValue, initBuyValue)
        const myRequest = getExchangeValues();


    }, [amount, initSellValue, initBuyValue, outputPrecisions])

    const {isLoading, isError} = useQuery('fetchMyData', getExchangeValues, {
        refetchInterval: 4000,
    })

    if (isLoading) {
        return <BeatLoader color={'orange'} size={36}/>
    }
    const reverseValue = (error) => {
        if (error) return
        const willAmount = Number(placeholderGetValue);
        const checkExponential = convertExponentialToDecimal(willAmount)
        setExchangeFrom(exchangeTo);
        setExchangeTo(exchangeFrom);
        setInitSellValue(initBuyValue);
        setInitBuyValue(initSellValue);
        setPlaceholderGetValue('');
        setAmount(checkExponential);
        document.getElementById("input2").value = error ? "" : convertExponentialToDecimal(willAmount);
    }

    const handleChangeFrom = (event) => {
        setError(false)
        setErrorMessage("")
        setInitSellValue(event.target.value);
        //need to prevent blink loader....before gets value with refetch evety 4 min...without ok
        if (event.target.value === "xlm") {
            setInitRate(event.target.value)
            setInitGetRate("btc")
            setInitBuyValue("btc")
        }
        if (event.target.value === "rub") {
            setInitRate("usdt")
            setInitBuyValue("usdt")
        }
        setInitGetRate(event.target.value)
    };

    const handleChangeTo = (event) => {
        setInitBuyValue(event.target.value)
        setInitRate(event.target.value)
        //need to prevent blink loader....before gets value with refetch evety 4 min...without ok
        if (event.target.value === "xlm") {
            setInitGetRate("btc")
            setInitSellValue("btc")
        }
        if (event.target.value === "rub") {
            setInitRate("usdt")
            setInitGetRate("rub")
            setInitSellValue("usdt")
        }
    };

    const handleChangeAmountValue = (event) => {
        event.preventDefault();
        setAmount(Number(event.target.value));
    };

    const formatText = e => {
        if (e.charCode < 46 || (e.charCode > 46 && e.charCode < 48) || e.charCode > 57) {
            e.preventDefault()
            return false
        }
        return true
    }

    const outputLimitNumber = (e) => {
        e.preventDefault()
        const deleteZeroAtStart = e.target.value.charAt(0) === "0" && e.target.value.charAt(1) !== "."
        if (e.target.value.length === 2 && deleteZeroAtStart) {
            e.target.value = deleteZeroAtStart ? e.target.value.slice(1) : e.target.value;
            return false
        }
        if(e.target.value.charAt(0) === ".") {
            e.target.value = ""
            return false
        }
        const dot = "."
        const includesDot = e.target.value.includes(dot);

        if (includesDot) {
            const dots = [...e.target.value].filter(el => el ===".")
            const value = e.target.value.split(".");
            const preDecimal = value[0];
            const postDecimal = value[1];
            if(dots.length >=2) {
                e.target.value = e.target.value.slice(0, e.target.value.length-1)
                return false
            }
            if (preDecimal.length >= 10 || postDecimal.length >= Number(inputPrecisions)) {
                const beforeDot = `${preDecimal}`.slice(0, 10);
                const afterDot = `${postDecimal}`.slice(0, Number(inputPrecisions));
                e.target.value = beforeDot.concat(".").concat(afterDot);
            }
            if (postDecimal.length >= 4) {
                const zeroAll = [...postDecimal].filter(el => el === "0")
                const beforeDot = `${preDecimal}`.slice(0, 10);
                const afterDot = zeroAll.length > 3 ? `${postDecimal}`.slice(0, 3) : `${postDecimal}`.slice(0, Number(inputPrecisions));
                e.target.value = beforeDot.concat(".").concat(afterDot);
            }
            return e.target.value
        }
        if (!includesDot && e.target.value.length >= 10) {
            e.target.value = e.target.value.toString().slice(0, 10)
        }
    }

    return (
        <div className="calc__wrapper">
            <div className="calc__container ">
                <FormControl className={classes.root}>
                    <Typography variant={"h6"}
                                className={classes.title}>{t("sellTitle")}
                    </Typography>
                    <Grid
                        container
                        justify="space-between"
                        // alignItems="flex-end"
                        className={classes.inputsContainer}
                    >
                        <Grid item xs={12} lg={"auto"}>
                            <CustomSelect
                                id={"grouped-select"}

                                name="exchangeFrom"
                                exchangeOptions={exchangeFrom}
                                onChange={handleChangeFrom}
                                value={initSellValue}
                                className={classes.TextField2}
                            />
                        </Grid>
                        <Grid item xs={12} lg={"auto"} className={classes.numberGrid}>
                            <TextField
                                error={error}
                                name="from"
                                id={"input2"}
                                placeholder={error ? '' : `${amount}`}
                                type="text"
                                onKeyPress={(e) => formatText(e)}
                                onInput={(e) => outputLimitNumber(e)}
                                variant="outlined"
                                fullWidth
                                helperText={errorMessage}
                                onChange={handleChangeAmountValue}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography>{initSellValue ? `${initSellValue}`.toUpperCase() : initSellValue}</Typography>
                                        </InputAdornment>),
                                    classes: {root: classes.inputInput}
                                }}
                            />
                        </Grid>
                    </Grid>
                    <button className={"arrow_btn_calculator_container"} onClick={() => reverseValue(error)}
                            disabled={placeholderGetValue === ""}>
                        <img src={arrowBtn} alt="exchange" className="arrow_btn_calculator"/>
                    </button>
                    <Typography variant={"h6"}
                                className={classes.title}>{t("buyTitle")}</Typography>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="flex-end"
                        className={classes.inputsContainer2}
                    >
                        <Grid item xs={12} lg={"auto"}>
                            <CustomSelect
                                id="grouped-select"
                                name="exchangeTo"
                                exchangeOptions={exchangeTo}
                                onChange={handleChangeTo}
                                value={initBuyValue}
                                className={classes.TextField1}
                            />
                        </Grid>
                        <Grid item xs={12} lg={"auto"}>
                            <TextField
                                variant="outlined"
                                id={"input3"}
                                value={error ? ''
                                    : +placeholderGetValue === 0 ? ''
                                        : placeholderGetValue}
                                name="exchangeTo"
                                fullWidth
                                onChange={handleChangeAmountValue}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography>{initBuyValue ? `${initBuyValue}`.toUpperCase() : initBuyValue}</Typography>
                                        </InputAdornment>),
                                    classes: {root: classes.inputInput2}
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Typography
                        variant={"subtitle1"}
                        className={classes.rate}>
                        {(error ? "0 " : "1 ") + `${initRate}`.toUpperCase() + ` =  ${error ? 0 : parseFloat(rate)}`
                        + (initGetRate ? ` ${initGetRate}`.toUpperCase() : " UAH")}
                    </Typography>
                </FormControl>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
