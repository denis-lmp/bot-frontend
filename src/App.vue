<template>
    <v-app id="app" v-if="isLogged">
        <nav-component></nav-component>
        <v-main class="bg-grey-lighten-3">
            <v-container>
                <sidebar-component></sidebar-component>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="10">
                        <v-sheet
                            min-height="70vh"
                            rounded="lg"
                        >
                            <router-view></router-view>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
    <router-view v-else></router-view>
</template>

<script>

import './assets/custom-styles.css'
import { mapGetters } from 'vuex'
import NavComponent from '@/components/Templates/NavComponent.vue'
import SidebarComponent from '@/components/Templates/SidebarComponent.vue'

export default {
    computed: {
        ...mapGetters([
            'isLogged',
        ]),
    },
    name: 'App',

    components: {
        NavComponent,
        SidebarComponent,
    },

    data: () => ({
        //
    }),
}
</script>
