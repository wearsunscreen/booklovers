import { writable } from 'svelte/store';
import { PUBLIC_ERROR_MESSAGE } from '$env/static/public'

export const messageStore = writable({ show: false, message: 'blank', type: 'success' })

export default {
    subscribe: messageStore.subscribe,
    showError: function (message = PUBLIC_ERROR_MESSAGE) {
        messageStore.set({ show: true, message, type: 'error' })
    },
    showSuccess: function (message) {
        messageStore.set({ show: true, message, type: 'success' })
    },
    hide: function () {
        messageStore.set({ show: false, message: '', type: 'success' })
    }
}