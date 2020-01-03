<template>
    <div class="login">
        <section class="login-form">
            <div class="logo-container">
                <img :src="require('@/assets/img/brawlr-logo.png')">

                <span class="slogan">
                    Match.&nbsp;&nbsp;&nbsp;
                    Chat. &nbsp;&nbsp;&nbsp;
                    Brawl.
                </span>
            </div>

            <form class="form-container" @submit.prevent="login()">
                <input
                    type="email"
                    placeholder="Email"
                    class="email"
                    autocomplete="email"
                    required
                    v-model="email"
                >

                <input
                    type="password"
                    placeholder="Password"
                    autocomplete="current-password"
                    required
                    v-model="password"
                >

                <button
                    class="login-btn"
                    :disabled="loading"
                >
                    {{ loading ? 'Logging in...' : 'Login' }}
                </button>

                <button
                    type="button"
                    class="sign-up-btn"
                    @click="$router.push('signup')"
                >
                    Sign Up
                </button>
            </form>
        </section>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    computed: {
        ...mapFields('authentication', [
            'email',
            'password',
            'loading'
        ])
    },

    methods: {
        async login () {
            if (this.loading) return

            const form = new FormData()

            form.append('email', this.email)
            form.append('password', this.password)

            await this.$store.dispatch('authentication/login', form)
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    .login-form {
        width: 350px;
        display: flex;
        flex-direction: column;
        margin-top: 220px;

        @include mobile {
            width: 300px;
            margin-top: 70px;
        }

        .logo-container {
            font-size: 42px;
            margin-bottom: 25px;
            opacity: 0;

            @include fadeinfromtop(0.6s, 0s);

            img {
                width: 350px;
                border-bottom: 3px solid #fff;

                @include mobile {
                    width: 300px;
                }
            }

            .slogan {
                display: block;
                color: #fff;
                margin-bottom: 15px;
                font-size: 22px;
                font-weight: 400;
                text-shadow: 2px 2px 2px #000000;
                text-align: center;
            }
        }

        .form-container {
            opacity: 0;
            
            @include fadeinfromtop(0.6s, 0.4s);

            input {
                width: 100%;
                padding: 15px 25px;
                color: #fff;
                border: 1px solid #fff;
                background: transparent;
                border-radius: 25px;
                margin-bottom: 15px;
                transition: 0.3s;

                &::placeholder {
                    color: #fff;
                }

                &:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            }

            .login-btn {
                margin-top: 15px;
                border-radius: 25px;
                border: none;
                background: transparent;
                padding: 15px 25px;
                color: #fff;
                width: 100%;
                font-size: 15px;
                background: $red;
                background: linear-gradient(90deg, rgba(135,36,36,1) 0%, rgba(209,85,85,1) 69%, rgba(224,85,85,1) 100%);
            }

            .sign-up-btn {
                margin-top: 15px;
                border-radius: 25px;
                border: none;
                background: transparent;
                padding: 15px 25px;
                color: #fff;
                width: 100%;
                font-size: 15px;
                background: #4267b2;
            }
        }
    }  
}
</style>