<template>
    <v-app-bar flat>
        <v-container class="mx-auto d-flex align-center justify-center" v-if="isLogged">
            <v-avatar
                class="me-4"
                color="primary"
                size="32"
            ></v-avatar>
            <v-btn
                v-for="link in links"
                :key="link.name"
                :text="link.name"
                :to="link.route"
                variant="text"
                color="primary"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="logout()" v-if="isLogged" color="primary">Logout</v-btn>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'isLogged',
        ]),
    },
    data: () => ({
        links: [
            { name: 'Dashboard', route: '/' },
            { name: 'About', route: '/about' },
        ],
    }),
    methods: {
        logout () {
            this.$store.dispatch('logout')
        },
    },
}

</script>
