<template>
    <v-app>
        <v-container
            fluid
            class="d-flex align-center justify-center"
            style="height: 75vh">
            <v-row justify="center" align="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card>
                        <v-card-title class="text-h5">Register</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent="register">
                                <v-text-field
                                    class="custom-placeholder-color"
                                    v-model="name"
                                    label="Name"
                                    outlined
                                    required
                                    bg-color="white"
                                ></v-text-field>
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
                                <v-text-field
                                    v-model="passwordConfirmation"
                                    label="Confirm password"
                                    type="password"
                                    outlined
                                    required
                                    bg-color="white"
                                ></v-text-field>
                                <v-btn type="submit" color="primary" class="mx-2">Register</v-btn>
                                <router-link to="/login" tag="v-btn" class="mx-2">Login</router-link>
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
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        }
    },
    methods: {
        register () {
            this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirmation,
            }).then(() => {
                router.push({ name: 'home' })
            }).catch(err => {
                console.log(err)
            })
        },
    },
}
</script>
