import axios from "axios"
import { dbService } from './db.service.js'
import { utilService } from "./util.service.js"

const KEY = 'bitcoin'


export const bitcoinService = {
    bitcoinRate,
}

async function bitcoinRate() {
    try {
        const coinDetails = await dbService.query(KEY)
        if (coinDetails.length) return coinDetails[0]
        const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        const data = _formatTime(res.data)
        _save(data)
        return data
    } catch (err) {
        console.log(err);
    }
}

function _formatTime(res) {
    res.values = res.values.map(rate => {
        return {
            price: rate.y,
            time: utilService.getFormatedTime(rate.x)
        }
    })
    return res
}

async function _save(bitcoin) {
    if (bitcoin._id) return await dbService.put(KEY, bitcoin)
    else return await dbService.post(KEY, bitcoin)
}

