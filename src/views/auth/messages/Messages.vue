<template>
    <div class="messages">
        <section class="message-section">
            <message-list />

            <transition :name="transitionAnim">
                <router-view class="message-view"/>
            </transition>
        </section>
    </div>
</template>

<script>
import MessageList from '@/components/messages/MessageList'
import isMobileMixins from '@/mixins/isMobileMixins'

export default {
    components: {
        MessageList
    },

    mixins: [isMobileMixins]
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

        .message-view {
            @include mobile {
                position: fixed;
                width: 100vw;
                height: 100vh;
                z-index: 99;
                top: 0;
            }
        }
    }
}
</style>