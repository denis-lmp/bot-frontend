<template>
    <v-navigation-drawer app rounded="lg" class="mt-4 ml-3 mr-5 h-50">
            <v-sheet rounded="lg">
                <v-list>
                    <v-list-item
                        @click="redirect('home')"
                        :title="`Dashboard`"
                    ></v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item
                        link
                        @click="refreshPage"
                        title="Refresh"
                    ></v-list-item>
                    <v-list-item
                        link
                        title="Logout"
                        @click="logout">
                    </v-list-item>
                </v-list>
            </v-sheet>
    </v-navigation-drawer>

</template>

<script>

export default {
    data: () => ({
        link: [
            { name: 'Dashboard', route: '/' },
            { name: 'About', route: '/about' },
        ],
    }),
    methods: {
        logout () {
            this.$store.dispatch('logout')
        },
        redirect (route) {
            this.$router.push({ name: route })
        },
        refreshPage () {
            location.reload()
        },
    },
}

</script>

<style>
.sidebar-wrapper {
}
</style>
