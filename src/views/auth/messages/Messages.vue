<template>
    <div class="messages">
        <section class="message-section">
            <message-list />
            <message-view />
        </section>
    </div>
</template>

<script>
import MessageList from '@/components/messages/MessageList'
import MessageView from '@/components/messages/MessageView'

export default {
    components: {
        MessageList,
        MessageView
    },
}
</script>

<style lang="scss" scoped>
.messages {
    padding: 35px;
    height: 100%;
    overflow: hidden;
    position: absolute;
    width: 100%;

    .message-section {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
}
</style>