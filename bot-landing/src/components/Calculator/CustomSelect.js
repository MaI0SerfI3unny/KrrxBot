import React from "react";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {MenuItem, makeStyles} from "@material-ui/core";
import ListSubheader from '@material-ui/core/ListSubheader';
import {currency, currencyValue} from "./currenciesPicture";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    TextFieldSelect: {
        margin: "9px 0",
        ['@media(min-width:1279px)']: {  // eslint-disable-line no-useless-computed-key
            width: '202px',
        },
    },
    selectTitle: {
        pointerEvents: "none",
        lineHeight: "40px",
        color: "#828282",
    },
    menuItemSelect: {
        color: "#202020",
        fontSize: 14,
        lineHeight: "18px",
        fontWeight: 300,
        height: "50px",
        "& span": {
            marginRight: "8px",
            width: "22px",
            textAlign: "center",
            "& > img": {
                width: "22px"
            }
        }
    },
    MuiPaperSelect: {
        width: "290px",
        marginTop: "10px",
        borderColor: "#009D32",
        "&:hover": {
            borderColor: "#FFAC00",
        },
    },
    inputSelectCustom: {
        fontSize: "16px",
        lineHeight: "21px",
        color: "#202020",
        "& > div": {
            padding: "20px 16px 18px 13px",
            display: "flex",
            alignItems: "center",
            "& span": {                 // span inputIcon
                marginRight: "6px",
            },
            "&::placeholder": {
                fontSize: 16,
            },
            "&:focus": {
                backgroundColor: "none",
            },
            "& > span > img": {
                width: "22px"
            }
        },
        "& fieldset": {
            borderColor: "#009D32",     // border-color of input
            borderRadius: "5px",
        },
    }
})

const CustomSelect = ({
                          value,
                          onChange,
                          name,
                          exchangeOptions,
                          className,
                          anchorOriginV = "bottom",
                          anchorOriginH = "left",
                          transformOriginV = "top",
                          transformOriginH = "left"
                      }) => {
    const crypta = exchangeOptions.filter(i => i[1] === "crypto")
    const fiat = exchangeOptions.filter(i => i[1] === "fiat");
    const classes = useStyles();
    const {t} = useTranslation();
    return (

        <TextField
            variant="outlined"
            value={`${value}`}
            onChange={onChange}
            fullWidth
            name={name}
            select
            SelectProps={{
                IconComponent: ExpandMoreIcon,
                MenuProps: {
                    variant: 'menu',
                    anchorOrigin: {vertical: anchorOriginV, horizontal: anchorOriginH},
                    transformOrigin: {vertical: transformOriginV, horizontal: transformOriginH},
                    getContentAnchorEl: null,
                    classes: {paper: classes.MuiPaperSelect},
                },
            }}
            InputProps={{
                classes: {root: classes.inputSelectCustom}
            }}
            className={className ? className : classes.TextFieldSelect}
        >
            {crypta.length > 0 ? <ListSubheader className={classes.selectTitle}>{ t("cryptaLabel")}</ListSubheader> : null}
            {crypta.length > 0 ? crypta.map((i, index) => {
                return (
                    <MenuItem value={i[0]} key={index} className={classes.menuItemSelect}>
                        <span><img src={currency[i[0]]} alt={'crypta'} style={{width:"22px", height: "22px"}}/></span>
                        {currencyValue[i[0]]}

                    </MenuItem>
                )
            }) : null}
            {fiat.length > 0 && <ListSubheader style={{pointerEvents: "none"}}>{t("fiatLabel")}</ListSubheader>}
            {fiat.map((i, index) => {
                return (
                    <MenuItem value={i[0]} key={index}  className={classes.menuItemSelect}>
                        <span><img src={currency[i[0]]} alt={'fiat'}/></span>
                        {currencyValue[i[0]]}
                    </MenuItem>
                )
            })}
        </TextField>
    );
};

export default CustomSelect;
