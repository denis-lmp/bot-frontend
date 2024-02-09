<template>
    <v-app>
        <v-container
            fluid
            class="d-flex align-center justify-center"
            style="height: 75vh">
            <v-row justify="center" align="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card>
                        <v-card-title class="text-h5">Login</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent="login">
                                <v-text-field
                                    class="custom-placeholder-color"
                                    v-model="email"
                                    label="Email"
                                    outlined
                                    required
                                    bg-color="white"
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    label="Password"
                                    type="password"
                                    outlined
                                    required
                                    bg-color="white"
                                ></v-text-field>
                                <v-btn type="submit" color="primary">Login</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

import router from '@/router'

export default {
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login () {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            }).then(() => {
                router.push({ name: 'home' })
            }).catch(err => {
                console.log(err)
            })
        },
    },
}
</script>
