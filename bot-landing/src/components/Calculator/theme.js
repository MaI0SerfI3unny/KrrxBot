import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    MuiInput: {
        root: {
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
            },
        },
    },
    props: {
        MuiTypography: {
            variantMapping: {
                body2: 'p',
                subtitle1: 'p',
            },
        },
    },
    palette: {
        secondary: {
            main: "#FFAC00"
        }
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                "&:hover $notchedOutline": {
                    borderColor: "#FFAC00",
                },
                "&$focused $notchedOutline": {
                    borderColor: "#FFAC00",
                },
                "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                    margin: 80
                },
                "& > input[type=number]" : {
                    "-moz-appearance": "textfield",
                },
            }
        },
        MuiFormHelperText: {root: {"&$error": {fontSize: "10px"}},},
    },
});
