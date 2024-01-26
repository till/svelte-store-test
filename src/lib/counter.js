// @ts-check
import { writable } from "svelte/store";

/**
 * @param {number} initialValue 
 * @returns 
 */
function createStore(initialValue) {
    const { subscribe, update, set } = writable(initialValue)
    return {
        subscribe,
        increment: function() { update(count => count + 1) },
        decrement: function() { update(count => count - 1) },
        reset: function() { set(0) },
        set,
    }
}

export let counter = createStore(0)
