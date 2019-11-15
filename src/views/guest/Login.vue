<template>
    <div class="login">
        <div class="video-container" v-show="videoBuffered" v-if="!isMobileData">
            <!-- <video
                loop
                muted
                playsinline
                key="1"
                oncontextmenu="return false;"
                @canplaythrough="videoHasBuffered()"
                class='video'
                ref="video"
            >
                <source :src="require('@/assets/video/bg-video.webm')" type="video/webm" />
                <source :src="require('@/assets/video/bg-video.mp4')" type="video/mp4" />
            </video> -->
        </div>

        <div class="bg-img" />

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

                <button class="login-btn">
                    Login
                </button>

                <button type="button" class="sign-up-btn">
                    Sign Up
                </button>
            </form>
        </section>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    data() {
        return {
            videoBuffered: false,
            isMobileData: false
        }
    },

    computed: {
        // The `mapFields` function takes an array of
        // field names and generates corresponding
        // computed properties with getter and setter
        // functions for accessing the Vuex store.
        ...mapFields('authentication', [
            'email',
            'password',
            'loading'
        ]),
    },

    beforeCreate () {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        if (connection.effectiveType === 'cellular') this.isMobileData = true

        connection.addEventListener('change', () => {
            if (connection.effectiveType === 'cellular') this.isMobileData = true
        })
    },

    methods: {
        async login () {
            if (this.loading) return

            const form = new FormData()

            form.append('email', this.email)
            form.append('password', this.password)

            await this.$store.dispatch('authentication/login', form)
        },

        videoHasBuffered () {
            this.videoBuffered = true
            this.$refs.video.play()
        }
    },
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url('~@/assets/img/main-bg.jpg');
    position: relative;

    .video-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        .video {
            position: absolute;
            min-height: 100%;
            min-width: 100%;
            transform: scale(1.04);
            transition: 0.3s;
            filter: blur(5px);
            left: 50%;
            top: 0;
            transform: translate(-50%, 0);
        }
    }
    

    .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: rgba(8, 0, 54, 0.15);
    }

    .login-form {
        width: 350px;
        display: flex;
        flex-direction: column;
        margin-top: 220px;
        z-index: 3;

        @include mobile {
            width: 300px;
            margin-top: 100px;
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
            }
        }

        .form-container {
            opacity: 0;
            @include fadeinfromtop(0.6s, 0.6s);

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