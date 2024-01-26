// @ts-check
import { writable } from "svelte/store";

/**
 * @typedef {Object} WeatherStore
 * @property {boolean} loaded
 * @property {string} error
 * @property {WeatherEntry[]} entries
 */

/**
 * @typedef {Object} WeatherEntry
 * @property {string} time
 * @property {string} temp
 */

/**
 * @type {WeatherStore}
 */
let initialValue = {
    loaded: false,
    error: '',
    entries: [],
}

/**
 * @type {number}
 */
let updateCalls = 0

/**
 * @returns {Promise<WeatherEntry[]|boolean>}
 */
async function doWork() {
    const url = 'https://api.open-meteo.com/v1/dwd-icon?latitude=52.52&longitude=13.41&hourly=temperature_2m'
    const resp = await fetch(url)
    if (!resp.ok) {
        console.error(resp.text())
        return false
    }

    const data = await resp.json()    
    let entries = []

    for (const idx in data.hourly.time) {
        entries.push({
            time: data.hourly.time[idx],
            temp: data.hourly.temperature_2m[idx],
        })
    }

    return entries
}

/**
 * @param {WeatherStore} initialValue 
 * @returns 
 */
function createStore(initialValue) {
    /**
     * @type {NodeJS.Timeout}
     */
    let intervalId;

    /**
     * @type {Number}
     */
    const intervalMs = 50000

    const { set, update, subscribe } = writable(initialValue, () => {
        return () => {
            clearInterval(intervalId)
        }
    })

    function init() {
        if (intervalId) {
            return
        }
        intervalId = setInterval(async() => {
            updateCalls = updateCalls + 1
            console.log(`Updates seen so far: ${updateCalls}`)

            const entries = await doWork()
            if (!entries) {
                // set error state
                set({loaded: true, error: 'http error', entries: []})
                return
            }

            set({loaded: true, error: '', entries: /** @type {WeatherEntry[]} */ (entries)})
        }, intervalMs)
    }

    init()

    return {
        subscribe,
        update,
        set,
    }
}

export const weather = createStore(initialValue)

// // populate the first time
// doWork().then((result) => {
//     if (result === false) {
//         return
//     }
//     initialValue = {
//         loaded: true,
//         error: '',
//         entries: /** @type {WeatherEntry[]} */ (result),
//     }
// })
