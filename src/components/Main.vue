<template>
    <v-app id="inspire">
        <v-app-bar flat>
            <v-container class="mx-auto d-flex align-center justify-center" v-if="isLogged">
                <v-avatar
                    class="me-4 "
                    color="grey-darken-1"
                    size="32"
                ></v-avatar>

                <v-btn
                    v-for="link in links"
                    :key="link.name"
                    :text="link.name"
                    :to="link.route"
                    variant="text"
                ></v-btn>

                <v-spacer></v-spacer>

                <v-btn @click="logout()" v-if="isLogged">Logout</v-btn>

            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list rounded="lg">
                                <v-list-item
                                    link
                                    :title="`Dashboard`"
                                ></v-list-item>

                                <v-divider class="my-2"></v-divider>

                                <v-list-item
                                    color="grey-lighten-4"
                                    link
                                    title="Refresh"
                                ></v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet
                            min-height="70vh"
                            rounded="lg"
                        >
                            <dashboard-component></dashboard-component>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>

import DashboardComponent from '@/components/DashboardComponent.vue'
</script>

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
