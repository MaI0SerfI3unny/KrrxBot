import axios from "axios";
import * as config from "../../config";

export const getMarkets = async () => {
   await axios({
        method: 'GET',
        // url: config.apiServer + 'api/v1/exchanges/markets',
        url: config.apiServer + 'api/wl1/web/v1/landing/markets',
    })
}
