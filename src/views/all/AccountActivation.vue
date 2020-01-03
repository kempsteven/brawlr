<template>
    <div class="account-activation">
        <div class="video-container" v-show="videoBuffered" v-if="!isMobileDevice">
            <video
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
            </video>
        </div>

        <div class="bg-overlay" />

        <section class="activation-container">
            <h1 class="activation-header">
                Account Activation
            </h1>

            <span class="activation-message">
                {{ loading ? 'Activating Account...' : `${message}` }}
            </span>

            <button
                class="back-button"
                @click="$router.push({ name: 'login' })"
            >
                Back to login
            </button>
        </section>
    </div>
</template>

<script>
import { isMobileRegexFunction } from '@/regex'
import { mapFields } from 'vuex-map-fields'

export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (
                vm.$route.query
                && vm.$route.query.iv
                && vm.$route.query.key
            ) {
                next()
            } else {
                next(from)
            }
        })
    },

    data () {
        return {
            videoBuffered: false
        }
    },

    mounted () {
        this.activateAccount()
    },

    computed: {
        ...mapFields('account-activation', [
            'iv',
            'key',
            'message',
            'loading'
        ]),

        isMobileDevice () {
            return isMobileRegexFunction
        }
    },

    methods: {
        activateAccount () {
            const form = new FormData()

            form.append('iv', this.$attrs.iv)
            form.append('key', this.$attrs.key)

            this.$store.dispatch('account-activation/activateAccount', form)
        },

        videoHasBuffered () {
            this.videoBuffered = true
            this.$refs.video.play()
        }
    }
}
</script>

<style lang="scss" scoped>
.account-activation {
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
    

    .bg-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background: rgba(8, 0, 54, 0.15);
    }

    .activation-container {
        z-index: 3;
        margin-top: 15%;
        width: 600px;

        @include mobile {
            width: 90%;
        }

        .activation-header {
            color: #fff;
            text-shadow: 2px 2px 2px #000000;
            margin-bottom: 40px;
            font-size: 30px;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #fff;

            @include mobile {
                margin-bottom: 20px;
            }
        }

        .activation-message {
            color: #fff;
            text-shadow: 2px 2px 2px #000000;
            font-size: 17px;
            padding: 15px;
            text-align: center;
            width: 100%;
            display: block;
            border: 2px solid #fff;
            border-radius: 5px;
            margin-bottom: 30px;

            @include mobile {
                margin-bottom: 40px;
            }
        }

        .back-button {
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
</style>