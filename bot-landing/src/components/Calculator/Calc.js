import React, {useCallback, useEffect, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import {Button, Grid, InputAdornment, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CustomSelect from "./CustomSelect";
import * as config from "../../config";
import {SignUp} from "../../config";
import axios from 'axios';
import {allStylesCalculator, btnStyle} from "./theme";
import arrowBtn from "../../../src/assets/calculator/arrowButton.svg"
import "./StylesCalculator.scss";
import {BeatLoader} from "react-spinners";
import {useQuery} from "react-query";
import {useTranslation} from "react-i18next";


const useStyles = allStylesCalculator;

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

    const [cryptoSell, setCryptoSell] = useState("btc");
    const [cryptoBuy, setCryptoBuy] = useState("");

    const [rate, setRate] = useState(0);

    const [fiatToSell, setFiatToSell] = useState("");
    const [fiatToBuy, setFiatToBuy] = useState("uah");

    const [initRate, setInitRate] = useState(initSellValue);
    const [initGetRate, setInitGetRate] = useState(initBuyValue);

    const [placeholderGetValue, setPlaceholderGetValue] = useState(" ");

    const [inputPrecisions, setInputPrecisions] = useState(null);
    const [outputPrecisions, setOutputPrecisions] = useState(2);

    let exchangeList = {};
    const fiat = ["uah", "rub"]
    let output;


    // const showRate = (res) => {
    //     if (amount === 0) {
    //         setAmount(minValue);
    //     }
    //     const isFiatToSell = exchangeFrom.filter(i => i[1] === "fiat" && i[0] === initSellValue);
    //     let rateValue;
    //     if ((fiatCripto && reverse && isFiatToSell.length > 0) || (fiatCripto && isFiatToSell.length > 0 && !reverse)) {
    //         rateValue = Number(amount) / Number(res);
    //     } else {
    //         rateValue = Number(res) / Number(amount);
    //     }
    //     setRate(+rateValue)
    // }

    const getExchangeValues = async () => {
        if (amount === 0 || isNaN(amount) || amount === undefined || !amount) {
            setError(true)
            setErrorMessage(t("calculator.error") + " " + minValue)

            return
        }
        await axios({
            method: 'GET',
            url: config.apiServer + 'api/wl1/web/v1/landing/estimate',
            // url: 'https://wldevapi.fintechservice.one:9000/api/v1/landing/estimate',
            params: {
                "input_asset": initSellValue,
                "output_asset": initBuyValue,
                "amount": Number(amount),
            }
        })
            .then(res => {
                setRate(res.data.rate)
                setMinValue(+res.data.input.minimum_amount);

                let valueWithCorrectPrecisions = `${+res.data.output.amount}`;
                const getAmount = res.data.output.amount.split(".");
                const preDecimal = getAmount[0];
                const postDecimal = getAmount[1];

                if (postDecimal.length > Number(output)) {
                    // if (postDecimal.length > Number(outputPrecisions)) {
                    const afterDot = `${postDecimal}`.slice(0, Number(output));
                    // const afterDot = `${postDecimal}`.slice(0, Number(outputPrecisions));
                    valueWithCorrectPrecisions = preDecimal.concat(".").concat(afterDot);
                }
                setPlaceholderGetValue(`${+valueWithCorrectPrecisions}`)
                // setPlaceholderGetValue(`${+res.data.output.amount}`)
                if (amount < +res.data.input.minimum_amount) {
                    setError(true)
                    setErrorMessage(t("calculator.error")  + " " + +res.data.input.minimum_amount)
                } else {
                    setError(false)
                    setErrorMessage("")
                }
                // showRate(+res.data.output.amount)
            }).catch(e => setFetchError(true))
    }


    const isFiatSellOrBuy = useCallback((exchangeFrom, exchangeTo) => {
        const isFiat = exchangeFrom.filter(i => i[1] === "fiat" && i[0] === initSellValue);
        if (isFiat.length > 0) {
            setFiatToSell(isFiat[0][0])
        } else {
            setFiatToSell('')
        }
        const isFiatBuy = exchangeTo.filter(i => i[1] === "fiat" && i[0] === initBuyValue);
        if (isFiatBuy.length > 0) {
            setFiatToBuy(isFiatBuy[0][0])
        } else {
            setFiatToBuy('')
        }
    }, [initSellValue, initBuyValue, exchangeFrom, exchangeTo])

    const isCryptoSellOrBuy = useCallback((exchangeFrom, exchangeTo) => {
        const isCryptaSell = exchangeFrom.filter(i => i[1] === "crypto" && i[0] === initSellValue);
        if (isCryptaSell.length > 0) {
            setCryptoSell(isCryptaSell[0][0])
        } else {
            setCryptoSell('')
        }
        const isCryptaBuy = exchangeTo.filter(i => i[1] === "crypto" && i[0] === initBuyValue);
        if (isCryptaBuy.length > 0) {
            setCryptoBuy(isCryptaBuy[0][0])
        } else {
            setCryptoBuy('')
        }
    }, [initSellValue, initBuyValue, exchangeFrom, exchangeTo])

    const getSellOptions = useCallback((allData) => {
        let arr = allData;
        let sell = [];
        let resArr = {};
        for (let el of arr) {
            let obj = {
                [el.input.code]: el,
            }
            sell.push(obj);
        }
        for (let el of sell) {
            let obj = Object.entries(el)[0];
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

    const getBuyOptions = useCallback(() => {
        if (exchangeList[initSellValue]) {
            let a = exchangeList[initSellValue];
            return a.map(el => {
                let pair = [];
                pair.push(el.output.code);
                pair.push(el.output.type);
                return pair;
            })
        }
        return []
    }, [initSellValue, exchangeList])



    useEffect(() => {
        if (initSellValue === "rub") {
            setInitBuyValue("usdt")
        }
        axios({
            method: 'GET',
            // url: config.apiServer + 'api/v1/exchanges/markets',
            url: config.apiServer + 'api/wl1/web/v1/landing/markets',
        })
            .then((res) => {
                // setMarkets(res.data)
                setFetchError(false)
                let allData = res.data;
                setMarkets(allData);

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
                isFiatSellOrBuy(filterRepeatable, currency_buy)
                isCryptoSellOrBuy(filterRepeatable, currency_buy)

            }).catch(e => setFetchError(true));

        const myRequest = getExchangeValues();

    }, [amount, initSellValue, initBuyValue, initRate, outputPrecisions])

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
                document.getElementById("input2").value = +preDecimal.concat(".").concat(afterDot)
            }
        }
    }, [amount])

    // const {isLoading, isError} = useQuery('fetchMyData', getExchangeValues, {
    //     refetchInterval: 4000,
    // })
    //
    // if (isLoading) {
    //     return <BeatLoader color={'orange'} size={36}/>
    // }
    // if (isError || fetchError) {
    //     return <p>{t("calculator.loadError")}</p>
    // }

    const reverseValue = (error) => {
        if (error) return
        const willAmount = placeholderGetValue;
        setExchangeFrom(exchangeTo);
        setExchangeTo(exchangeFrom);
        setInitSellValue(initBuyValue);
        setInitBuyValue(initSellValue);
        setPlaceholderGetValue('');
        setAmount(+willAmount);
        document.getElementById("input2").value = error ? "" : +willAmount;
    }

    const handleChangeFrom = (event) => {
        setError(false)
        setErrorMessage("")
        setInitSellValue(event.target.value);

        if (event.target.value === "rub") {
            setInitBuyValue("usdt")
            setInitRate("usdt")
            setInitGetRate(event.target.value)
        } else if (event.target.value === "xlm") {
            setInitRate("btc")
            setInitBuyValue("btc")
            setInitGetRate(event.target.value)
        } else if (initBuyValue === "rub" &&
            event.target.value !== "usdt" &&
            event.target.value !== "uah" &&
            event.target.value !== "xlm") {
            setInitRate(event.target.value)
            setInitGetRate("uah")
            setInitBuyValue("uah")
        } else if (initBuyValue === "rub" && event.target.value === "uah"
            || initBuyValue === "xlm" && event.target.value === "uah") {
            setInitRate("btc")
            setInitBuyValue("btc")
            setInitGetRate("uah")
        } else if (event.target.value === "eth" && initBuyValue === "btc" ||
            event.target.value === "btc" && initBuyValue === "xlm" ||
            initBuyValue === "usdt" || !!fiatToBuy === true) {
            setInitRate(event.target.value)
            setInitGetRate(initBuyValue)
        } else if (event.target.value === "xlm" && initBuyValue === "usdt" ||
            event.target.value === "usdt" && initBuyValue === "xlm") {
            setInitBuyValue("btc")
            setInitRate("btc")
            setInitGetRate(event.target.value)
        } else if (initBuyValue === "xlm" && event.target.value !== "uah") {
            setInitBuyValue("uah")
            setInitRate(event.target.value)
            setInitGetRate("uah")
        } else {
            setInitRate(initBuyValue)
            setInitGetRate(event.target.value)
        }
    };

    const handleChangeTo = (event) => {
        setError(false)
        setErrorMessage("")
        setInitBuyValue(event.target.value)
        ///?????
        setInitGetRate(event.target.value)

        const eventTargetIsFiat = fiat.includes(event.target.value)

        if (event.target.value === "btc" && initSellValue === "eth") {
            setInitRate(initSellValue)
            setInitGetRate("btc")
        } else if (eventTargetIsFiat && initSellValue === "usdt") {
            setInitRate("usdt")
            setInitGetRate(event.target.value)
        } else if (initSellValue === "usdt" && eventTargetIsFiat === false) {
            setInitRate(event.target.value)
            setInitGetRate("usdt")
        } else if (!!fiatToSell === false && eventTargetIsFiat) {
            setInitRate(initSellValue)
            setInitGetRate(event.target.value)
        } else if (!!fiatToSell === false && event.target.value === "usdt") {
            setInitRate(initSellValue)
            setInitGetRate(event.target.value)
        } else if (initSellValue === "btc" && event.target.value === "xlm") {
            setInitRate(initSellValue)
            setInitGetRate(event.target.value)
        } else {
            setInitRate(event.target.value)
            setInitGetRate(initSellValue)
        }
    };

    // const onLostBlur = useCallback((e) => {
    //     // if (error) {
    //     //     setErrorMessage("");
    //     //     setError(false)
    //     //     document.getElementById("input2").value = ``;
    //     // }
    // }, [error])

    const handleChangeAmountValue = (event) => {
        event.preventDefault();
        setAmount(Number(event.target.value));
    };

    const formatText = e => {
        if ( e.charCode < 46 || (e.charCode > 46 && e.charCode < 48)  || e.charCode > 57) {
            e.preventDefault()
            return  false
        }
        return true

    }

    // const outputLimitNumber = (e) => {
    //     const dot = "."
    //     const includesDot = e.target.value.includes(dot);
    //     if (includesDot) {
    //         const value = e.target.value.split(".");
    //         const preDecimal = value[0];
    //         const postDecimal = value[1];
    //         if (preDecimal.length >= 10 || postDecimal.length >= Number(inputPrecisions)) {
    //             const beforeDot = `${preDecimal}`.slice(0, 10);
    //             const afterDot = `${postDecimal}`.slice(0, Number(inputPrecisions));
    //             e.target.value = beforeDot.concat(".").concat(afterDot);
    //         }
    //         e.target.value = preDecimal.concat(".").concat(postDecimal);
    //     }
    //     if (!includesDot && e.target.value.length >= 10) {
    //         e.target.value = e.target.value.toString().slice(0, 10)
    //     }
    //     console.log(e.target.value);
    // }

    return (
        <div className="calc__wrapper">
            <div className="calc__container ">
                <FormControl className={classes.root}>
                    <Typography variant={"h6"}
                                className={classes.title}>{t("calculator.sellTitle")}</Typography>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="flex-end"
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
                                onInput={(e) => {
                                    const deleteZeroAtStart = e.target.value.charAt(0) === "0" && e.target.value.charAt(1) !== "."
                                    if( e.target.value.length === 2 && deleteZeroAtStart) {
                                        e.preventDefault()
                                        e.target.value = deleteZeroAtStart ? e.target.value.slice(1) : e.target.value;
                                        return false
                                    }
                                    const dot = "."
                                    const includesDot = e.target.value.includes(dot);
                                    if (includesDot) {
                                        const value = e.target.value.split(".");
                                        const preDecimal = value[0];
                                        const postDecimal = value[1];
                                        if (preDecimal.length >= 10 || postDecimal.length >= Number(inputPrecisions)) {
                                            const beforeDot = `${preDecimal}`.slice(0, 10);
                                            const afterDot = `${postDecimal}`.slice(0, Number(inputPrecisions));
                                            e.target.value = beforeDot.concat(".").concat(afterDot);
                                        }
                                        e.target.value = preDecimal.concat(".").concat(postDecimal);
                                    }
                                    if (!includesDot && e.target.value.length >= 10) {
                                        e.target.value = e.target.value.toString().slice(0, 10)
                                    }
                                }}
                                // onInput={(e) => outputLimitNumber(e)}
                                variant="outlined"
                                // onBlur={(e) => onLostBlur(e)}
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
                                className={classes.title}>{t("calculator.buyTitle")}</Typography>
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
                                        // : placeholderGetValue.toFixed(Number(outputPrecisions))}
                                        : +placeholderGetValue}
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
                        {(error ? "0 " : "1 ") + `${initRate}`.toUpperCase() + ` =  ${error ? 0 : rate}`
                        + (initGetRate ? ` ${initGetRate}`.toUpperCase() : " UAH")}
                    </Typography>
                </FormControl>
                <div>
                    <Button variant="contained" color="secondary" name='benefits' id='benefits'
                            className={classes.calcBtn}>
                        <a href={`${SignUp}`} style={btnStyle}
                           target="_blank" rel="noreferrer">{t("calculator.btn.text")}</a>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
