<template>
    <div class="guest">
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

        <router-view class="router-view"/>
    </div>
</template>

<script>
import { isMobileRegexFunction } from '@/regex'

export default {
    data() {
        return {
            videoBuffered: false
        }
    },

    computed: {
        isMobileDevice () {
            return isMobileRegexFunction
        }
    },

    methods: {
        videoHasBuffered () {
            this.videoBuffered = true
            this.$refs.video.play()
        }
    }
}
</script>

<style lang="scss" scoped>
.guest {
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

    .router-view {
        z-index: 3;
    }
}
</style>