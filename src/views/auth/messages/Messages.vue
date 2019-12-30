<template>
    <div class="messages">
        <section class="message-section">
            <message-list />

            <router-view />
        </section>
    </div>
</template>

<script>
import MessageList from '@/components/messages/MessageList'

export default {
    data () {
        return {
            windowWidth: 0
        }
    },

    async created () {
        await this.setWindowWidthListener()
        await this.isMobileViewWidth()
    },

    destroyed () {
        this.removeWindowWidthListener()
    },

    computed: {
        isMobileViewPort () {
            return this.windowWidth <= 768
        }
    },

    methods: {
        /* Mounted Lifecycle Methods */
        setWindowWidthListener () {
            this.windowWidth = window.innerWidth
            window.addEventListener('resize', this.onWindowResize)
        },

        onWindowResize () {
            this.windowWidth = window.innerWidth
        },

        isMobileViewWidth () {
            if (
                this.windowWidth > 768
                && this.$route.name !== 'message-view'
            ) {
                this.$router.push('/messages/view')
            }
        },

        /* Destroyed Lifecycle Methods */
        removeWindowWidthListener () {
             window.removeEventListener('resize')
        }
    },

    components: {
        MessageList
    }
}
</script>

<style lang="scss" scoped>
.messages {
    padding: 15px;
    height: 100%;
    overflow: hidden;
    position: absolute;
    width: 100%;

    @include mobile {
        padding: 0;
    }

    .message-section {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
}
</style>