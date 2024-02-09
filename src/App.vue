<template>
    <v-app>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

// import Login from './views/LoginView.vue'
import './assets/custom-styles.css'

export default {
    name: 'App',

    components: {
        // Login,
    },

    data: () => ({
        //
    }),
}
</script>
