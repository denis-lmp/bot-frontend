import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'

loadFonts()

const app = createApp(App)

// Set up global properties or methods (if needed)
app.config.globalProperties.$axios = axios

// Set up global lifecycle hooks
app.mixin({
    created () {
        const userInfo = localStorage.getItem('user')
        if (userInfo) {
            const userData = JSON.parse(userInfo)
            this.$store.commit('setUserData', userData)
        }
        axios.interceptors.response.use(response => response, error => {
            if (error.response.status === 401) {
                this.$store.dispatch('logout')
            }
            return Promise.reject(error)
        })
    },
})

// Mount the Vue app instance to the DOM
app
    .use(store)
    .use(router)
    .use(vuetify)
    .mount('#app')
