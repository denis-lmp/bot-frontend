<!--<template>-->
<!--    <div>-->
<!--        <h1>Login</h1>-->
<!--        <form @submit.prevent="login">-->
<!--            <input type="email" name="email" v-model="email">-->
<!--            <input type="password" name="password" v-model="password">-->
<!--            <button type="submit">Login</button>-->
<!--        </form>-->
<!--    </div>-->
<!--</template>-->

<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form @submit.prevent="login">
                <v-text-field v-model="email" label="Email"></v-text-field>

                <v-text-field v-model="password" label="Password"></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
            </div>
        </v-sheet>
    </div>
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
                        router.push({ name: 'about' })
                    }).catch(err => {
                        console.log(err)
                    })
                },
            },
}
</script>
